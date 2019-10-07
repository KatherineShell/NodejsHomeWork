const { spawn } = require('child_process');

module.exports = function (response, repoPath, commitHash, pathToFile) {
    
    let allData = '';
    const getCommitsProcess = spawn('git',
        ['show', commitHash + ':' + pathToFile],
        { cwd: repoPath });
        
    getCommitsProcess.stdout.on('data', (data) => {
        let str = `${data}`;

        allData += str;
    });

    getCommitsProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
        response.send('Error getting Data');
        response.status(404);
    });

    getCommitsProcess.on('error', function (err) {
        response.send(err);
        response.status(404);
    });

    getCommitsProcess.on('close', function (code) {
        console.log('child process exited with code ' + code);

        let jsonData = JSON.stringify({ fileData: allData });
        response.send(jsonData);
    });
};