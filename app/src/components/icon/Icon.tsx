import {
    findIconDefinition,
    FlipProp,
    IconDefinition,
    IconLookup,
    IconName,
    IconPrefix,
    SizeProp
} from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { CSSProperties, FunctionComponent } from 'react';

export type IconProps = {
    prefix?: IconPrefix;
    name: IconName;
    size?: SizeProp;
    flip?: FlipProp;
    isSpinning?: boolean;
    className?: string;
    style?: CSSProperties;
    title?: string;
    color?: string;
    spin?: boolean;
};

const Icon: FunctionComponent<IconProps> = ({
    prefix = 'fas',
    name: iconName,
    size = '1x',
    flip = undefined,
    isSpinning = false,
    ...rest
}) => {
    const lookup: IconLookup = { prefix, iconName };
    const iconDef: IconDefinition = findIconDefinition(lookup);
    if (iconDef === undefined) {
        console.warn('Could not find icon ' + iconName);
        return null;
    }

    return <FontAwesomeIcon icon={iconDef} size={size} flip={flip} spin={isSpinning} {...rest} />;
};

export default Icon;
