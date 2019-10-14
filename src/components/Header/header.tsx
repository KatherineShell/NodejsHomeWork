import React from "react";
import RepoSelect from './RepoSelect/repoSelect';
import { Route } from './route';

const Header = React.memo(({ path, repoId, branch }: Route) => {
    return (<header className="Header Section_space-h_xxl">
        <div className="Header-Logo Header-Item"></div>
        <RepoSelect className="Header-Item" path={path} repoId={repoId} branch={branch} />
    </header>);
});

export default Header;