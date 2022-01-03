import React, { FunctionComponent, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isLoadingQuads, selectAllActiveDrones, updateQuad } from '../../app/store/quads/quadsSlice';

import { Col, Spinner } from 'react-bootstrap';
import QuadItem from '../../components/quad/QuadItem';
import { generateDroneID } from '../../app/store/quads/utils';
import scrollCol from '../../components/layout';
import ActiveQuadBody from './ActiveQuadBody';
import Quad, { DroneStatus } from '../../app/types/quad';
import AssignDroneButton from '../idle-drone/AssignDroneButton';

type ActiveDronesLayoutProps = { title: string };

const ActiveDronesLayout: FunctionComponent<ActiveDronesLayoutProps> = ({ title }) => {
    const loading = useSelector(isLoadingQuads);

    const dispatch = useDispatch();
    const activeDrones = useSelector(selectAllActiveDrones);

    const handleTick = useCallback(
        (quadId: string, quad: Quad) => {
            if (quad.charge === 0) {
                dispatch(
                    updateQuad({
                        quadId: quadId,
                        quad: { ...quad, status: DroneStatus.CRASHED }
                    })
                );
            } else {
                if (quad.charge > 0) {
                    dispatch(
                        updateQuad({
                            quadId: quadId,
                            quad: {
                                ...quad,
                                charge: quad.charge - 1
                            }
                        })
                    );
                }
            }
        },
        [dispatch]
    );

    const handleUnassignClicked = useCallback(
        (id: string, quad: Quad) => {
            dispatch(
                updateQuad({
                    quadId: id,
                    quad: {
                        ...quad,
                        status: DroneStatus.IDLE
                    }
                })
            );
        },
        [dispatch]
    );

    return (
        <Col md={4} lg={2} style={scrollCol}>
            <h1>{title}</h1>
            {loading ? (
                <Spinner animation="border" variant="primary" />
            ) : (
                activeDrones.map((q) => (
                    <QuadItem
                        key={generateDroneID(q)}
                        quad={q}
                        onUnassignedClicked={q.status === DroneStatus.CRASHED ? handleUnassignClicked : undefined}>
                        <>
                            <ActiveQuadBody quad={q} onTick={handleTick} />
                            {q.status === DroneStatus.CRASHED && <AssignDroneButton id={generateDroneID(q)} />}
                        </>
                    </QuadItem>
                ))
            )}
        </Col>
    );
};

export default ActiveDronesLayout;
