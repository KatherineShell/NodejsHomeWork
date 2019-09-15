const { exec } = require('child_process');

module.exports = function (response, url, repoPath) {
    exec('git clone ' + url, { cwd: repoPath }, (err, out) => {
        if (err) {
            response.send('Wrong url to clone repository');
            response.status(404);
        }
        else {
            response.send('Repository was downloaded.');
        }
    });
}