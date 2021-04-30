import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
} from "../constants/userConstants";
import axios from "axios";

export const login = (email: any, password: any) => async (dispatch: any) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/users/login",
      { email, password },
      config
    );
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (err) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        err.response && err.response.data ? err.response.data : err.message,
    });
  }
};

export const updateProfile = (
  avatar: any,
  name: string,
  email: string,
  password: any,
  token: string
) => async (dispatch: any) => {
  try {
    dispatch({ type: USER_UPDATE_PROFILE_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.post(
      "/api/users/profile",
      { avatar, name, email, password },
      config
    );
    localStorage.setItem("userInfo", JSON.stringify(data));
    dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload:
        err.response && err.response.data ? err.response.data : err.message,
    });
  }
};

export const register = (
  name: any,
  email: any,
  password: any,
  confirmPassword: any,
  avatar: any
) => async (dispatch: any) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/users/register",
      { name, email, password, confirmPassword, avatar },
      config
    );
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        err.response && err.response.data ? err.response.data : err.message,
    });
  }
};
