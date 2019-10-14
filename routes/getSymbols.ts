const { exec } = require('child_process');
var fs = require('fs');
import express from 'express';

let fileCounter = 0;
let SymbolResult: { [k: string]: number } = { all: 0 };
let ignoreFileList: Array<string> = [];

module.exports = function (response: express.Response, commitHash: string, repoPath: string) {

    exec('git checkout ' + commitHash, { cwd: repoPath }, (err: string) => {
        if (err) {
            response.send('No such folder or branch to checkout');
            response.status(404);
        }
        else {
            let finishCallback = () => {
                let json = JSON.stringify({ symbols: SymbolResult, ignor: ignoreFileList });

                response.end(json);
            };

            createRepoContent(repoPath, finishCallback, response);
        }
    });
};

let read = (path: string, callback: () => void, response: express.Response) => {
    fileCounter++;
    fs.readFile(path, 'utf8',
        (error: string, data: string) => {
            fileCounter--;

            if (error) {
                response.send('No such file');
                response.status(404);
                return;
            }
            let exp = /\w/im;

            if (exp.test(data)) {
                for (let i = 0, len = data.length; i < len; i++) {
                    let symbol = data[i];

                    if (exp.test(symbol)) {
                        SymbolResult[symbol] = SymbolResult[symbol] ? SymbolResult[symbol] + 1 : 1;
                        SymbolResult.all += 1;
                    }
                }
            }
            else {
                ignoreFileList.push(path);
            }

            if (fileCounter === 0 && callback) callback();
        });
};

let createRepoContent = (parentPath: string, callback: () => void, response: express.Response) => {

    fs.readdir(parentPath, function (err: string, list: string[]) {
        if (err) {
            response.send('No such folder');
            response.status(404);
        }
        else {
            for (let i = 0, len = list.length; i < len; i++) {
                let item = list[i];
                let itemPath = parentPath + '/' + item;

                if (item !== '.git' && item !== 'node_modules') {
                    if (fs.lstatSync(itemPath).isDirectory()) {
                        createRepoContent(itemPath, callback, response);
                    }
                    else {
                        read(itemPath, callback, response);
                    }
                }
            }
        }
    });
};
