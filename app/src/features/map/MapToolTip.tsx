import React, { FunctionComponent } from 'react';
import { Popover } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { selectAllDeliveries } from '../../app/store/deliveries/deliveriesSlice';
import { selectAllStations } from '../../app/store/stations/stationSlice';
import Postion, { PositionType } from '../../app/types/position';
import getDistancebetweenTwoPoints from '../../utils/getDistancebetweenTwoPoints';

type MapToolTipProps = {
    positionItem: { id: number; position: Postion };
    startPoint: Postion;
};

const MapToolTip: FunctionComponent<MapToolTipProps> = ({ positionItem, startPoint }) => {
    const deliveries = useSelector(selectAllDeliveries);
    const stations = useSelector(selectAllStations);

    const currentItem =
        positionItem.position.type === PositionType.DELIVERY
            ? deliveries.find((d) => d.id === positionItem.id)
            : stations.find((s) => s.id === positionItem.id);

    return (
        <>
            <Popover.Header as="h6">{currentItem?.name}</Popover.Header>
            <Popover.Body>{getDistancebetweenTwoPoints(startPoint, positionItem.position)} minutes</Popover.Body>
        </>
    );
};

export default MapToolTip;
