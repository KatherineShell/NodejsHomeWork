const { spawn } = require('child_process');
const _ = require('lodash');

module.exports = function (response, commitHash, repoPath, searchDirrectory) {
    const getTreeProcess = spawn('git',
        ['ls-tree',/* '--name-only',*/
            commitHash, searchDirrectory + '/'],
        { cwd: repoPath });
    let allData = '';

    getTreeProcess.stdout.on('data', (data) => {
        let str = `${data}`;

        allData += str;
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
        response.send(jsonData);
    });
};
