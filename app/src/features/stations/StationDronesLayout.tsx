import React, { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { Badge, Button, ButtonGroup, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDeliveries, selectAllPendingDeliveries } from '../../app/store/deliveries/deliveriesSlice';
import { selectAllAssignedQuads, setAssignedQuads } from '../../app/store/quads/assignedQuadsSlice';
import { assignDelivery, selectAllIdleDrones } from '../../app/store/quads/quadsSlice';
import { generateDroneID } from '../../app/store/quads/utils';
import { fetchStations, isLoadingStations, selectAllStations } from '../../app/store/stations/stationSlice';
import { AsyncDispatch } from '../../app/store/store';
import Postion from '../../app/types/position';
import Quad from '../../app/types/quad';
import scrollCol from '../../components/layout';
import DeliverCanvas from '../../components/quad/DeliverCanvas';
import StationItem from '../../components/station/Station';

type StationDronesLayoutProps = {
    title: string;
    onAssignClicked: React.MouseEventHandler<HTMLButtonElement>;
};

const StationDronesLayout: FunctionComponent<StationDronesLayoutProps> = (props) => {
    const dispatch = useDispatch<AsyncDispatch>();

    const assignedQuads = useSelector(selectAllAssignedQuads);
    const idleDrones = useSelector(selectAllIdleDrones);
    const isLoadingStation = useSelector(isLoadingStations);
    const stations = useSelector(selectAllStations);
    const deliveries = useSelector(selectAllPendingDeliveries);

    const [currentStationInfo, setCurrentStationInfo] = useState<{ location: Postion; stationId: number }>();
    const [currentQuad, setCurrentQuad] = useState<Quad>();
    const [showDeliverCanvas, setShowDeliverCanvas] = useState<boolean>(false);

    useEffect(() => {
        dispatch(fetchStations());
        dispatch(fetchDeliveries());
    }, [dispatch]);

    const handleAutoAssignClicked = useCallback(() => {
        const unnassignedQuadIds = idleDrones.map((q) => generateDroneID(q));

        let QuadsToAssign: { [key: number]: string[] } = {
            1: [],
            2: [],
            3: []
        };
        let toBeAssignedQuadsIds: string[] = [];
        unnassignedQuadIds.forEach((id) => {
            Object.values(assignedQuads).forEach((v, index) => {
                const initialCapacity = v.length;

                let station = index + 1;
                if (initialCapacity < 10 && QuadsToAssign[station].length < 10 && !toBeAssignedQuadsIds.includes(id)) {
                    QuadsToAssign = {
                        ...QuadsToAssign,
                        [station]: [...QuadsToAssign[station], id]
                    };
                    toBeAssignedQuadsIds.push(id);
                }
            });
        });

        dispatch(setAssignedQuads({ value: QuadsToAssign, toBeAssignedQuadsIds: toBeAssignedQuadsIds }));
    }, [assignedQuads, dispatch, idleDrones]);

    const handleAssignDeliveryButtonClicked = useCallback(
        (quad: Quad, stationInfo: { location: Postion; stationId: number }) => {
            setCurrentQuad(quad);
            setCurrentStationInfo(stationInfo);
            setShowDeliverCanvas(true);
        },
        []
    );

    const handleAssignDeliveryClicked = useCallback(
        (quad: Quad, deliveryId: number) => {
            if (currentStationInfo !== undefined) {
                dispatch(
                    assignDelivery({ quad: quad, deliveryId: deliveryId, stationId: currentStationInfo.stationId })
                ).then((response) => {
                    if (response.type === assignDelivery.fulfilled.toString()) {
                        setShowDeliverCanvas(false);
                    }
                });
            }
        },
        [dispatch, currentStationInfo]
    );

    return (
        <Col md={8} lg={10} style={scrollCol}>
            <h1>{props.title}</h1>

            <div className="d-grid gap-2">
                <ButtonGroup className="me-2" aria-label="First group">
                    <Button
                        variant="outline-primary"
                        onClick={handleAutoAssignClicked}
                        disabled={idleDrones.length <= 0}>
                        Auto Assign Idle Quads <Badge bg="secondary">{idleDrones.length}</Badge>
                    </Button>
                    <Button variant="outline-primary" size="lg" onClick={props.onAssignClicked}>
                        Assign Drone <Badge bg="secondary">{idleDrones.length}</Badge>
                    </Button>
                </ButtonGroup>
            </div>

            {currentQuad !== undefined && (
                <DeliverCanvas
                    deliveries={deliveries}
                    currentStartPoint={currentStationInfo?.location ?? { x: 0, y: 0, type: 0 }}
                    quad={currentQuad}
                    show={showDeliverCanvas}
                    onAssignDeliveryClicked={handleAssignDeliveryClicked}
                    onClose={() => setShowDeliverCanvas(false)}
                />
            )}

            {isLoadingStation ? (
                <></>
            ) : (
                stations.map((s, index) => (
                    <StationItem
                        key={index}
                        {...s}
                        deliveries={deliveries}
                        onAssignDeliveryClicked={handleAssignDeliveryButtonClicked}
                    />
                ))
            )}
        </Col>
    );
};

export default StationDronesLayout;
