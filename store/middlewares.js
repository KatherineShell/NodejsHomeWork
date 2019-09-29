import { setLoader, setRepoLoader } from './actions.js';

const origin = window.location.origin;

export const getGitRepos = (dispatch) => (action) => {

    var request = new XMLHttpRequest();

    dispatch(setRepoLoader(true));
    function responceLoad() {
        if (request.readyState == 4) {
            let status = request.status;

            dispatch(setRepoLoader(false));
            if (status == 200) {
                let parsed = JSON.parse(request.responseText);

                let formatted = parsed.repos.map(item => {
                    let splitedName = item.split('/');

                    return { name: splitedName[splitedName.length - 1] };
                });

                dispatch(action(formatted));
            } else {
                console.log(request.statusText);
            }
        }
    }

    request.open('GET', origin + '/api/repos');
    request.onload = responceLoad;
    request.send();
};

export const getGitTreeContent = (dispatch) => {
    return (action, name) => {
        dispatch(setLoader(true));

        var request = new XMLHttpRequest();

        function responceLoad() {
            if (request.readyState == 4) {
                let status = request.status;

                dispatch(setLoader(false));
                if (status == 200) {
                    let parsed = JSON.parse(request.responseText);
                    let files = parsed.files;

                    files.pop();

                    let formatted = files.map(item => {
                        let splitedName = item.split('\t');
                        let splitedType = splitedName[0].split(' ');

                        return { name: splitedName[1], isFolder: splitedType[1] === 'tree' };
                    });
                    
                    dispatch(action(formatted));
                } else {
                    console.log(request.statusText);
                }
            }
        }

        request.open('GET', origin + '/api/repos/' + name + '/tree');
        request.onload = responceLoad;
        request.send();
    };
};