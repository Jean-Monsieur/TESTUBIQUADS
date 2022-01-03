import { FunctionComponent, useCallback, useMemo } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { generateDroneID } from '../../app/store/quads/utils';
import Postion from '../../app/types/position';
import Quad, { DroneStatus } from '../../app/types/quad';
import { getTimeDisplay } from '../../utils/getTimeDisplay';
import Icon from '../icon/Icon';
import IconWithText from '../icon/IconWithText';
import BatteryIndicator from './BatteryIndicator';

type QuadItemProps = {
    quad: Quad;
    onUnassignedClicked?: (id: string, quad: Quad) => void;
    onAssignDeliveryClicked?: (quad: Quad, stationInfo: { location: Postion; stationId: number }) => void;
};

const QuadItem: FunctionComponent<QuadItemProps> = ({ quad, onUnassignedClicked, children }) => {
    const { manufacturer, model, charge, maxFlightTime } = quad;

    const handleUnassignedClicked = useCallback(() => {
        if (onUnassignedClicked !== undefined) {
            onUnassignedClicked(generateDroneID(quad), quad);
        }
    }, [onUnassignedClicked, quad]);

    const variant = useMemo(() => (quad.status === DroneStatus.CRASHED ? 'danger' : 'light'), [quad.status]);

    return (
        <Card bg={variant} text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}>
            <Card.Body>
                <Row>
                    <Col>
                        <IconWithText name="plane" displayText={`${manufacturer} | ${model}`} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <IconWithText name="clock" displayText={getTimeDisplay(maxFlightTime)} />
                    </Col>
                </Row>
                {children}
            </Card.Body>
            <Card.Footer>
                <Row>
                    <Col>
                        <BatteryIndicator charge={charge} />
                    </Col>
                    <Col style={{ textAlign: 'end' }}>
                        {onUnassignedClicked && (
                            <Button
                                size="sm"
                                variant={`outline-${quad.status === DroneStatus.CRASHED ? 'dark' : 'danger'}`}
                                onClick={handleUnassignedClicked}>
                                <Icon name="times" />
                            </Button>
                        )}
                    </Col>
                </Row>
            </Card.Footer>
        </Card>
    );
};

export default QuadItem;
