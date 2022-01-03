import React, { FunctionComponent, useEffect } from 'react';
import { ProgressBar } from 'react-bootstrap';
import { useEffectOnce } from 'react-use';
import { generateDroneID } from '../../app/store/quads/utils';
import Quad from '../../app/types/quad';
import useTimer from '../../hooks/useTimer';
type ActiveQuadBodyProps = { quad: Quad; onTick: (id: string, quad: Quad) => void };
const ActiveQuadBody: FunctionComponent<ActiveQuadBodyProps> = ({ quad, onTick }) => {
    const { timer, handleStart } = useTimer(0);

    useEffectOnce(() => {
        handleStart();
    });

    useEffect(() => {
        onTick(generateDroneID(quad), quad);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [timer]);

    return (
        <>
            <ProgressBar variant="success" now={0} />
        </>
    );
};

export default ActiveQuadBody;
