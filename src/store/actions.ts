import { Repo } from '../components/Header/RepoSelect/Repo';
import { File } from '../components/Files/file'

export const SET_FILE_NAME = 'SET_FILE_NAME';
export const SET_LOADER = 'SET_LOADER';
export const SET_FILES = 'SET_FILES';
export const SET_REPOS = 'SET_REPOS';
export const SET_REPO_NAME = 'SET_REPO_NAME';

export interface ActionSetFileName {
    type: typeof SET_FILE_NAME;
    fileName: string;
}

interface ActionSetLoader {
    type: typeof SET_LOADER;
    loader: boolean;
}

interface ActionSetFiles {
    type: typeof SET_FILES;
    files: Array<File>;
}

interface ActionSetRepos {
    type: typeof SET_REPOS;
    repos: Array<Repo>;
}

interface ActionSetRepoName {
    type: typeof SET_REPO_NAME;
    repoName: string;
}

export type ActionCallback = ActionSetFileName |
    ActionSetLoader | ActionSetFiles | ActionSetRepoName | ActionSetRepos;

export interface ActionsTypes {
    setFileName: (name: string) => ActionSetFileName;
    setLoader: (isLoader: boolean) => ActionSetLoader;
    setFiles: (files: Array<File>) => ActionSetFiles;
    setRepos: (repos: Array<Repo>) => ActionSetRepos;
    setRepoName: (repoName: string) => ActionSetRepoName;
}

export const setLoader: ActionsTypes['setLoader'] = (isLoader: boolean) => ({
    type: SET_LOADER,
    loader: isLoader
});

export const setFileName: ActionsTypes['setFileName'] = (name: string) => ({
    type: SET_FILE_NAME,
    fileName: name
});

export const setFiles: ActionsTypes['setFiles'] = (files: Array<File>) => ({
    type: SET_FILES,
    files: files
});

export const setRepos: ActionsTypes['setRepos'] = (repos: Array<Repo>) => ({
    type: SET_REPOS,
    repos: repos
});

export const setRepoName: ActionsTypes['setRepoName'] = (repoName: string) => ({
    type: SET_REPO_NAME,
    repoName: repoName
});