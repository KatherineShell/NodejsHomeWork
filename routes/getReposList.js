module.exports = function (response, reposList) {
    let htmlList = '';

    htmlList = JSON.stringify({ repos: reposList });
    response.send(htmlList);
}