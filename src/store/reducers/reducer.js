import { Types } from '../actions.js';

let initialState = {
    fileName: '',
    isLoader: false,
    allFiles: [],
    repos: [],
    repoId: '',
    branch: '',
    path: ''
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.SET_FILE_NAME:
            let { fileName } = action;

            return {
                ...state,
                fileName: fileName
            };
        case Types.SET_LOADER:
            return {
                ...state,
                isLoader: action.isLoader
            };
        case Types.SET_FILES:
            return {
                ...state,
                allFiles: action.files
            };
        case Types.SET_REPOS:
            return {
                ...state,
                repos: action.repos,
            };
        case Types.SET_REPO_NAME:
            return {
                ...state,
                repoId: action.repoName || '',
            };
        case Types.SET_BRANCH:
            return {
                ...state,
                branch: action.branch || '',
            };
        case Types.SET_PATH:
            return {
                ...state,
                path: action.path || '',
            };
        default:
            return state;
    }
};