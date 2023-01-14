import { createSlice } from "@reduxjs/toolkit";
//Creating reducers and initial state for Users
const usersSlice = createSlice({
  name: "users",
  initialState: {
    user: null,
  },
  reducers: {
    SetUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { SetUser } = usersSlice.actions;
export default usersSlice.reducer;
