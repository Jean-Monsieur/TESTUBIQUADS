import React, { FunctionComponent } from 'react';
import { Alert } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { selectAllIdleDrones } from '../../app/store/quads/quadsSlice';
import { generateDroneID } from '../../app/store/quads/utils';
import IconWithText from '../../components/icon/IconWithText';
import QuadItem from '../../components/quad/QuadItem';
import AssignDroneButton from './AssignDroneButton';

const IdleDronesContainer: FunctionComponent = () => {
    const drones = useSelector(selectAllIdleDrones);

    if (drones.length <= 0) {
        return (
            <Alert style={{ textAlign: 'center' }} variant="success">
                <IconWithText name="check-circle" displayText="All drones are assigned" />
            </Alert>
        );
    } else {
        return (
            <>
                {drones.map((d) => (
                    <QuadItem key={generateDroneID(d)} quad={d}>
                        <AssignDroneButton id={generateDroneID(d)} />
                    </QuadItem>
                ))}
            </>
        );
    }
};

export default IdleDronesContainer;
