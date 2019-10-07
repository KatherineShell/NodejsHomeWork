import React from "react";
import { getFileData } from '../../store/requests.js';
import { pathToName } from '../../helper/helper.js';
import Preview from '../Preview/preview.jsx';
import _ from 'lodash';

const tabs = ['detais', 'history'];

export default class Blob extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            activeTab: 'detais',
            content: []
        };

        this.onChangeTab = this.onChangeTab.bind(this);
    }

    onChangeTab(name) {
        this.setState({ activeTab: name });
    }

    componentDidMount() {
        let { repoId, path, branch } = this.props;

        getFileData(repoId, path, branch).then(res => {
            this.setState({ content: _.split(res, '\n') });
        });
    }

    render() {
        let { activeTab, content } = this.state;
        let fileName = pathToName(this.props.path);

        return (
            <>
                <div className="Section_space-top_xs Section_border_bottom Tabs Text_state_bold">
                    {tabs.map((tab, key) => {
                        let style = 'Tab Text_size_mm Text_state_pointer';

                        style += activeTab === tab ?
                            ' Dropdown Tab-Title_active' : ' Text_color_gray Tab-Title';

                        return (<div key={key} onClick={() => this.onChangeTab(tab)}
                            className={style}>{tab}</div>);
                    })}
                </div>
                {activeTab === 'detais' ? <Preview name={fileName} content={content} /> : null}
            </>
        );
    }
};