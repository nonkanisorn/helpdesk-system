import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  users_id: "",
  first_name: "",
  last_name: "",
  role_id: "",
  token: "",
  dep_id: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      const { first_name, last_name, role_id, token, users_id, dep_id } =
        action.payload;
      state.users_id = users_id;
      state.first_name = first_name;
      state.last_name = last_name;
      state.role_id = role_id;
      state.token = token;
      state.dep_id = dep_id;
      localStorage.setItem(
        "user",
        JSON.stringify({
          users_id: state.users_id,
          first_name: state.first_name,
          last_name: state.last_name,
          role_id: state.role_id,
          token: state.token,
          dep_id: state.dep_id,
        }),
      );
    },
    logout: (state) => {
      state.users_id = "";
      state.first_name = "";
      state.last_name = "";
      state.role_id = "";
      state.token = "";
      state.dep_id = "";

      localStorage.removeItem("user");
      // navigate("/login");
      // window.location.reload();
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
