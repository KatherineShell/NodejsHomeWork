const { spawn } = require('child_process');
const _ = require('lodash');
//var fs = require('fs');

//let repoContent = [];
//let findReposCounter = 0;

module.exports = function (response, commitHash, repoPath, searchDirrectory) {
    const getTreeProcess = spawn('git',
        ['ls-tree',/* '--name-only',*/
            commitHash, searchDirrectory],
        { cwd: repoPath });
    let allData = '';

    getTreeProcess.stdout.on('data', (data) => {
        let str = `${data}`;

        allData += str;
        /* let dataArray = str.split('<step>');
         let json = JSON.stringify({ commits: dataArray });
 
         response.write(json);*/
    });

    getTreeProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    getTreeProcess.on('error', function (err) {
        response.send(err);
        response.status(404);
    });

    getTreeProcess.on('close', function (code) {
        console.log('child process exited with code ' + code);
        let array = _.split(allData, '\n');
        let jsonData = JSON.stringify({ files: array });
        response.end(jsonData);
    });
    /*   exec('git checkout ' + commitHash, { cwd: repoPath }, (err) => {
        if (err) {
            response.send('No such folder or branch to checkout');
            response.status(404);
        }
        else {

            let callback = (err, list) => {
                if (err) {
                    response.send('No such folder');
                    response.status(404);
                }
                else {
                    let contentList = [];

                    list.forEach(item => {
                        contentList.push({
                            node: item,
                            isFolder: fs.lstatSync(searchDirrectory + '/' + item).isDirectory()
                        });
                    });
                    let json = JSON.stringify({ folderContent: contentList });

                //    response.send(json);
                    response.json(json);
                }
            };
            
            createFirstFlor(searchDirrectory, callback);
           let finishCallback = () => {
                  response.end("<div>" + showRepoContent(repoContent) + "</div>");
              };
  
              repoContent.push({ node: searchDirrectory, content: [] });
  
              createRepoContent(searchDirrectory, repoContent[0].content, finishCallback, response);


        }
    });*/
};
/*
let showRepoContent = (contentData) => {
    let strContent = '';

    contentData.forEach(item => {
        let childContent = item.content.length > 0 ? showRepoContent(item.content) : '';
        strContent += '<li>' + item.node + '</br>' + childContent + '</li>'
    })

    return '<ul>' + strContent + '</ul>';
}

let createFirstFlor = (parentPath, callback) => {

    fs.readdir(parentPath, callback);
};*/
/*
let createRepoContent = (parentPath, content, callback, response) => {
    findReposCounter++;

    fs.readdir(parentPath, function (err, list) {
        if (err) {
            response.send('No such folder');
            response.status(404);
        }
        else {
            let findFolders = list.filter(item => {
                content.push({ node: item, content: [] });
                return fs.lstatSync(parentPath + '/' + item).isDirectory();
            });

            findFolders.forEach(element => {
                let nodeItem = content.find(item => item.node === element);

                createRepoContent(parentPath + '/' + element, nodeItem.content, callback, response);
            });
        }

        findReposCounter--;

        if (findReposCounter === 0 && callback) callback();
    });
}
*/