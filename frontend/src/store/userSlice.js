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
      const { username, role, token, full_name, user_id, department_id } =
        action.payload;
      state.username = username;
      state.role = role;
      state.token = token;
      state.full_name = full_name;
      state.user_id = user_id;
      state.department_id = department_id;

      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.username = "";
      state.role = "";
      state.token = "";
      state.full_name = "";
      state.user_id = "";
      state.department_id = "";

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
        state.full_name = userData.full_name;
        state.user_id = userData.user_id;
        state.department_id = userData.department_id;
      }
    },
  },
});

export const { login, logout, loadUserFromStorage } = userSlice.actions;
export default userSlice.reducer;
