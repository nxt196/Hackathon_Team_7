import {
    combineReducers,
    configureStore,
} from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistStore } from 'redux-persist';
import dashboardHomeReducer from './slices/dashboardhome-slice';


const isLocal = true;

export const rootReducer = combineReducers({
    dashboardhome: dashboardHomeReducer,
});

export const setupStore = (preloadedState) => {
    const store = configureStore({
        reducer: rootReducer,
        preloadedState,
        devTools: isLocal,

        middleware: (getDefaultMiddleware) => {
            return getDefaultMiddleware({
                serializableCheck: {
                    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                    ignoredPaths: ['register', 'rehydrate'], // Add this line
                },
            }).concat(isLocal ? logger : []);
        }
        ,
    });
    const persistor = persistStore(store);
    return { store, persistor };
};