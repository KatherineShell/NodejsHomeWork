import React from "react";
import { getGitBranches } from '../../store/requests.js';
import { connect } from 'react-redux';
import * as actions from '../../store/actions.js';
import { pathToName } from '../../helper/helper.js';
import Select from '../Select/select.jsx';

class Trunk extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = { search: props.fileName || '', brunch: 'master', list: [] }

        this.onSearch = this.onSearch.bind(this);
    }

    componentDidMount() {
        let { repoId, branch } = this.props;

        if (branch) {
            this.setState({ brunch: branch });
        }
        if (repoId) {
            this.props.setRepoName(repoId);
        }
        //   getGitBranches('git')
    }

    onSearch(e) {
        let { value } = e.target;

        this.setState({ search: value });
        this.props.setFileName(value);
    }

    render() {
        let { search, brunch, list } = this.state;
        let { path, repoId } = this.props;
        let current = path ? pathToName(path) : repoId;

        return (
            <>
                <div className="Section_space-bottom_xxs Section_space-top_xs Trunk">
                    <div className="Text_size_l">
                        <span className="Text_state_bold">{current}</span>
                        <Select
                            wrapperClass="BrunchSelect"
                            onChange={this.onSelect}
                            options={list}
                            value={<div className="Text_color_gray Text_state_pointer">
                                {brunch}
                            </div>}
                            menuClass="MenuList"
                            renderItem={(item, key, onClose) => (
                                <div key={key} onClick={() => this.onSelect(item.name, onClose)}
                                    className='MenuList-Item Text_size_sm'>{item.name}</div>
                            )}
                        />
                        
                    </div>
                    <input onChange={this.onSearch} className="Search" value={search}
                        placeholder="Search..." type="text" />
                </div>
                <div>
                    <div className="Text_size_sm Section_space-bottom_xxxs">
                        Last commit <span className="Text_state_link Text_state_pointer">c3621f</span> on
                    <span className="Text_state_link">20 Oct 2017, 12:24</span> by
                    <span className="Text_state_author">robot-search-release</span>
                    </div>
                </div>
            </>
        );
    }
};

export default connect((state) => ({
    fileName: state.fileName
}), actions)(Trunk);