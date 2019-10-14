import React from "react";
//import { getGitBranches } from '../../store/requests';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import { pathToName } from '../../helper/helper';
import Select from '../Select/select';
import { ActionsTypes } from '../../store/actions';
import { Route } from '../Header/route';
import { StoreType } from '../../store/reducers/reducer';

interface trunkProps {
    fileName: string;
}

interface State {
    search: string;
    brunch: string;
    list: Array<{name:string}>;
}

type Props = Pick<ActionsTypes, 'setFileName' | 'setRepoName'> & Route & trunkProps;

class Trunk extends React.PureComponent<Props, State>{
    constructor(props: Props) {
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

    onSearch(e: React.ChangeEvent<HTMLInputElement>) {
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
                            options={list}
                            value={<div className="Text_color_gray Text_state_pointer">
                                {brunch}
                            </div>}
                            menuClass="MenuList"
                            renderItem={(item, key, onClose) => (
                                <div key={key} /*onClick={() => this.onSelect(item.name, onClose)}*/
                                    className='MenuList-Item Text_size_sm'>{/*item.name*/}</div>
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

export default connect((state: StoreType) => ({
    fileName: state.fileName
}), actions)(Trunk);