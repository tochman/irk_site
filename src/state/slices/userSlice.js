import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    resetCurrentUser: () => {
      return { ...initialState };
    }
  },
});

export const { setCurrentUser, resetCurrentUser } = userSlice.actions;
export default userSlice.reducer;
