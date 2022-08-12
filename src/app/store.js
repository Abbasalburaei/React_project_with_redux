import { configureStore } from '@reduxjs/toolkit';
import sendTransReducer from '../features/transforms/sendTransformSlice';
import receiveTransReducer from '../features/transforms/receiveTransformSlice';
import reportDailyReducer from '../features/report/reportDailySlice';
import reportUserReducer from '../features/report/reportUserSlice';
import homeReducer from '../features/home/homeSlice';
const store = configureStore({
    reducer: {
        home:homeReducer,
        sendTransform :sendTransReducer,
        receiveTransform : receiveTransReducer,
        dailyTransform:reportDailyReducer,
        userTransform:reportUserReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
         serializableCheck:false
    })
});

export default store;