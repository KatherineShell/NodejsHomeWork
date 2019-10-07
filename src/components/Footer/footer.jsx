import React from "react";
import { text } from '../../constants/text';

const Footer = React.memo(() => {
    let currentYear = new Date().getFullYear();

    return (
        <footer className="Footer Section_border_top Footer_space-h_l Footer_space-top_m Footer_space-bottom_s">
            <div className="Footer-Text Text_size_xs Footer-Address">{text.footerAddress}</div>
            <div className="Footer-Text Text_size_xs">{text.footerYears.replace('{year}', currentYear)}
                <span className="Text_state_link Text_state_pointer"> Yandex</span>
            </div>
        </footer>
    );
});

export default Footer;