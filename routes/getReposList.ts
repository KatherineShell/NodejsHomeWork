import express from 'express';

module.exports = function (response: express.Response, reposList: Array<string>) {
    let htmlList = '';

    htmlList = JSON.stringify({ repos: reposList });
    response.send(htmlList);
}