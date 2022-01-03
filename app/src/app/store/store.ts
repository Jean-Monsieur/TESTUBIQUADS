import { configureStore, ThunkAction, Action, ThunkDispatch } from '@reduxjs/toolkit';
import quadReducers from './quads';
import stationsReducer from './stations/stationSlice';
import deliveriesReducer from './deliveries/deliveriesSlice';

export const store = configureStore({
    reducer: {
        stations: stationsReducer,
        quads: quadReducers,
        deliveries: deliveriesReducer
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export type AsyncDispatch = ThunkDispatch<RootState, {}, Action<string>>;
