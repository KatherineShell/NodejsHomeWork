import { Types } from './actions.js';

let initialState = {
    fileName: '',
    isLoader: false,
    allFiles: [],
    filteredFiles: [],
    repos: [],
    repoName: '',
    isRepoLoader: false
};

export const reduser = (state = initialState, action) => {
    switch (action.type) {
        case Types.SET_FILE_NAME:
            let { fileName } = action;

            return {
                ...state,
                fileName: fileName,
                filteredFiles: state.allFiles.filter(item =>
                    item.name.toUpperCase().includes(fileName.toUpperCase()))
            };
        case Types.SET_LOADER:
            return {
                ...state,
                isLoader: action.isLoader
            };
        case Types.SET_REPO_LOADER:
            return {
                ...state,
                isRepoLoader: action.isRepoLoader
            };
        case Types.SET_FILES:
            return {
                ...state,
                allFiles: action.files,
                filteredFiles: action.files
            };
        case Types.SET_REPOS:
            return {
                ...state,
                repos: action.repos,
            };
        case Types.SET_REPO_NAME:
            return {
                ...state,
                repoName: action.repoName,
            };
        case Types.INIT:
        default:
            return state;
    }
};