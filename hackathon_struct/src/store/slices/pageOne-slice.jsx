import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


const pageOneSlice =
    createSlice(
        {
            name: 'pageOne',
            initialState: {
                previousTimes: [],
            },
            reducers: {
                addCurrentTime(state, action) {
                    state.previousTimes.push(action.payload.currentTime)
                },
                removeLastTime(state, action) {
                    const last_time = state.previousTimes[state.previousTimes.length - 1];
                    const { previousTimes } = action.payload
                    state.previousTimes = previousTimes || [];
                    console.log('Removed last_time:', last_time);
                    console.log('State Previous Times:', state.previousTimes);
                    console.log('Server Previous Times:', previousTimes);
                },
            }
        }
    )

const localPersistConfig = {
    key: 'app',
    storage,
};


export const pageOneActions = pageOneSlice.actions;


const persistedpageOneReducer = persistReducer(localPersistConfig, pageOneSlice.reducer);

export default persistedpageOneReducer;
