import React from "react";

export default class Select extends React.PureComponent {
    constructor() {
        super();

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