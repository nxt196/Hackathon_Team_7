import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const dashboardHomeSlice =
    createSlice(
        {
            name: 'dashboardHome',
            initialState: {
                previousTimes: [],
            },
            reducers: {
                loadPastTimes(state, action) {
                    const { previousTimes } = action.payload;
                    state.previousTimes = previousTimes;
                    console.log('State Previous Times:', state.previousTimes);
                    console.log('Server Previous Times:', previousTimes);
                },
                addCurrentTime(state, action) {
                    state.previousTimes.push(action.payload.currentTime)
                }

            }
        }
    )

export const selectTimes = (state) => state.previousTimes;

console.log('selectTimes Previous Times:', selectTimes);
const localPersistConfig = {
    key: 'app',
    storage,
    whitelist: ['dashboardHome'],
};


export const dashboardHomeActions = dashboardHomeSlice.actions;


const persistedDashboardHomeReducer = persistReducer(localPersistConfig, dashboardHomeSlice.reducer);

export default persistedDashboardHomeReducer;
