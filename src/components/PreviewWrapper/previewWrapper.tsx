import React from "react";

interface Props {
    name: string;
    children: JSX.Element;
    onLoad?: () => void;
    size?: number;
}

const PreviewWrapper = ({ name, children, onLoad, size }: Props) => {
    return (<div className="Preview">
        <div className="Preview-Header">
            <div className="Text_size_sm Preview-Title">
                <div className="Preview_Icon"></div>
                <span className="Text_state_bold">{name}</span>
                {size && <span className="Preview-Size">({size} bytes)</span>}
            </div>
            {onLoad && <div className="Preview-Download"></div>}
        </div>
        <div className="Preview-Content Text_size_xsm">
            {children}
        </div>
    </div>);
}

export default PreviewWrapper;