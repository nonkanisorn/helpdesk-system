import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  username: "",
  role: "",
  token: "",
  // users_id: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      const { username, role, token, name, users_id } = action.payload;
      state.username = username;
      state.role = role;
      state.token = token;
      state.name = name;
      state.users_id = users_id;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.username = "";
      state.role = "";
      state.token = "";
      state.name = "";
      state.users_id = "";

      localStorage.removeItem("user");
      // navigate("/login");
      // window.location.reload();
    },
    loadUserFromStorage: (state, action) => {
      const userData = action.payload;
      if (userData) {
        state.username = userData.username;
        state.role = userData.role;
        state.token = userData.token;
      }
    },
  },
});

export const { login, logout, loadUserFromStorage } = userSlice.actions;
export default userSlice.reducer;
