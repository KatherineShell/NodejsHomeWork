import React from "react";
import PreviewWrapper from '../PreviewWrapper/previewWrapper.jsx';

const Preview = ({ name, content }) => {
    return (
        <PreviewWrapper name={name}>
            <ol>
                {content.map((str, key) => (<li key={key}>{str}</li>))}
            </ol>
        </PreviewWrapper>
    );
};

export default Preview;