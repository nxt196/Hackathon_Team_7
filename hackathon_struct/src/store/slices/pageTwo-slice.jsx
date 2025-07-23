import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const pageTwoSlice =
    createSlice(
        {
            name: 'pageTwo',
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
                removeLastTime(state, action) {
                    const last_time = state.previousTimes[state.previousTimes.length - 1];
                    const { previousTimes } = action.payload
                    state.previousTimes = previousTimes || [];
                    console.log('Removed last_time:', last_time);
                    console.log('State Previous Times:', state.previousTimes);
                    console.log('Server Previous Times:', previousTimes);
                }
            }
        }
    )

const localPersistConfig = {
    key: 'app',
    storage,
    whitelist: ['pageTwo'],
};


export const pageTwoActions = pageTwoSlice.actions;


const persistedpageTwoReducer = persistReducer(localPersistConfig, pageTwoSlice.reducer);

export default persistedpageTwoReducer;
