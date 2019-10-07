import React from "react";
import PreviewWrapper from '../PreviewWrapper/previewWrapper.jsx';
import { getFileData } from '../../store/requests.js';
import showdown from 'showdown';

export default class Readme extends React.PureComponent {
    constructor(props) {
        super(props);

        this.readme = React.createRef();
        this.getContent = this.getContent.bind(this);
    }

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

    componentDidUpdate(prevProps) {
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