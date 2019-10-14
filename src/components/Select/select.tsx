import React from "react";
import { Repo } from '../Header/RepoSelect/Repo';

interface State {
    isOpen: boolean;
}

interface Branch{
    name:string
}

interface Props {
    value: JSX.Element;
    menuClass: string;
    headerClass?: string;
    wrapperClass: string;
    renderItem: (item: Repo | Branch, key: number, func: () => void) => JSX.Element;
    options: Array<Repo | Branch>;
}

export default class Select extends React.PureComponent<Props, State>{
    constructor(props: Props) {
        super(props);

        this.state = {
            isOpen: false
        };

        this.toggleMenu = this.toggleMenu.bind(this);
    }

    toggleMenu() {
        this.setState(state => ({ isOpen: !state.isOpen }));
    }

    render() {
        let { isOpen } = this.state;
        let { options, renderItem, value, menuClass, headerClass, wrapperClass } = this.props;
        let arrow = isOpen ? ' Dropdowm-Arrow_up' : '';

        arrow += ' Dropdowm-Arrow';

        return (<div className={wrapperClass}>
            <div className={headerClass + arrow} onClick={this.toggleMenu}>{value}</div>
            {isOpen && <div className={menuClass}>
                {options.map((item, key) => (renderItem(item, key, this.toggleMenu)))}
            </div>}
        </div>);
    }
}