import React, { FunctionComponent, useMemo } from 'react';
import IconWithText from '../icon/IconWithText';
import { getIconProps } from './utils';

type BatteryIndicatorProps = { charge: number };

const BatteryIndicator: FunctionComponent<BatteryIndicatorProps> = ({ charge }) => {
    const { iconName, color } = useMemo(() => getIconProps(charge), [charge]);

    return <IconWithText name={iconName} color={color} displayText={`${charge} %`} />;
};

export default BatteryIndicator;
