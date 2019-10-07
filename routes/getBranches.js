const { spawn } = require('child_process');
const _ = require('lodash');

module.exports = function (response, repoPath) {
    let allData = '';
    const getCommitsProcess = spawn('git',
        [
            'for-each-ref',
            '--sort=-committerdate',
            '--format=%(refname:short)@%(committerdate:relative)@%(committername)@%(objectname:short)',
            // '--format={name:%(refname:short) date:"%(committerdate:relative)" committer:"%(committername)" hash:%(objectname:short)}',

            'refs/heads/'],
        { cwd: repoPath });

    getCommitsProcess.stdout.on('data', (data) => {
        let str = `${data}`;

        allData += str;
    });

    getCommitsProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    getCommitsProcess.on('error', function (err) {
        response.send(err);
        response.status(404);
    });

    getCommitsProcess.on('close', function (code) {
        console.log('child process exited with code ' + code);

        let array = _.split(allData, '\n');
        let jsonData = JSON.stringify({ branches: array });

        response.end(jsonData);
    });
};