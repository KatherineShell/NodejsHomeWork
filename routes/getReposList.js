module.exports = function (response, reposList) {
    let htmlList = '';

    if (reposList.length > 0) {
        /*   reposList.forEach(element => {
               htmlList += '<li>' + element + '</li>';
           });
   
           htmlList = '<ul>' + htmlList + '</ul>';
           htmlList = "<div><div>List:</div><div>" + htmlList + "</div></div>";*/
        htmlList = JSON.stringify({ repos: reposList });

    }
    else {
        htmlList = 'There is no any repositories.';
    }

    response.send(htmlList);
}