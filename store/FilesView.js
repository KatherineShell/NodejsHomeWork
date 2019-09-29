import View from './View.js';

export default class FilesView extends View {
    constructor(el, store) {
        super(el, store);
    }

    render(data) {
        let { repoName, isLoader, filteredFiles } = data;
        let htmlStr = '';

        if (!repoName) {
            htmlStr += '<div class="Flex Flex-center">' +
                'Please choose the repo.' +
                '</div>';
        }
        else if (isLoader) {
            htmlStr += '<div class="Flex Flex-center">' +
                '<div class="Loader Loader_state_m"></div>' +
                '</div>';
        }
        else {
            filteredFiles.forEach(element => {
                let folderStyle = element.isFolder ? ' Icon-Folder ' : '';

                htmlStr += '<div class="Table-Row">' +
                    '<div class="Table-Cell Table-Order' + folderStyle + 'Cell-Folder">' + element.name + '</div>' +
                    '<div class="Table-Cell Text_state_link Text_state_pointer">f67s5e</div>' +
                    '<div class="Table-Cell Table-Order Cell-Message">[vcs] move http to arc</div>' +
                    '<div class="Table-Cell Table-Commiter">commiter</div>' +
                    '<div class="Table-Cell">some time ago</div>' +
                    '</div>';
            });
        }

        this._el.innerHTML = htmlStr;
    }

    destroy() {
        super.destroy();
    }
}