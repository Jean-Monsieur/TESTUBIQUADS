import React, { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchQuads, isLoadingQuads } from '../../app/store/quads/quadsSlice';

import { Container, Row } from 'react-bootstrap';

import IdleDronesLayout from '../idle-drone/IdleDronesLayout';
import StationDronesLayout from '../stations/StationDronesLayout';
import ActiveDronesLayout from '../active-drones/ActiveDronesLayout';
import { fetchDeliveries } from '../../app/store/deliveries/deliveriesSlice';

const Home: FunctionComponent = () => {
    const dispatch = useDispatch();

    const loading = useSelector(isLoadingQuads);

    useEffect(() => {
        dispatch(fetchQuads());
        dispatch(fetchDeliveries());
    }, [dispatch]);

    const [show, setShow] = useState(false);

    const handleIdleDronesToggled = useCallback(() => {
        setShow(!show);
    }, [show]);

    return (
        <Container fluid>
            <IdleDronesLayout loading={loading} isShown={show} title="Idle Drones" onClose={handleIdleDronesToggled} />
            <Row>
                <StationDronesLayout onAssignClicked={handleIdleDronesToggled} title="Stations" />
                <ActiveDronesLayout title={'Deliveries'} />
            </Row>
        </Container>
    );
};

export default Home;
