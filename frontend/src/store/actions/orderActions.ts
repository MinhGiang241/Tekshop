import axios from "axios";
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_DETAILS_REQUEST,
  ORDER_CREATE_DETAILS_SUCCESS,
  ORDER_CREATE_DETAILS_FAIL,
  ORDER_USER_LIST_REQUEST,
  ORDER_USER_LIST_SUCCESS,
  ORDER_USER_LIST_FAIL,
  ORDER_USER_DELETE_REQUEST,
  ORDER_USER_DELETE_SUCCESS,
  ORDER_USER_DELETE_FAIL,
} from "../constants/orderConstant";

export const createOrder = (order: any, token: any) => async (
  dispatch: any
) => {
  try {
    dispatch({ type: ORDER_CREATE_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.post(`/api/orders`, order, config);
    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    });
    localStorage.setItem("orderCreate", JSON.stringify(data));
  } catch (err) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        err.response && err.response.error ? err.response.error : err.message,
    });
  }
};

export const getOrderDetail = (orderId: any, token: any) => async (
  dispatch: any
) => {
  try {
    dispatch({ type: ORDER_CREATE_DETAILS_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(`/api/orders/${orderId}`, config);
    dispatch({
      type: ORDER_CREATE_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: ORDER_CREATE_DETAILS_FAIL,
      payload:
        err.response && err.response.error ? err.response.error : err.message,
    });
  }
};

export const getOrderList = (token: any) => async (dispatch: any) => {
  try {
    dispatch({ type: ORDER_USER_LIST_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(`/api/orders/user-orders`, config);
    dispatch({
      type: ORDER_USER_LIST_SUCCESS,
      payload: data,
    });
    localStorage.setItem("orderList", JSON.stringify(data));
  } catch (err) {
    dispatch({
      type: ORDER_USER_LIST_FAIL,
      payload:
        err.response && err.response.error ? err.response.error : err.message,
    });
  }
};
export const deleteUserOrderItem = (orderId: any, token: any) => async (
  dispatch: any
) => {
  try {
    dispatch({ type: ORDER_USER_DELETE_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.delete(
      `/api/orders/details/${orderId}`,
      config
    );
    dispatch({
      type: ORDER_USER_DELETE_SUCCESS,
      payload: data,
    });
    localStorage.setItem("orderList", JSON.stringify(data));
  } catch (err) {
    dispatch({
      type: ORDER_USER_DELETE_FAIL,
      payload:
        err.response && err.response.error ? err.response.error : err.message,
    });
  }
};
