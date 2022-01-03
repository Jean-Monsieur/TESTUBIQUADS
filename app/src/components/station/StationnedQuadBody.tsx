import React, { FunctionComponent, useEffect } from 'react';
import { ProgressBar, Button, Alert } from 'react-bootstrap';
import { useEffectOnce } from 'react-use';
import { generateDroneID } from '../../app/store/quads/utils';
import Postion from '../../app/types/position';
import Quad from '../../app/types/quad';
import useTimer from '../../hooks/useTimer';
import IconWithText from '../icon/IconWithText';
import { getProgressBarVariant } from '../quad/utils';
type StationnedQuadBodyProps = {
    quad: Quad;
    availableDeliveries: number;
    stationInfo?: { location: Postion; stationId: number };
    hideButtons?: boolean;
    onCharging: (id: string, quad: Quad) => void;
    onAssignDeliveryClicked?: (quad: Quad, stationInfo: { location: Postion; stationId: number }) => void;
};

const StationnedQuadBody: FunctionComponent<StationnedQuadBodyProps> = ({
    quad,
    availableDeliveries,
    stationInfo,
    hideButtons,
    onCharging,
    onAssignDeliveryClicked
}) => {
    const { timer, handleStart } = useTimer(0);

    const canDeliver = quad.charge >= 11;

    useEffectOnce(() => {
        handleStart();
    });

    useEffect(() => {
        onCharging(generateDroneID(quad), quad);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [timer]);

    return (
        <>
            <ProgressBar animated variant={getProgressBarVariant(quad.charge)} now={quad.charge} />
            {!hideButtons && stationInfo !== undefined && onAssignDeliveryClicked !== undefined && (
                <div className="d-grid gap-2" style={{ marginTop: '1rem' }}>
                    {availableDeliveries > 0 ? (
                        <Button
                            variant={`outline-${canDeliver ? 'primary' : 'danger'}`}
                            size="sm"
                            onClick={() => onAssignDeliveryClicked(quad, stationInfo)}
                            disabled={!canDeliver}>
                            {canDeliver ? (
                                <IconWithText name="paper-plane" displayText="Assign Delivery" />
                            ) : (
                                <IconWithText name="exclamation-circle" displayText="Battery too low" />
                            )}
                        </Button>
                    ) : (
                        <Alert style={{ textAlign: 'center' }} variant="success">
                            <IconWithText name="check-circle" displayText="No deliveries Left" />
                        </Alert>
                    )}
                </div>
            )}
        </>
    );
};

export default StationnedQuadBody;
