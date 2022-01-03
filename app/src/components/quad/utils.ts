import { IconName } from '@fortawesome/fontawesome-svg-core';
import { Colors } from './../../app/constants';

const getIconProps = (charge: number): { iconName: IconName; color: string } => {
    if (charge <= 5) {
        return { iconName: 'battery-empty', color: Colors.DANGER };
    } else {
        if (charge <= 25) {
            return { iconName: 'battery-quarter', color: Colors.WARNING };
        } else {
            if (charge <= 50) {
                return { iconName: 'battery-half', color: Colors.WARNING };
            } else {
                if (charge <= 75) {
                    return { iconName: 'battery-three-quarters', color: Colors.SUCCESS };
                } else {
                    return { iconName: 'battery-full', color: Colors.SUCCESS };
                }
            }
        }
    }
};

const getProgressBarVariant = (charge: number): 'success' | 'danger' | 'warning' | 'info' =>
    charge <= 5 ? 'danger' : charge <= 50 ? 'warning' : 'success';

export { getIconProps, getProgressBarVariant };
