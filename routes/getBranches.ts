import { spawn } from 'child_process';
const _ = require('lodash');
import express from 'express';

module.exports = function (response: express.Response, repoPath: string) {
    let allData = '';
    const getCommitsProcess = spawn('git',
        [
            'for-each-ref',
            '--sort=-committerdate',
            '--format=%(refname:short)@%(committerdate:relative)@%(committername)@%(objectname:short)',
            // '--format={name:%(refname:short) date:"%(committerdate:relative)" committer:"%(committername)" hash:%(objectname:short)}',

            'refs/heads/'],
        { cwd: repoPath });

    getCommitsProcess.stdout.on('data', (data: string) => {
        let str = `${data}`;

        allData += str;
    });

    getCommitsProcess.stderr.on('data', (data: string) => {
        console.error(`stderr: ${data}`);
    });

    getCommitsProcess.on('error', function (err: string) {
        response.send(err);
        response.status(404);
    });

    getCommitsProcess.on('close', function (code: number) {
        console.log('child process exited with code ' + code);

        let array = _.split(allData, '\n');
        let jsonData = JSON.stringify({ branches: array });

        response.end(jsonData);
    });
};