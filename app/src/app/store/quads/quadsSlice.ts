import { generateDroneID } from './utils';
import { RootState } from './../store';
import { createAsyncThunk, createEntityAdapter, createSelector, createSlice } from '@reduxjs/toolkit';

import data from './quads';

import Quad, { DroneStatus } from '../../types/quad';
import { assignQuadToStation, selectAssignedDronesByStationId, setAssignedQuads } from './assignedQuadsSlice';

interface QuadsState {
    loading: boolean;
}

const initialState: QuadsState = {
    loading: false
};

const fetchQuads = createAsyncThunk('quads/fetch', async () => {
    return data;
});

type UpdateQuadArgs = { quadId: string; quad: Quad };
const updateQuad = createAsyncThunk('quads/update', async (args: UpdateQuadArgs) => {
    return args;
});

type AssignDeliveryArgs = { quad: Quad; deliveryId: number; stationId: number };
const assignDelivery = createAsyncThunk('quads/assignDelivery', async (args: AssignDeliveryArgs) => {
    return args;
});

const quadsAdapter = createEntityAdapter<Quad>({
    selectId: (q) => generateDroneID(q)
});

const quads = createSlice({
    name: 'quadsSlice',
    initialState: quadsAdapter.getInitialState(initialState),
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchQuads.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchQuads.rejected, (state) => {
                state.loading = false;
            })
            .addCase(fetchQuads.fulfilled, (state, action) => {
                quadsAdapter.setAll(state, action.payload);
                state.loading = false;
            })

            .addCase(assignQuadToStation.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(updateQuad.fulfilled, (state, action) => {
                quadsAdapter.updateOne(state, {
                    id: action.meta.arg.quadId,
                    changes: { ...action.meta.arg.quad }
                });
                state.loading = false;
            })

            .addCase(assignDelivery.fulfilled, (state, action) => {
                quadsAdapter.updateOne(state, {
                    id: generateDroneID(action.meta.arg.quad),
                    changes: { ...action.meta.arg.quad, status: DroneStatus.ACTIVE }
                });
                state.loading = false;
            })
            .addCase(assignQuadToStation.fulfilled, (state, action) => {
                quadsAdapter.updateOne(state, {
                    id: action.meta.arg.quadId,
                    changes: { status: DroneStatus.CHARGING }
                });
                state.loading = false;
            })
            .addCase(setAssignedQuads.fulfilled, (state, action) => {
                action.meta.arg.toBeAssignedQuadsIds.forEach((id) => {
                    quadsAdapter.updateOne(state, {
                        id: id,
                        changes: { status: DroneStatus.CHARGING }
                    });
                });

                state.loading = false;
            });
    }
});

const _getRoot = (state: RootState) => state.quads.items;

const isFetching = createSelector(_getRoot, (s) => s.loading);

const { selectAll } = quadsAdapter.getSelectors<RootState>(_getRoot);

const selectAllIdleDrones = createSelector(selectAll, (drones) => drones.filter((d) => d.status === DroneStatus.IDLE));

const selectAllIdleDronesAsLabelValuePair = createSelector(selectAllIdleDrones, (drones) =>
    drones.map((d) => ({ label: generateDroneID(d), value: generateDroneID(d) }))
);
const selectAllChargingDrones = createSelector(selectAll, (drones) =>
    drones.filter((d) => d.status === DroneStatus.CHARGING)
);
const selectAllActiveDrones = createSelector(selectAll, (drones) =>
    drones.filter((d) => d.status === DroneStatus.ACTIVE || d.status === DroneStatus.CRASHED)
);

const selectChargingDronesByIds = createSelector(
    selectAllChargingDrones,
    selectAssignedDronesByStationId,
    (drones, assignedDroneIds) => drones.filter((d) => assignedDroneIds.includes(generateDroneID(d)))
);

export {
    fetchQuads,
    updateQuad,
    assignDelivery,
    selectAll as selectAllQuads,
    selectAllIdleDrones,
    selectAllIdleDronesAsLabelValuePair,
    selectAllChargingDrones,
    selectChargingDronesByIds,
    selectAllActiveDrones,
    isFetching as isLoadingQuads
};

export default quads.reducer;
