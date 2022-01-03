import React, { FunctionComponent } from 'react';
import InlineSpace from '../InlineSpace';

import Icon, { IconProps } from './Icon';

export type IconWithTextProps = IconProps & { displayText: string };

const IconWithText: FunctionComponent<IconWithTextProps> = ({ displayText, ...rest }) => (
    <>
        <Icon {...rest} />
        <InlineSpace />
        {displayText}
    </>
);

export default IconWithText;
