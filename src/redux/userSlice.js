import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userData: [],
  userCount: 0,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveUserData: (state, action) => {
      state.userData.push(action.payload);
      state.userCount = state.userData.length; // Update the user count
    },
  },
});

export const { saveUserData } = userSlice.actions;

export default userSlice.reducer;
