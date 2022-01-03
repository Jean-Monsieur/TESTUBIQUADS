import { RootState } from './../store';
import { createAsyncThunk, createEntityAdapter, createSelector, createSlice } from '@reduxjs/toolkit';

import Station from '../../types/station';

import data from './stations';

interface StationState {
    loading: boolean;
}

const initialState: StationState = {
    loading: false
};

const fetchStations = createAsyncThunk('stations/fetch', async () => {
    return data;
});

const stationsAdapter = createEntityAdapter<Station>();

const stationSlice = createSlice({
    name: 'stationSlice',
    initialState: stationsAdapter.getInitialState(initialState),
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchStations.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchStations.rejected, (state) => {
                state.loading = false;
            })
            .addCase(fetchStations.fulfilled, (state, action) => {
                stationsAdapter.setAll(state, action.payload);
                state.loading = false;
            });
    }
});

const _getRoot = (state: RootState) => state.stations;

const isFetching = createSelector(_getRoot, (s) => s.loading);

const { selectAll } = stationsAdapter.getSelectors<RootState>(_getRoot);

const selectValidStationasLabelValuePair = createSelector(selectAll, (stations) =>
    stations
        .filter(({ capacity, assignedQuads }) => capacity > assignedQuads.length)
        .map(({ name, id }) => ({ label: name, value: id }))
);

const selectStationPositions = createSelector(selectAll, (stations) =>
    stations.map(({ id, location }) => ({ id: id, position: location }))
);

export {
    fetchStations,
    selectAll as selectAllStations,
    selectValidStationasLabelValuePair as selectValidStations,
    isFetching as isLoadingStations,
    selectStationPositions
};

export default stationSlice.reducer;
