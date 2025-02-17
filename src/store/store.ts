import { combineReducers, configureStore } from '@reduxjs/toolkit';
import appReducer from './reducers/appReducer';
import weatherReducer from './reducers/weatherReducer';
import modalDialogReducer from './reducers/modalDialogReducer';

const rootReducer = combineReducers({
    appReducer,
    weatherReducer,
    modalDialogReducer,
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];



