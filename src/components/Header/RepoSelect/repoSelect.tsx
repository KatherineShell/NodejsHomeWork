import React from "react";
import Select from '../../Select/select';
import { getGitRepos/*, getGitTreeContent*/ } from '../../../store/requests';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import { Redirect } from 'react-router-dom';
import { Repo } from './Repo';
import { Route } from '../route';
import { ActionsTypes } from '../../../store/actions';

interface State {
    repos: Array<Repo>;
    name: string;
    goToRepo: boolean;
}

interface SelectProps {
    className: string;
}

type Props = Pick<ActionsTypes, 'setRepoName'> & Route & SelectProps;

class RepoSelect extends React.PureComponent<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            repos: [],
            name: '',
            goToRepo: false
        };

        this.onSelect = this.onSelect.bind(this);
    }

    componentDidMount() {
        let { repoId, setRepoName } = this.props;

        getGitRepos().then((result: State['repos']) => {
            this.setState({ repos: result });
        });

        if (repoId) {
            this.setState({ name: repoId });
            setRepoName(repoId);
        }
    }

    onSelect(value: string, onClose: () => void) {
        let { setRepoName/*, setFiles, setLoader, path */ } = this.props;

        onClose();
        this.setState({ name: value, goToRepo: true });
        setRepoName(value);
        //   getGitTreeContent(setFiles, setLoader, value, path); 
    }

    componentDidUpdate(prevProps: Props, prevState: State) {
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