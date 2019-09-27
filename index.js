const express = require("express");
var fs = require('fs');
const app = express();
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const getReposList = require('./routes/getReposList');
const getRepoContent = require('./routes/getRepoContent');
const getCommits = require('./routes/getCommits');
const getFileContent = require('./routes/getFileContent');
const deleteFile = require('./routes/deleteRepo');
const getCommitDiff = require('./routes/getCommitDiff');
const postRepo = require('./routes/postRepo');
const getSymbols = require('./routes/getSymbols');

let pathToGit = process.argv[2];
let findReposCounter = 0;
let reposList = [];

app.use(function (request, response, next) {
    if (!pathToGit) {
        response.send('There is no path');
        response.status(404);
    }
    next();
});

app.get("/api/repos", function (request, response) {
    reposList = [];

    findRepos(pathToGit, () => getReposList(response, reposList), response);
});

app.delete('/api/repos/:repositoryId', (request, response) => {
    reposList = [];

    let repositoryId = request.params['repositoryId'];
    let searchReposEnded = () => {

        hocValidation(response, repositoryId,
            (repoPath) => deleteFile(response, repoPath));
    }

    findRepos(pathToGit, searchReposEnded, response);
});

app.post('/api/repos', urlencodedParser, (request, response) => {
    if (!request.body) return response.sendStatus(400);

    postRepo(response, request.body.url, pathToGit);
});

app.get("/api/repos/:repositoryId/commits/:commitHash/diff", function (request, response) {
    reposList = [];
    console.log('git diff')
    let repositoryId = request.params['repositoryId'];
    let commitHash = request.params['commitHash'];

    let searchReposEnded = () => {

        hocValidation(response, repositoryId,
            (repoPath) => getCommitDiff(response, repoPath, commitHash));
    }

    findRepos(pathToGit, searchReposEnded, response);
});

app.get("/api/repos/:repositoryId/commits/:commitHash/:pageSize(\\d+)?/:page(\\d+)?",
    function (request, response) {
        console.log('get commits')
        reposList = [];

        let repositoryId = request.params['repositoryId'];
        let commitHash = request.params['commitHash'];
        let pageSize = request.params['pageSize'];
        let page = request.params['page'];

        let searchReposEnded = () => {

            hocValidation(response, repositoryId,
                (repoPath) => getCommits(response, commitHash, repoPath, pageSize, page));
        }

        findRepos(pathToGit, searchReposEnded, response);
    });

app.get("/api/repos/:repositoryId:tree((/tree)?)/:commitHash?/:path(.*)?", function (request, response) {
    reposList = [];

    let repositoryId = request.params['repositoryId'];
    let commitHash = request.params['commitHash'] || "master";
    let path = request.params['path'];

    let searchReposEnded = () => {

        hocValidation(response, repositoryId,
            (repoPath) => {
                let searchDirrectory = path ? repoPath + '/' + path : repoPath;

                getRepoContent(response, commitHash, repoPath, searchDirrectory)
            });
    }

    findRepos(pathToGit, searchReposEnded, response);
});

app.get("/api/repos/:repositoryId/blob/:commitHash/:pathToFile([^/]*)", function (request, response) {
    reposList = [];

    let repositoryId = request.params['repositoryId'];
    let commitHash = request.params['commitHash'];
    let pathToFile = request.params['pathToFile'];

    let searchReposEnded = () => {

        hocValidation(response, repositoryId,
            (repoPath) => getFileContent(response, repoPath, commitHash, pathToFile));
    }

    findRepos(pathToGit, searchReposEnded, response);
});

app.get("/api/repos/:repositoryId/allSymbols/:commitHash", function (request, response) {
    reposList = [];

    let repositoryId = request.params['repositoryId'];
    let commitHash = request.params['commitHash'];

    let searchReposEnded = () => {

        hocValidation(response, repositoryId,
            (repoPath) => getSymbols(response, commitHash, repoPath));
    }

    findRepos(pathToGit, searchReposEnded, response);
});

let hocValidation = (response, repositoryId, callback) => {
    if (reposList.length > 0) {
        let repoPath = repoFolder(repositoryId);

        if (repoPath) {
            callback(repoPath);
        }
        else {
            response.send('There is no such repository.');
            response.status(404);
        }
    }
    else {
        response.send('No repository.');
        response.status(404);
    }
}

app.listen(3000);

let findRepos = (parentPath, callback, response) => {
    findReposCounter++;

    fs.readdir(parentPath, function (err, list) {
        if (err) {
            response.send('No repository.');
            response.status(404);
        }
        else if (list.includes('.git')) {
            reposList.push(parentPath);
        }
        else {
            let findFolders = list.filter(item => fs.lstatSync(parentPath + '/' + item).isDirectory()
                && item !== 'node_modules');

            findFolders.forEach(element => {
                findRepos(parentPath + '/' + element, callback, response)
            });
        }

        findReposCounter--;

        if (findReposCounter === 0 && callback)
            callback();
    });
}

let repoFolder = (repositoryId) => {
    return reposList.find(element => {
        let index = element.lastIndexOf('/');
        let folderName = element.substring(index + 1, element.length);

        return folderName == repositoryId;
    });
}