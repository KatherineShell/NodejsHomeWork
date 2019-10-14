import express from 'express';
var fs = require('fs');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const getReposList = require('./routes/getReposList');
const getRepoContent = require('./routes/getRepoContent');
const getCommits = require('./routes/getCommits.ts');
const getFileContent = require('./routes/getFileContent');
const deleteFile = require('./routes/deleteRepo.ts');
const getCommitDiff = require('./routes/getCommitDiff.ts');
const postRepo = require('./routes/postRepo');
const getSymbols = require('./routes/getSymbols');
const getBranches = require('./routes/getBranches.ts');

let pathToGit = process.env.TEST ? path.join(__dirname, '/../') : process.argv[2];
let findReposCounter = 0;
let reposList: string[] = [];

app.use('/dist', express.static(__dirname /*+ '/dist'*/));
app.use('/img', express.static(__dirname + '../img'));
//app.use('/store', express.static(__dirname + '/store'));
app.use('/views', express.static(__dirname + '../views'));

app.use(function (request, response, next) {
    if (!pathToGit) {
        console.log('There is no path');
        response.send('There is no path');
        response.status(404);
    }
    next();
});

app.get('/api/repos', function (request, response) {
    response.set('Content-Type', 'application/json');
    reposList = [];
    console.log('get repos');
    findRepos(pathToGit, () => getReposList(response, reposList), response);
});

app.get('/api/branches/:repositoryId', function (request, response) {
    console.log('branches');
    response.set('Content-Type', 'application/json');

    reposList = [];
    let repositoryId = request.params['repositoryId'];

    let searchReposEnded = () => {

        hocValidation(response, repositoryId,
            (repoPath: string) => getBranches(response, repoPath));
    };

    findRepos(pathToGit, searchReposEnded, response);
});

app.delete('/api/repos/:repositoryId', (request, response) => {
    reposList = [];
    console.log('delete repo');
    let repositoryId = request.params['repositoryId'];
    let searchReposEnded = () => {

        hocValidation(response, repositoryId,
            (repoPath: string) => deleteFile(response, repoPath));
    };

    findRepos(pathToGit, searchReposEnded, response);
});

app.post('/api/repos', urlencodedParser, (request, response) => {
    console.log('git clone');
    if (!request.body) return response.sendStatus(400);
    postRepo(response, request.body.url, pathToGit);
});

app.get('/api/repos/:repositoryId/commits/:commitHash/diff', function (request, response) {
    reposList = [];
    response.set('Content-Type', 'application/json');

    console.log('git diff');
    let repositoryId = request.params['repositoryId'];
    let commitHash = request.params['commitHash'];

    let searchReposEnded = () => {

        hocValidation(response, repositoryId,
            (repoPath: string) => getCommitDiff(response, repoPath, commitHash));
    };

    findRepos(pathToGit, searchReposEnded, response);
});

app.get('/api/repos/:repositoryId/commits/:commitHash/:pageSize(\\d+)?/:page(\\d+)?',
    function (request, response) {
        console.log('get commits');
        reposList = [];
        response.set('Content-Type', 'application/json');


        let repositoryId = request.params['repositoryId'];
        let commitHash = request.params['commitHash'];
        let pageSize = request.params['pageSize'];
        let page = request.params['page'];

        let searchReposEnded = () => {

            hocValidation(response, repositoryId,
                (repoPath: string) => getCommits(response, commitHash, repoPath, pageSize, page));
        };

        findRepos(pathToGit, searchReposEnded, response);
    });

app.get(['/api/repos/:repositoryId',
    '/api/repos/:repositoryId/tree/:commitHash/:path([^/]*)?'], function (request, response) {
        response.set('Content-Type', 'application/json');

        reposList = [];
        console.log('repo content tree');
        let repositoryId = request.params['repositoryId'];
        let commitHash = request.params['commitHash'] || 'master';
        let path = request.params['path'];

        let searchReposEnded = () => {

            hocValidation(response, repositoryId,
                (repoPath: string) => {
                    let searchDirrectory = path ? repoPath + '/' + path : repoPath;

                    getRepoContent(response, commitHash, repoPath, searchDirrectory);
                });
        };

        findRepos(pathToGit, searchReposEnded, response);
    });

app.get('/api/repos/:repositoryId/blob/:commitHash/:pathToFile([^/]*)', function (request, response) {
    reposList = [];
    response.set('Content-Type', 'application/json');

    console.log('get blob');
    let repositoryId = request.params['repositoryId'];
    let commitHash = request.params['commitHash'];
    let pathToFile = request.params['pathToFile'];

    let searchReposEnded = () => {

        hocValidation(response, repositoryId,
            (repoPath: string) => getFileContent(response, repoPath, commitHash, pathToFile));
    };

    findRepos(pathToGit, searchReposEnded, response);
});

app.get('/api/repos/:repositoryId/allSymbols/:commitHash', function (request, response) {
    response.set('Content-Type', 'application/json');

    reposList = [];
    console.log('allSymbols');
    let repositoryId = request.params['repositoryId'];
    let commitHash = request.params['commitHash'];

    let searchReposEnded = () => {

        hocValidation(response, repositoryId,
            (repoPath: string) => getSymbols(response, commitHash, repoPath));
    };

    findRepos(pathToGit, searchReposEnded, response);
});
/*
app.get('/', function (request, response) {
    console.log('sendFile index');
    // response.sendFile(__dirname + 'views/index.html');
    response.sendFile(path.resolve(__dirname, '../views/index.html'));
});
*/
app.use(function (request, response) {
    console.log('sendFile index');
    // response.sendFile(__dirname + 'views/index.html');
    response.sendFile(path.resolve(__dirname, '../views/index.html'));
});

let hocValidation = (response: express.Response, repositoryId: string, callback: (val: string) => void) => {
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
};

app.listen(3000, () => { console.log('server started'); });

let findRepos = (parentPath: string, callback: () => void, response: express.Response) => {
    findReposCounter++;

    fs.readdir(parentPath, function (err: string, list: string[]) {
        if (err) {
            console.log('No repository.');
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
                findRepos(parentPath + '/' + element, callback, response);
            });
        }

        findReposCounter--;

        if (findReposCounter === 0 && callback)
            callback();
    });
};

let repoFolder = (repositoryId: string) => {
    return reposList.find(element => {
        let index = element.lastIndexOf('/');
        let folderName = element.substring(index + 1, element.length);

        return folderName == repositoryId;
    });
};

module.exports = app;

//git for-each-ref --sort=-committerdate --format='%(refname:short)@%(committerdate:relative)@%(committername)@%(objectname:short)'  refs/heads/