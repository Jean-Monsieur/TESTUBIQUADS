import { createAsyncThunk, createSlice, createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface AssignedQuadState {
    entities: { [key: number]: string[] };
    loading: boolean;
}

const initialState: AssignedQuadState = {
    entities: { 1: [], 2: [], 3: [] },
    loading: false
};

export type AssingQuadArgs = {
    quadId: string;
    stationId: number;
};

const assignQuadToStation = createAsyncThunk('assignedQuad/assign', async (arg: AssingQuadArgs) => {
    return arg;
});

type SetAssignedQuadsArgs = {
    value: { [key: number]: string[] };
    toBeAssignedQuadsIds: string[];
};
const setAssignedQuads = createAsyncThunk('assignedQuad/assignMultiple', async (args: SetAssignedQuadsArgs) => {
    return args;
});

const unassignQuad = createAsyncThunk('assignedQuad/remove', async (args: { quadId: string; stationId: number }) => {
    return args;
});

const assignedQuadSlice = createSlice({
    name: 'assignedQuad',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(assignQuadToStation.pending, (state) => {
                state.loading = true;
            })
            .addCase(assignQuadToStation.fulfilled, (state, action) => {
                state.entities[action.payload.stationId] = [
                    ...state.entities[action.payload.stationId],
                    action.payload.quadId
                ];
                state.loading = false;
            })
            .addCase(assignQuadToStation.rejected, (state) => {
                state.loading = false;
            })

            .addCase(setAssignedQuads.pending, (state) => {
                state.loading = true;
            })

            .addCase(setAssignedQuads.fulfilled, (state, action) => {
                state.entities = action.payload.value;
                state.loading = false;
            })
            .addCase(unassignQuad.fulfilled, (state, action) => {
                state.entities[action.meta.arg.stationId] = state.entities[action.meta.arg.stationId].filter(
                    (value) => value !== action.meta.arg.quadId
                );
                state.loading = false;
            });
    }
});

export { assignQuadToStation, setAssignedQuads, unassignQuad };

const _getRoot = (state: RootState) => state.quads.assignedQuads;

export const selectAllAssignedQuads = createSelector(_getRoot, (state) => state.entities);
export const selectIsFetchingAssignedQuads = createSelector(_getRoot, (state) => state.loading);

export const selectAssignedDronesByStationId = (state: RootState, stationId: number) =>
    _getRoot(state).entities[stationId];

export default assignedQuadSlice.reducer;
