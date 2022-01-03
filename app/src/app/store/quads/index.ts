import { combineReducers } from '@reduxjs/toolkit';

import quadsReducer from './quadsSlice';
import assignedQuadsReducer from './assignedQuadsSlice';

type quadsReducers = typeof quadsReducers;
// eslint-disable-next-line @typescript-eslint/no-redeclare
const quadsReducers = combineReducers({
    assignedQuads: assignedQuadsReducer,
    items: quadsReducer
});

export default quadsReducers;
