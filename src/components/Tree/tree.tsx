import React from "react";
import Files from '../Files/files';
import { getGitTreeContent } from '../../store/requests';
import * as actions from '../../store/actions';
import { connect } from 'react-redux';
import { pathToName } from '../../helper/helper';
import { StoreType } from '../../store/reducers/reducer';
import { ActionsTypes } from '../../store/actions';
import { Route } from '../Header/route';
import { File } from '../Files/file';

const tabs = ['files', 'branches'];

interface State {
    activeTab: string;
}

interface TreeProps {
    files: File[];
}

type Props = Pick<ActionsTypes, 'setFiles' | 'setLoader'> & Route & TreeProps;

class Tree extends React.PureComponent<Props, State>{
    constructor(props: Props) {
        super(props);

        this.state = {
            activeTab: 'files'
        };

        this.onChangeTab = this.onChangeTab.bind(this);
        this.getTree = this.getTree.bind(this);
    }

    onChangeTab(name: string) {
        this.setState({ activeTab: name });
    }

    getTree() {
        let { setFiles, setLoader, path, repoId, branch } = this.props;

        if (repoId && branch) getGitTreeContent(setFiles, setLoader, repoId, branch, path);
    }

    componentDidMount() {
        this.getTree();
    }

    componentDidUpdate(prevProps: Props) {
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

        return (<>
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

export default connect((state: StoreType) => ({
    files: state.allFiles.filter(item =>
        item.name.toUpperCase().includes(state.fileName.toUpperCase()))
}), actions)(Tree);