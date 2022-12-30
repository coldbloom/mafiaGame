import { configureStore } from '@reduxjs/toolkit';
import chainsReducer from '../features/Chains/ChainsSlice';

export const store = configureStore({
    reducer: {
        chains: chainsReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
});
