import { createAsyncThunk } from '@reduxjs/toolkit';
import * as pageOneApi from 'api/pageOne';
import { pageOneActions } from 'store/slices/pageOne-slice';


export const addCurrentTime = createAsyncThunk(
    'pageOne/addTime',
    async (currentTime, { dispatch }) => {
        try {
            const data = await pageOneApi.addCurrentTime(currentTime);
            dispatch(pageOneActions.addCurrentTime({ currentTime }));
        } catch (error) {
            console.error('Error adding time:', error);
        }
    }
);

export const removeLastTime = createAsyncThunk(
    'pageTwo/removeLastTime',
    async (_, { dispatch }) => {
        try {
            const response = await pageOneApi.removeLastTime();
            const data = response.data;
            dispatch(pageOneActions.removeLastTime({ previousTimes: data.previousTimes }));
        } catch (error) {
            console.error('Error Removing Time:', error);
        }
    }
);