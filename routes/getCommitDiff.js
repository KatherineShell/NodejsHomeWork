const { exec, spawn } = require('child_process');

module.exports = function (response, repoPath, commitHash) {
    exec('git checkout ' + commitHash, { cwd: repoPath }, (err, out) => {
        if (err) {
            response.send('No such folder or branch to checkout');
            response.status(404);
        }
        else {
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
        }
    });
}