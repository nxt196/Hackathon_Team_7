import { createAsyncThunk } from '@reduxjs/toolkit';
import * as pageTwoApi from 'api/pageTwo';
import { pageTwoActions } from 'store/slices/pageTwo-slice';

export const getAllTimes = createAsyncThunk(
    'pageTwo/getTime',
    async (_, { dispatch }) => {
        try {
            const data = await pageTwoApi.getAlltimes();
            dispatch(pageTwoActions.loadPastTimes({ previousTimes: data }));
        } catch (error) {
            console.error('Error retrieving times:', error);
        }
    }
);

export const removeLastTime = createAsyncThunk(
    'pageTwo/removeLastTime',
    async (_, { dispatch }) => {
        try {
            const response = await pageTwoApi.removeLastTime();
            const data = response.data;
            dispatch(pageTwoActions.removeLastTime({ previousTimes: data.previousTimes }));
        } catch (error) {
            console.error('Error Removing Time:', error);
        }
    }
);