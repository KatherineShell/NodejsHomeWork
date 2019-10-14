const { spawn } = require('child_process');
import express from 'express';

module.exports = function (response: express.Response, repoPath:string,
     commitHash:string, pathToFile:string) {
    
    let allData = '';
    const getCommitsProcess = spawn('git',
        ['show', commitHash + ':' + pathToFile],
        { cwd: repoPath });
        
    getCommitsProcess.stdout.on('data', (data:string) => {
        let str = `${data}`;

        allData += str;
    });

    getCommitsProcess.stderr.on('data', (data:string) => {
        console.error(`stderr: ${data}`);
        response.send('Error getting Data');
        response.status(404);
    });

    getCommitsProcess.on('error', function (err:string) {
        response.send(err);
        response.status(404);
    });

    getCommitsProcess.on('close', function (code:number) {
        console.log('child process exited with code ' + code);

        let jsonData = JSON.stringify({ fileData: allData });
        response.send(jsonData);
    });
};