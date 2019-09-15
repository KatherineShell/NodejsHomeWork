const fs = require('fs');
const { exec } = require('child_process');

module.exports = function (response, repoPath, commitHash, pathToFile) {
    exec('git checkout ' + commitHash, { cwd: repoPath }, (err, out) => {
        if (err) {
            response.status(404);
            response.end('No such folder or branch to checkout');
        }
        else {
            fs.readFile(repoPath + '/' + pathToFile, "binary",
                (error, data) => {
                    if (error) {
                        response.status(404);
                        response.end('No such file');
                    }
                    let json = JSON.stringify({ fileData: data });

                    response.send(json);
                });
        }
    });
}