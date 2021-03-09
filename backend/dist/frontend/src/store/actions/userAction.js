"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.updateProfile = exports.login = void 0;
const userConstants_1 = require("../constants/userConstants");
const axios_1 = __importDefault(require("axios"));
const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: userConstants_1.USER_LOGIN_REQUEST });
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const { data } = await axios_1.default.post("/api/users/login", { email, password }, config);
        dispatch({ type: userConstants_1.USER_LOGIN_SUCCESS, payload: data });
        localStorage.setItem("userInfo", JSON.stringify(data));
    }
    catch (err) {
        dispatch({
            type: userConstants_1.USER_LOGIN_FAIL,
            payload: err.response && err.response.data ? err.response.data : err.message,
        });
    }
};
exports.login = login;
const updateProfile = (name, email, password, avatar, token) => async (dispatch) => {
    try {
        dispatch({ type: userConstants_1.USER_UPDATE_PROFILE_REQUEST });
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };
        const data = await axios_1.default.put("/api/users/profile", {
            name,
            email,
            password,
            avatar,
        }, config);
        dispatch({ type: userConstants_1.USER_UPDATE_PROFILE_SUCCESS, payload: data });
    }
    catch (err) {
        dispatch({
            type: userConstants_1.USER_UPDATE_PROFILE_FAIL,
            payload: err.response && err.response.data ? err.response.data : err.message,
        });
    }
};
exports.updateProfile = updateProfile;
const register = (name, email, password, confirmPassword, avatar) => async (dispatch) => {
    try {
        dispatch({ type: userConstants_1.USER_REGISTER_REQUEST });
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const { data } = await axios_1.default.post("/api/users/register", { name, email, password, confirmPassword, avatar }, config);
        dispatch({ type: userConstants_1.USER_REGISTER_SUCCESS, payload: data });
    }
    catch (err) {
        dispatch({
            type: userConstants_1.USER_REGISTER_FAIL,
            payload: err.response && err.response.data ? err.response.data : err.message,
        });
    }
};
exports.register = register;
