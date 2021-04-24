import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  CLEAR_PRODUCT,
  POST_PRODUCT_REVIEWS_REQUEST,
  POST_PRODUCT_REVIEWS_SUCCESS,
  POST_PRODUCT_REVIEWS_FAIL,
} from "../constants/productConstant";
import axios from "axios";

export const listProducts = (page: number) => async (dispatch: any) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const { data } = await axios.get(`/api/products/?page=${page}`);
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const listProductsDetails = (id: any) => async (dispatch: any) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/products/${id}`);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const postReview = (id: any, review: any) => async (dispatch: any) => {
  try {
    dispatch({ type: POST_PRODUCT_REVIEWS_REQUEST });
    const { data } = await axios.post(`/api/products/review/${id}`, review);
    dispatch({ type: POST_PRODUCT_REVIEWS_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: POST_PRODUCT_REVIEWS_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const clearData = () => {
  return {
    type: CLEAR_PRODUCT,
  };
};
