import { RootState } from './../store';
import { createAsyncThunk, createEntityAdapter, createSelector, createSlice } from '@reduxjs/toolkit';

import data from './deliveries';

import Delivery, { DeliveryStatus } from '../../types/delivery';
import { selectStationPositions } from '../stations/stationSlice';
import { assignDelivery } from '../quads/quadsSlice';

interface DeliveriesState {
    loading: boolean;
}

const initialState: DeliveriesState = {
    loading: false
};

const fetchDeliveries = createAsyncThunk('deliveries/fetch', async () => {
    return data;
});

type UpdateDeliveryArgs = { quadId: string; quad: Delivery };
const updateDelivery = createAsyncThunk('deliveries/update', async (args: UpdateDeliveryArgs) => {
    return args;
});

const deliveriesAdapter = createEntityAdapter<Delivery>();

const deliveriesSlice = createSlice({
    name: 'deliveriesSlice',
    initialState: deliveriesAdapter.getInitialState(initialState),
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDeliveries.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchDeliveries.rejected, (state) => {
                state.loading = false;
            })
            .addCase(fetchDeliveries.fulfilled, (state, action) => {
                deliveriesAdapter.setAll(state, action.payload);
                state.loading = false;
            })
            .addCase(updateDelivery.fulfilled, (state, action) => {
                deliveriesAdapter.updateOne(state, {
                    id: action.meta.arg.quadId,
                    changes: { ...action.meta.arg.quad }
                });
                state.loading = false;
            })
            .addCase(assignDelivery.fulfilled, (state, action) => {
                deliveriesAdapter.updateOne(state, {
                    id: action.meta.arg.deliveryId,
                    changes: { status: DeliveryStatus.IN_PROGRESS }
                });
            });
    }
});

const _getRoot = (state: RootState) => state.deliveries;

const isFetching = createSelector(_getRoot, (s) => s.loading);

const { selectAll } = deliveriesAdapter.getSelectors<RootState>(_getRoot);

const selectAllPositions = createSelector(selectAll, selectStationPositions, (deliveries, stations) => [
    ...deliveries.map((d) => ({ id: d.id, position: d.destination })),
    ...stations
]);

const selectAllPendingDeliveries = createSelector(selectAll, isFetching, (deliveries, isLoading) =>
    isLoading ? [] : deliveries.filter((d) => d.status === DeliveryStatus.PENDING)
);

export {
    fetchDeliveries,
    updateDelivery,
    selectAll as selectAllDeliveries,
    isFetching as isLoadingDeliveries,
    selectAllPendingDeliveries,
    selectAllPositions
};

export default deliveriesSlice.reducer;
