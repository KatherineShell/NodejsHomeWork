import React from "react";
import Footer from '../Footer/footer.jsx';
import Header from '../Header/header.jsx';
import Path from '../Path/path.jsx';
import Trunk from '../Trunk/trunk.jsx';

const Page = (WrappedComponent) => {
    return class extends React.PureComponent {
        constructor(props) {
            super(props);
        }

        render() {
            let { path, repoId, branch } = this.props.match.params;

            return (<>
                <Header path={path} repoId={repoId} branch={branch} />
                <div className="Section_border_top Section_space-h_xxl Page-Content">
                    <Path  path={path} repoId={repoId} branch={branch} />
                    <Trunk  path={path} repoId={repoId} branch={branch} />
                    <WrappedComponent path={path} repoId={repoId} branch={branch} />
                </div>
                <Footer />
            </>);
        }
    };
};

export default Page;