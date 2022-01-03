import React, { CSSProperties, FunctionComponent } from 'react';

export type InlineSpaceProps = {
    style?: CSSProperties;
};

const InlineSpace: FunctionComponent<InlineSpaceProps> = ({ style = { width: 5, display: 'inline-block' } }) => {
    return <span style={style} />;
};

export default InlineSpace;
