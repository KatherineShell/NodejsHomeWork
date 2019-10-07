import React from "react";
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Page from './components/Page/page.jsx';
import Tree from './components/Tree/tree.jsx';
import Blob from './components/Blob/blob.jsx';
import { NavLink } from 'react-router-dom';

class NotFound extends React.Component {
    render() {
        return (<>
            <h2>Ресурс не найден</h2>
            <NavLink to='/'><h3>Вернуться</h3></NavLink>
        </>);
    }
}

const TreeContainer = Page(Tree);
const BlobContainer = Page(Blob);

const App = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={TreeContainer} />
                <Route exact path="/:repoId/tree/:branch?/:path(.*)?" component={TreeContainer} />
                <Route exact path="/:repoId/blob/:branch?/:path(.*)?" component={BlobContainer} />
                <Route component={NotFound} />
            </Switch>
        </BrowserRouter>
    );
};

export default App;