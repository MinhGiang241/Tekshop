import axios from "axios";
import {
  GET_CART_REQUEST,
  GET_CART_SUCCESS,
  GET_CART_FAIL,
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAIL,
  DELETE_CART_ITEM_REQUEST,
  DELETE_CART_ITEM_SUCCESS,
  DELETE_CART_ITEM_FAIL,
  CLEAR_CART_REQUEST,
  CLEAR_CART_SUCCESS,
  CLEAR_CART_FAIL,
} from "../constants/cartConstants";

export const getCart = (token: any) => async (dispatch: any) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    dispatch({ type: GET_CART_REQUEST });
    const { data } = await axios.get(`/api/users/cart`, config);
    localStorage.setItem("cart", JSON.stringify(data.cart));
    dispatch({ type: GET_CART_SUCCESS, payload: data.cart });
  } catch (err) {
    dispatch({
      type: GET_CART_FAIL,
      payload:
        err.response && err.response.error ? err.response.error : err.message,
    });
  }
};

export const addToCart = (productId: any, qty: number, token: any) => async (
  dispatch: any
) => {
  try {
    dispatch({ type: ADD_TO_CART_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.post(
      "/api/users/cart",
      { productId, qty },
      config
    );
    dispatch({ type: ADD_TO_CART_SUCCESS, payload: data.cart });
    localStorage.setItem("cart", JSON.stringify(data.cart));
  } catch (err) {
    dispatch({
      type: ADD_TO_CART_FAIL,
      payload:
        err.response && err.response.error ? err.response.error : err.message,
    });
  }
};

export const deleteCartItem = (productId: any, token: any) => async (
  dispatch: any
) => {
  try {
    dispatch({ type: DELETE_CART_ITEM_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.put(`/api/users/cart`, { productId }, config);
    dispatch({ type: DELETE_CART_ITEM_SUCCESS, payload: data.cart });
    localStorage.setItem("cart", JSON.stringify(data.cart));
  } catch (err) {
    dispatch({
      type: DELETE_CART_ITEM_FAIL,
      payload:
        err.response && err.response.error ? err.response.error : err.message,
    });
  }
};

export const clearCartItem = (token: any) => async (dispatch: any) => {
  try {
    dispatch({ type: CLEAR_CART_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.delete(`/api/users/cart`, config);
    dispatch({ type: CLEAR_CART_SUCCESS, payload: data.cart });
    localStorage.setItem("cart", JSON.stringify(data.cart));
  } catch (err) {
    dispatch({
      type: CLEAR_CART_FAIL,
      payload:
        err.response && err.response.error ? err.response.error : err.message,
    });
  }
};
