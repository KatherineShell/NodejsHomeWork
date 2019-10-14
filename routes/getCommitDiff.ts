const { spawn } = require('child_process');
import express from 'express';

module.exports = function (response: express.Response, repoPath: string, commitHash: string) {

    const getCommitsProcess = spawn('git',
        ['show', commitHash, '-m'],
        { cwd: repoPath });

    getCommitsProcess.stdout.on('data', (data: string) => {
        let str = `${data}`;
        let json = JSON.stringify({ diff: str.replace('"', '') });
        response.write(json);
    });

    getCommitsProcess.stderr.on('data', (data: string) => {
        console.error(`stderr: ${data}`);
        response.send('Error getting Data');
        response.status(404);
    });

    getCommitsProcess.on('error', function (err: string) {
        response.send(err);
        response.status(404);
    });

    getCommitsProcess.on('close', function (code: number) {
        console.log('child process exited with code ' + code);
        response.end('finish');
    });
};