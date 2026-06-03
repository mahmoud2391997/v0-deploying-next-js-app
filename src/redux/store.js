import { configureStore } from '@reduxjs/toolkit';
import contractsReducer from './slices/contractSlice';

 const store = configureStore({
  reducer: {
    contracts: contractsReducer
  }
});
export default store;