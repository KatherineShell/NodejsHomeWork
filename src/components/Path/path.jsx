import React from "react";
import { NavLink } from 'react-router-dom';

const Path = ({ path, repoId, branch }) => {
    let paths = [];

    if (repoId) {
        paths.push({ name: repoId, route: '/' });
    }

    if (path) {
        let index = path.lastIndexOf('/');

        if (index >= 0) {
            let splitedpaths = path.split('/');
            let route = '';

            splitedpaths = splitedpaths.map(el => {
                route += '/' + el;
                return { name: el, route: route };
            });

            paths = [...paths, ...splitedpaths];
        }
        else if (path) {
            paths.push({ name: path, paths: '/' + path });
        }

    }

    return (
        <div className="Path Section_space-bottom_xxs Section_space-top_xs Section_border_bottom">
            {paths.map((el, key) => {
                let style = 'Text_size_sm Path-Route';

                return key === paths.length - 1 ?
                    (<div key={key} className={style + ' Text_state_bold'} >{el.name}</div>) :
                    (<NavLink key={key} className={style + ' Text_color_gray Text_decor_none'}
                        to={'/' + repoId + '/tree/' + branch + el.route}>{el.name}</NavLink>);
            })}
        </div>
    );
};

export default Path;