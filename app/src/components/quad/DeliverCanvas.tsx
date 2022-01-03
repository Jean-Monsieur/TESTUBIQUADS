import React, { CSSProperties, FunctionComponent } from 'react';
import { Col, Container, Dropdown, DropdownButton, Offcanvas, Row } from 'react-bootstrap';
import Delivery from '../../app/types/delivery';
import Postion from '../../app/types/position';
import Quad from '../../app/types/quad';
import MapContainer from '../../features/map/MapContainer';
import getDistancebetweenTwoPoints from '../../utils/getDistancebetweenTwoPoints';
import IconWithText from '../icon/IconWithText';
import QuadItem from './QuadItem';

export type DeliverCanvasProps = {
    deliveries: Delivery[];
    show: boolean;
    quad: Quad;
    currentStartPoint: Postion;
    onAssignDeliveryClicked: (quad: Quad, deliveryId: number) => void;
    onClose: () => void;
};

const DeliverCanvas: FunctionComponent<DeliverCanvasProps> = ({
    deliveries,
    show,
    quad,
    currentStartPoint,
    onAssignDeliveryClicked,
    onClose
}) => {
    const rowStyle: CSSProperties = { marginBottom: '1rem' };

    return (
        <Offcanvas show={show} onHide={onClose} placement="end" style={{ width: '40%' }}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Assign {quad.model} to delivery</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Container>
                    <Row style={rowStyle}>
                        <Col>
                            <MapContainer currentStartPoint={currentStartPoint} />
                        </Col>
                    </Row>
                    <Row style={rowStyle}>
                        <Col>
                            <QuadItem quad={quad}></QuadItem>
                        </Col>
                    </Row>
                    <Row style={rowStyle}>
                        <Col>
                            <div className="d-grid gap-2">
                                <DropdownButton
                                    size="lg"
                                    id="dropdown-basic-button"
                                    title={<IconWithText name="paper-plane" displayText="Assign Delivery" />}>
                                    {deliveries.map((d) => (
                                        <Dropdown.Item
                                            key={d.id}
                                            onClick={() => {
                                                onAssignDeliveryClicked(quad, d.id);
                                            }}>
                                            {d.name}{' '}
                                            {getDistancebetweenTwoPoints(currentStartPoint, d.destination)
                                                .toFixed(2)
                                                .toString()}{' '}
                                            km
                                        </Dropdown.Item>
                                    ))}
                                </DropdownButton>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default DeliverCanvas;
