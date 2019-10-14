import axios from 'axios';
import _ from 'lodash';
import { pathToName } from '../helper/helper';
import { File } from '../components/Files/file';
import { ActionsTypes } from './actions';

const origin = window.location.origin;

export const getGitRepos = () => {
    return axios.get(origin + '/api/repos')
        .then(function (response) {
            let formatted = response.data.repos.map((item: string) => {
                let splitedName = item.split('/');

                return { name: splitedName[splitedName.length - 1] };
            });

            return formatted;
        })
        .catch(function (error) {
            console.log(error);
            return [];
        });
};

export const getFileData = (repoName: string, path: string, branch: string) => {
    return axios.get(origin + '/api/repos/' + repoName + '/blob/' + branch + '/' + path)
        .then(function (response) {
            let data = response.data.fileData;

            return data;
        })
        .catch(function (error) {
            console.log(error);
            return '';
        });
};

export const getGitTreeContent = (action: ActionsTypes['setFiles'], onLoader: ActionsTypes['setLoader'], name: string, branch: string, path: string) => {
    onLoader(true);
    let filePath = path ? '/' + path : '';

    return axios.get(origin + '/api/repos/' + name + '/tree/' + branch + filePath)
        .then(function (response) {
            let files = response.data.files;

            files.pop();

            let formatted = files.map((item: string) => {
                let splitedName = item.split('\t');
                let splitedType = splitedName[0].split(' ');
                let filePath = splitedName[1];
                let name = pathToName(filePath);

                return { name: name, isFolder: splitedType[1] === 'tree' };
            });

            action(_.sortBy(formatted, [function (o: File) { return !o.isFolder; }]));
        })
        .catch(function (error) {
            console.log(error);
            return [];
        }).finally(function () {
            onLoader(false);
        });
};
/*
export const getGitBranches = (repo) => {
    return axios.get(origin + '/api/branches/' + repo)
        .then(function (response) {
            let branches = response.data.branches;

            branches.pop();

            let formatted = branches.map(item => {
                let splitedItem = item.split('@');

                return {
                    brunch: splitedItem[0],
                    committer: splitedItem[2],
                    time: splitedItem[1],
                    lastCommit: splitedItem[3]
                };
            });

            return formatted;
        })
        .catch(function (error) {
            console.log(error);

            return [];
        });
};*/