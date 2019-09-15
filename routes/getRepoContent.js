const { exec } = require('child_process');
var fs = require('fs');

let repoContent = [];
let findReposCounter = 0;

module.exports = function (response, commitHash, repoPath, searchDirrectory) {

    exec('git checkout ' + commitHash, { cwd: repoPath }, (err, out) => {
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

                    response.send(json);
                }
            }
            
            createFirstFlor(searchDirrectory, callback);
            /*  let finishCallback = () => {
                  response.end("<div>" + showRepoContent(repoContent) + "</div>");
              };
  
              repoContent.push({ node: searchDirrectory, content: [] });
  
              createRepoContent(searchDirrectory, repoContent[0].content, finishCallback, response);*/


        }
    });
}

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
}

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
