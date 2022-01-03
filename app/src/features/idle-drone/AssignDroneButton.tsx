import { FunctionComponent, useCallback } from 'react';
import { Badge, Dropdown, DropdownButton } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { assignQuadToStation, selectAllAssignedQuads } from '../../app/store/quads/assignedQuadsSlice';
import { selectValidStations } from '../../app/store/stations/stationSlice';
import IconWithText from '../../components/icon/IconWithText';
import InlineSpace from '../../components/InlineSpace';

type AssignDroneButtonProps = { id: string };

const AssignDroneButton: FunctionComponent<AssignDroneButtonProps> = ({ id }) => {
    const stations = useSelector(selectValidStations);
    const assignedQuads = useSelector(selectAllAssignedQuads);
    const dispatch = useDispatch();

    const handleSelectedItem = useCallback(
        (stationId: number) => {
            dispatch(
                assignQuadToStation({
                    quadId: id,
                    stationId: stationId
                })
            );
        },
        [dispatch, id]
    );

    return stations.length < 1 ? (
        <span>no stations left</span>
    ) : (
        <DropdownButton
            size="sm"
            title={<IconWithText name="charging-station" displayText="Assign To" />}
            id={`dropdown-variants-primary`}
            variant="primary">
            {stations.map((s) => (
                <Dropdown.Item
                    key={s.value}
                    onClick={(e) => handleSelectedItem(s.value)}
                    eventKey={s.value}
                    disabled={assignedQuads[s.value].length === 10}>
                    <IconWithText name="charging-station" displayText={s.label} /> <InlineSpace />
                    <Badge bg={assignedQuads[s.value].length === 10 ? 'danger' : 'primary'} pill>
                        {assignedQuads[s.value].length} {assignedQuads[s.value].length === 10 ? 'Full' : null}
                    </Badge>
                </Dropdown.Item>
            ))}
        </DropdownButton>
    );
};

export default AssignDroneButton;
