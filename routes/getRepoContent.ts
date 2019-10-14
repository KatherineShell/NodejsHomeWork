const { spawn } = require('child_process');
const _ = require('lodash');
import express from 'express';

module.exports = function (response: express.Response, commitHash: string,
    repoPath: string, searchDirrectory: string) {
    const getTreeProcess = spawn('git',
        ['ls-tree',/* '--name-only',*/
            commitHash, searchDirrectory + '/'],
        { cwd: repoPath });
    let allData = '';

    getTreeProcess.stdout.on('data', (data: string) => {
        let str = `${data}`;

        allData += str;
    });

    getTreeProcess.stderr.on('data', (data: string) => {
        console.error(`stderr: ${data}`);
    });

    getTreeProcess.on('error', function (err: string) {
        response.send(err);
        response.status(404);
    });

    getTreeProcess.on('close', function (code: number) {
        console.log('child process exited with code ' + code);
        let array = _.split(allData, '\n');
        let jsonData = JSON.stringify({ files: array });
        response.send(jsonData);
    });
};
