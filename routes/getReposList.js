module.exports = function (response, reposList) {
    let htmlList = '';

    if (reposList.length > 0) {
        htmlList = JSON.stringify({ repos: reposList });
    }
    else {
        htmlList = 'There is no any repositories.';
    }

    response.send(htmlList);
}