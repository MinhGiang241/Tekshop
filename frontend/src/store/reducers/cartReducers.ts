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

export const cartReducer = (state = { cartItems: [] }, action: any) => {
  switch (action.type) {
    case GET_CART_REQUEST:
      return { loading: true, cartItems: [] };
    case GET_CART_SUCCESS:
      return {
        loading: false,
        cartItems: [...action.payload],
      };
    case GET_CART_FAIL:
      return { loading: false, cartItems: [], error: action.payload };

    case ADD_TO_CART_REQUEST:
      return { loading: true, cartItems: [] };
    case ADD_TO_CART_SUCCESS:
      return {
        loading: false,
        cartItems: [...action.payload],
      };
    case ADD_TO_CART_FAIL:
      return {
        loading: false,
        cartItems: [],
        error: action.payload,
      };
    case DELETE_CART_ITEM_REQUEST:
      return { loading: true, cartItems: [] };
    case DELETE_CART_ITEM_SUCCESS:
      return {
        loading: false,
        cartItems: [...action.payload],
      };
    case DELETE_CART_ITEM_FAIL:
      return {
        loading: false,
        cartItems: [],
        error: action.payload,
      };
    case CLEAR_CART_REQUEST:
      return {
        loading: true,
      };
    case CLEAR_CART_SUCCESS:
      return {
        loading: false,
        cartItems: action.payload,
      };
    case CLEAR_CART_FAIL:
      return {
        loading: false,
        cartItems: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
