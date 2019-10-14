import React from "react";
import { connect } from 'react-redux';
import Readme from '../Readme/readme';
import { NavLink } from 'react-router-dom';
import * as actions from '../../store/actions';
import { Route } from '../Header/route';
import { File } from './file';
import { StoreType } from '../../store/reducers/reducer';

interface FileProps {
    isLoader: boolean;
    files: File[];
}

type Props = Route & FileProps;

const Files = ({ files, isLoader, path, branch, repoId }: Props) => {
    let readme = files.find(el => el.name === 'README.md');
    let pathname = window.location.pathname;
    let fileRoute = pathname[pathname.length - 1] === '/' ? pathname : pathname + '/';

    return (
        <div className="Table Text_size_sm">
            <div className="Section_border_bottom Table-Header">
                <div className="Table-Cell">Name</div>
                <div className="Table-Cell">Last commit</div>
                <div className="Table-Cell">Commit message</div>
                <div className="Table-Cell">Commiter</div>
                <div className="Table-Cell">Updated</div>
            </div>
            {isLoader ?
                <div className="Table-Row-center"><div className="Loader Loader_state_m" /></div>
                : files.map((file, key) => {
                    let styleName = file.isFolder ? ' Icon-Folder' : '';
                    let nameRoute = !file.isFolder ? fileRoute.replace('tree', 'blob') : fileRoute;

                    return (
                        <div key={key} className="Table-Row">
                            <NavLink
                                className={"Table-Cell Table-Order Cell-Folder Text_decor_none Text_state_bold Text_state_black "
                                    + styleName}
                                to={nameRoute + file.name}>{file.name}</NavLink>
                            <div className="Table-Cell Text_state_link Text_state_pointer">f67s5e</div>
                            <div className="Table-Cell Table-Order Cell-Message">[vcs] move http to arc</div>
                            <div className="Table-Cell Table-Commiter">commiter</div>
                            <div className="Table-Cell">4 hours ago</div>
                        </div>);
                })}
            {readme && <Readme path={path} repoId={repoId} branch={branch} />}
        </div>
    );
};

export default connect((state: StoreType) => ({
    files: state.allFiles.filter(item =>
        item.name.toUpperCase().includes(state.fileName.toUpperCase())),
    isLoader: state.isLoader
}), actions)(Files);