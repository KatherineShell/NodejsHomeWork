const rimraf = require('rimraf');
import express from 'express';

module.exports = function (response: express.Response, repoPath: string) {

    rimraf(repoPath, function (err: string) {
        if (err) {
            response.send('No such file');
            response.status(404);
        }

        response.send('Repository seccessfylly deleted!');
    });
};