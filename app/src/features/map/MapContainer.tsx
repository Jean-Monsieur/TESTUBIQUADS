import React, { FunctionComponent } from 'react';
import { Col, OverlayTrigger, Popover, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { isLoadingDeliveries, selectAllPositions } from '../../app/store/deliveries/deliveriesSlice';
import Postion, { PositionType } from '../../app/types/position';
import Icon from '../../components/icon/Icon';
import generateCartesianMap from './generateCartesianMap';
import MapToolTip from './MapToolTip';

type MapContainerProps = { currentStartPoint: Postion };

const MapContainer: FunctionComponent<MapContainerProps> = ({ currentStartPoint }) => {
    const positions = useSelector(selectAllPositions);
    const isLoading = useSelector(isLoadingDeliveries);

    const map = generateCartesianMap(12);

    if (isLoading !== true) {
        positions.forEach((s) => (map[s.position.y][s.position.x] = s));
    }

    return (
        <>
            {!isLoading && (
                <div style={{ border: '1px solid black' }}>
                    {map.map((y) => (
                        <Row style={{}}>
                            {y.map((x) =>
                                x !== null ? (
                                    <OverlayTrigger
                                        trigger="hover"
                                        placement={'auto'}
                                        overlay={
                                            <Popover id={`popover-positioned`}>
                                                <MapToolTip positionItem={x} startPoint={currentStartPoint} />
                                            </Popover>
                                        }>
                                        <Col>
                                            <Icon
                                                color={
                                                    x.position.type === PositionType.DELIVERY ? '#0d6efd' : '#ffc107'
                                                }
                                                size="2x"
                                                name={
                                                    x.position.type === PositionType.DELIVERY
                                                        ? 'box-open'
                                                        : 'charging-station'
                                                }
                                            />
                                        </Col>
                                    </OverlayTrigger>
                                ) : (
                                    <Col>
                                        <Icon
                                            color={x === null ? 'white' : 'black'}
                                            name={
                                                x === PositionType.DELIVERY
                                                    ? 'box-open'
                                                    : x === PositionType.STATION
                                                    ? 'charging-station'
                                                    : 'user'
                                            }
                                        />
                                    </Col>
                                )
                            )}
                        </Row>
                    ))}
                </div>
            )}
        </>
    );
};

export default MapContainer;
