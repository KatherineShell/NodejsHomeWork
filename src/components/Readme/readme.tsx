import React from "react";
import PreviewWrapper from '../PreviewWrapper/previewWrapper';
import { getFileData } from '../../store/requests';
import showdown from 'showdown';
import { Route } from '../Header/route';

export default class Readme extends React.PureComponent<Route>{
    constructor(props: Route) {
        super(props);

        this.getContent = this.getContent.bind(this);
    }
    public readme = React.createRef<HTMLDivElement>();

    componentDidMount() {
        this.getContent();
    }

    getContent() {
        let { path, repoId, branch } = this.props;

        getFileData(repoId, path + 'README.md', branch).then(res => {
            let converter = new showdown.Converter();
            let html = converter.makeHtml(res);
            const node = this.readme.current;

            if (node) node.innerHTML = html;
        });
    }

    componentDidUpdate(prevProps: Route) {
        let { repoId } = this.props;

        if (prevProps.repoId !== repoId) {
            this.getContent();
        }
    }

    render() {
        return (<PreviewWrapper name='README.md'>
            <div className='Readme' ref={this.readme}></div>
        </PreviewWrapper>);
    }
}