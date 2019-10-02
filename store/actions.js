export const Types = {
    INIT: '@@init',
    SET_FILE_NAME: 'SET_FILE_NAME',
    SET_LOADER: 'SET_LOADER',
    SET_REPO_LOADER: 'SET_REPO_LOADER',
    SET_FILES: 'SET_FILES',
    SET_REPOS: 'SET_REPOS',
    SET_REPO_NAME: 'SET_REPO_NAME'
};

export const setFileName = (name) => ({
    type: Types.SET_FILE_NAME,
    fileName: name
});

export const setLoader = (isLoader) => ({
    type: Types.SET_LOADER,
    isLoader
});

export const setRepoLoader = (isRepoLoader) => ({
    type: Types.SET_REPO_LOADER,
    isRepoLoader
});

export const setFiles = (files) => ({
    type: Types.SET_FILES,
    files
});

export const setRepos = (repos) => ({
    type: Types.SET_REPOS,
    repos
});

export const setRepoName = (repoName) => ({
    type: Types.SET_REPO_NAME,
    repoName
});