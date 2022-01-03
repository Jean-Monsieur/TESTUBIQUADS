import { FunctionComponent, useCallback } from 'react';
import { Accordion, Alert, Badge, Col, Container, ProgressBar, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectAssignedDronesByStationId,
    selectIsFetchingAssignedQuads,
    unassignQuad
} from '../../app/store/quads/assignedQuadsSlice';
import { selectChargingDronesByIds, updateQuad } from '../../app/store/quads/quadsSlice';
import { AsyncDispatch, RootState } from '../../app/store/store';
import Delivery from '../../app/types/delivery';
import Postion from '../../app/types/position';
import Quad, { DroneStatus } from '../../app/types/quad';
import Station from '../../app/types/station';
import IconWithText from '../icon/IconWithText';
import InlineSpace from '../InlineSpace';
import QuadItem from '../quad/QuadItem';
import StationnedQuadBody from './StationnedQuadBody';

type StationProps = Station & {
    deliveries: Delivery[];
    onAssignDeliveryClicked: (quad: Quad, stationInfo: { location: Postion; stationId: number }) => void;
};

const StationItem: FunctionComponent<StationProps> = ({
    id,
    name,
    capacity,
    location,
    deliveries,
    onAssignDeliveryClicked
}) => {
    const assignedDroneIds = useSelector((state: RootState) => selectAssignedDronesByStationId(state, id));

    const drones = useSelector((state: RootState) => selectChargingDronesByIds(state, id));

    const isFetching = useSelector(selectIsFetchingAssignedQuads);

    const dispatch = useDispatch<AsyncDispatch>();

    const handleCharge = useCallback(
        (quadId: string, quad: Quad) => {
            if (quad.charge <= 99) {
                dispatch(
                    updateQuad({
                        quadId: quadId,
                        quad: {
                            ...quad,
                            charge: quad.charge + 1
                        }
                    })
                );
            }
        },
        [dispatch]
    );

    const handleUnassignedClicked = useCallback(
        (quadId: string, quad: Quad) => {
            dispatch(
                updateQuad({
                    quadId: quadId,
                    quad: {
                        ...quad,
                        status: DroneStatus.IDLE
                    }
                })
            ).then((response) => {
                if (response.type === updateQuad.fulfilled.toString()) {
                    dispatch(unassignQuad({ quadId: quadId, stationId: id }));
                }
            });
        },
        [dispatch, id]
    );

    return (
        <Accordion defaultActiveKey={id.toString()}>
            <Accordion.Item eventKey={id.toString()}>
                <Accordion.Header>
                    <IconWithText name="charging-station" displayText={name} />
                    <InlineSpace style={{ width: 40 }} />
                    {!isFetching && (
                        <Badge
                            bg={assignedDroneIds.length < capacity ? 'success' : 'danger'}
                            style={{ float: 'right' }}>{`${assignedDroneIds.length} / ${capacity}`}</Badge>
                    )}
                </Accordion.Header>
                <Accordion.Body>
                    <Container fluid>
                        <Row style={{ marginBottom: '1rem' }}>
                            <Col>
                                {!isFetching && (
                                    <ProgressBar
                                        now={assignedDroneIds.length}
                                        variant={assignedDroneIds.length < capacity ? 'success' : 'danger'}
                                        label={`${assignedDroneIds.length.toString()} / ${capacity}`}
                                        max={capacity}
                                    />
                                )}
                            </Col>
                        </Row>

                        {drones.length === 0 ? (
                            <Row>
                                <Alert style={{ textAlign: 'center' }} variant="dark">
                                    <IconWithText name="exclamation-triangle" displayText="No Drones Assigned" />
                                </Alert>
                            </Row>
                        ) : (
                            <Row xs={1} md={2} lg={5} className="g-4">
                                {drones.map((d, index) => (
                                    <Col key={index}>
                                        <QuadItem
                                            quad={d}
                                            onUnassignedClicked={handleUnassignedClicked}
                                            onAssignDeliveryClicked={onAssignDeliveryClicked}>
                                            <StationnedQuadBody
                                                availableDeliveries={deliveries.length}
                                                stationInfo={{ location: location, stationId: id }}
                                                quad={d}
                                                onCharging={handleCharge}
                                                onAssignDeliveryClicked={onAssignDeliveryClicked}
                                            />
                                        </QuadItem>
                                    </Col>
                                ))}
                            </Row>
                        )}
                    </Container>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
};

export default StationItem;
