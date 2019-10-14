import React from "react";
import PreviewWrapper from '../PreviewWrapper/previewWrapper';

interface Props {
    name: string;
    content: string[];
}

const Preview = ({ name, content }: Props) => {
    return (
        <PreviewWrapper name={name}>
            <ol>
                {content.map((str, key) => (<li key={key}>{str}</li>))}
            </ol>
        </PreviewWrapper>
    );
};

export default Preview;