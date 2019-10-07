const { spawn } = require('child_process');

module.exports = function (response, commitHash, repoPath, pageSize, page) {
    let allData = '';
    let logOptions = [
        'log',
        commitHash,
        '--pretty=format: hash: %H message: < %s > Date: %ad',
        '--date=format:%Y-%m-%d %H:%M:%S'];

    if (pageSize && page) {
        let skip = pageSize * (page - 1);

        logOptions.push('--skip=' + skip);
        logOptions.push('--max-count=' + pageSize);
    }
    else {
        logOptions.push('--no-pager');
    }

    const getCommitsProcess = spawn('git',
        logOptions,
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
        let dataArray = allData.split('\n');
        let json = JSON.stringify({ commits: dataArray });

        response.end(json);
    });
};