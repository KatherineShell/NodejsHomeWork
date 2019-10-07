import React from "react";
import Select from '../../Select/select.jsx';
import { getGitRepos, getGitTreeContent } from '../../../store/requests.js';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions.js';
import { Redirect } from 'react-router-dom';

class RepoSelect extends React.PureComponent {
    constructor() {
        super();

        this.state = {
            repos: [],
            name: ''
        };

        this.onSelect = this.onSelect.bind(this);
    }

    componentDidMount() {
        let { repoId, setRepoName } = this.props;

        getGitRepos().then(result => {
            this.setState({ repos: result });
        });

        if (repoId) {
            this.setState({ name: repoId });
            setRepoName(repoId);
        }
    }

    onSelect(value, onClose) {
        let { setRepoName, setFiles, setLoader, path } = this.props;

        onClose();
        this.setState({ name: value, goToRepo: true });
        setRepoName(value);
        //   getGitTreeContent(setFiles, setLoader, value, path); 
    }

    componentDidUpdate(prevProps, prevState) {
        let { repoId, setRepoName } = this.props;

        if (repoId !== prevProps.repoId) {
            setRepoName(repoId);
        }
        if (prevState.name !== this.state.name) {
            this.setState({ goToRepo: false });
        }
    }

    render() {
        let { repos, name, goToRepo } = this.state;
        let { className } = this.props;

        return (goToRepo ?
            <Redirect to={'/' + name + "/tree/master/"} />
            :
            <div className={className + ' RepoSelect'}>
                <Select
                    wrapperClass="Dropdown"
                    headerClass="Dropdown-Header"
                    onChange={this.onSelect}
                    options={repos}
                    value={<div className="Text_size_ss">
                        <span className="Text_state_bold">Repository </span>
                        <span >{name}</span>
                    </div>}
                    menuClass="MenuList"
                    renderItem={(item, key, onClose) => (
                        <div key={key} onClick={() => this.onSelect(item.name, onClose)}
                            className='MenuList-Item Text_size_sm'>{item.name}</div>
                    )}
                />
            </div>);
    }
}

export default connect(() => ({}), actions)(RepoSelect);