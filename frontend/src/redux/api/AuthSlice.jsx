import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    name: "",
    email: "",
    token: "",
    session: null,
};

const AuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            const userData = action.payload;

            if (!userData) {
                state.user = null;
                state.name = "";
                state.email = "";
                state.token = "";
                state.session = null;

                localStorage.removeItem("user");
                localStorage.removeItem("token");
                return;
            }

            const user = userData.user || userData;

            state.user = user;
            state.name = user.name || user.user_metadata?.name || "";
            state.email = user.email || user.user_metadata?.email || "";

            state.token =
                userData.token ||
                userData.access_token ||
                userData.session?.access_token || "";

            state.session = userData.session || null;

            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("token", state.token);
        },

        logoutUser: (state) => {
            state.user = null;
            state.name = "";
            state.email = "";
            state.token = "";
            state.session = null;

            localStorage.removeItem("user");
            localStorage.removeItem("token");
        }
    }
});

export const { setUser, logoutUser } = AuthSlice.actions;

export default AuthSlice.reducer;