import React from "react";
import Files from '../Files/files.jsx';
import { getGitTreeContent } from '../../store/requests.js';
import * as actions from '../../store/actions.js';
import { connect } from 'react-redux';
import { pathToName } from '../../helper/helper.js';

const tabs = ['files', 'branches'];

class Tree extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            activeTab: 'files',
            goToBlob: false
        };

        this.onChangeTab = this.onChangeTab.bind(this);
        this.getTree = this.getTree.bind(this);
    }

    onChangeTab(name) {
        this.setState({ activeTab: name });
    }

    getTree() {
        let { setFiles, setLoader, path, repoId, branch } = this.props;

        if (repoId && branch) getGitTreeContent(setFiles, setLoader, repoId, branch, path);
    }

    componentDidMount() {
        this.getTree();
    }

    componentDidUpdate(prevProps) {
        let { path, files, repoId, branch } = this.props;

        if (prevProps.path !== path ||
            prevProps.repoId !== repoId ||
            prevProps.branch !== branch
        ) {
            let file = pathToName(path);
            let existFile = files.find(el => el.name === file);

            if (!existFile) {
                this.getTree();
                return;
            }

            let isDir = existFile.isFolder;

            if (isDir) {
                this.getTree();
            }
        }
    }

    render() {
        let { activeTab } = this.state;
        let { path, branch, repoId } = this.props;

        return ( <>
                <div className="Section_space-top_xs Section_border_bottom Tabs Text_state_bold">
                    {tabs.map((tab, key) => {
                        let style = 'Tab Text_size_mm Text_state_pointer';

                        style += activeTab === tab ?
                            ' Dropdown Tab-Title_active' : ' Text_color_gray Tab-Title';

                        return (<div key={key} onClick={() => this.onChangeTab(tab)}
                            className={style}>{tab}</div>);
                    })}
                </div>
                {activeTab === 'files' ? <Files path={path} repoId={repoId} branch={branch} /> : null}
            </>
        );
    }
};

export default connect((state) => ({
    files: state.allFiles.filter(item =>
        item.name.toUpperCase().includes(state.fileName.toUpperCase()))
}), actions)(Tree);