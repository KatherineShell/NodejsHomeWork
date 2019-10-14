import {
    ActionCallback, SET_FILE_NAME, SET_LOADER,
    SET_FILES, SET_REPOS, SET_REPO_NAME
} from '../actions';
import { File } from '../../components/Files/file';
import { Repo } from '../../components/Header/RepoSelect/Repo';


export interface StoreType {
    fileName: string;
    isLoader: boolean;
    allFiles: File[];
    repos: Repo[];
    repoId: string;
}

let initialState: StoreType = {
    fileName: '',
    isLoader: false,
    allFiles: [],
    repos: [],
    repoId: ''
};

export const reducer = (state = initialState, action: ActionCallback): StoreType => {
    switch (action.type) {
        case SET_FILE_NAME:
            return {
                ...state,
                fileName: action.fileName
            };
        case SET_LOADER:
            return {
                ...state,
                isLoader: action.loader
            };
        case SET_FILES:
            return {
                ...state,
                allFiles: action.files
            };
        case SET_REPOS:
            return {
                ...state,
                repos: action.repos,
            };
        case SET_REPO_NAME:
            return {
                ...state,
                repoId: action.repoName || '',
            };
        default:
            return state;
    }
};