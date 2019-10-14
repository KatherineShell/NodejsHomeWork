const { exec } = require('child_process');
import express from 'express';

module.exports = function (response: express.Response, url: string, repoPath: string) {
    exec('git clone ' + url, { cwd: repoPath }, (err: string) => {
        if (err) {
            response.send('Wrong url to clone repository');
            response.status(404);
        }
        else {
            response.send('Repository was downloaded.');
        }
    });
};