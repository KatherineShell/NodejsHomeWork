import React from "react";
import Footer from '../Footer/footer';
import Header from '../Header/header';
import Path from '../Path/path';
import Trunk from '../Trunk/trunk';
import { Route } from '../Header/route';

interface Props {
    match: { params: Route };
}

const Page = (WrappedComponent: React.ComponentType<Route>) => {
    return class extends React.PureComponent<Props> {
        constructor(props: Props) {
            super(props);
        }

        render() {
            let { path, repoId, branch } = this.props.match.params;

            return (<>
                <Header path={path} repoId={repoId} branch={branch} />
                <div className="Section_border_top Section_space-h_xxl Page-Content">
                    <Path path={path} repoId={repoId} branch={branch} />
                    <Trunk path={path} repoId={repoId} branch={branch} />
                    <WrappedComponent path={path} repoId={repoId} branch={branch} />
                </div>
                <Footer />
            </>);
        }
    };
};

export default Page;