import { configureStore } from '@reduxjs/toolkit';
import billsReducer from './billsSlice';

const store = configureStore({
  reducer: {
    bills: billsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
