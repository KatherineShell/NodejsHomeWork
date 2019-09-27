const { spawn } = require('child_process');

module.exports = function (response, repoPath, commitHash) {

    const getCommitsProcess = spawn('git',
        ['show', commitHash, '-m'],
        { cwd: repoPath });

    getCommitsProcess.stdout.on('data', (data) => {
        let str = `${data}`;
        let json = JSON.stringify({ diff: str.replace('"', "") });
        response.write(json);
    });

    getCommitsProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
        response.send('Error getting Data');
        response.status(404);
    });

    getCommitsProcess.on('error', function (err) {
        response.send(err);
        response.status(404);
    })

    getCommitsProcess.on('close', function (code) {
        console.log('child process exited with code ' + code);
        response.end('finish');
    });
}