// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from './redux/counterSlice';
// import userReducer from './redux/userSlice';
// import authReducer from './redux/authSlice';

export const store = configureStore({
  reducer: {
    // counter: counterReducer,
    // user: userReducer,
    // auth: authReducer
  }
});