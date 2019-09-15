const rimraf = require("rimraf");

module.exports = function (response, repoPath) {
 
    rimraf(repoPath, function (err) {
        if (err) {
            response.send('No such file');
            response.status(404);
        }
        
        response.send("Repository seccessfylly deleted!");
    });
}