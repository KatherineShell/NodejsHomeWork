const { exec, spawn } = require('child_process');

module.exports = function (response, commitHash, repoPath, pageSize, page) {

    exec('git checkout ' + commitHash, { cwd: repoPath }, (err, out) => {
        if (err) {
            response.send('No such folder or branch to checkout');
            response.status(404);
        }
        else {
            let logOptions = [
                'log',
                '--pretty=format: hash: %H message: < %s > Date: %ad <step>',
                "--date=format:%Y-%m-%d %H:%M:%S"];

            if (pageSize && page) {
                let skip = pageSize * (page - 1);

                logOptions.push("--skip=" + skip);
                logOptions.push("--max-count=" + pageSize);
            }

            const getCommitsProcess = spawn('git',
                logOptions,
                { cwd: repoPath });

            getCommitsProcess.stdout.on('data', (data) => {
                let str = `${data}`;
                let dataArray = str.split("<step>");
                /*let resultString = '';

                dataArray.forEach(element => {
                    resultString += "<div>" + element + "</div>";
                });*/
                let json = JSON.stringify({ commits: dataArray });

                response.write(json);
            });

            getCommitsProcess.stderr.on('data', (data) => {
                console.error(`stderr: ${data}`);
            });
        }
    });
}