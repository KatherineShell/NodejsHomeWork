import * as React from "react";
import { text } from '../../constants/text';

const Footer = React.memo(() => {
    let currentYear: unknown = new Date().getFullYear();
    let year = currentYear as string;

    return (
        <footer className="Footer Section_border_top Footer_space-h_l Footer_space-top_m Footer_space-bottom_s">
            <div className="Footer-Text Text_size_xs Footer-Address">{text.footerAddress}</div>
            <div className="Footer-Text Text_size_xs">{text.footerYears.replace('{year}', year)}
                <span className="Text_state_link Text_state_pointer"> Yandex</span>
            </div>
        </footer>
    );
});

export default Footer;