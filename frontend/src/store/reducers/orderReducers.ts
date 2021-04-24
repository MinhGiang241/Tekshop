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

export const orderCreateReducers = (
  state = { loading: false, orderItems: [], shippingAddress: {} },
  action: any
) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return { loading: true };
    case ORDER_CREATE_SUCCESS:
      return { loading: false, success: true, order: action.payload };
    case ORDER_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const orderDetailsReducers = (
  state = { loading: false, orderItems: [], shippingAddress: {} },
  action: any
) => {
  switch (action.type) {
    case ORDER_CREATE_DETAILS_REQUEST:
      return { loading: true };
    case ORDER_CREATE_DETAILS_SUCCESS:
      return { loading: false, success: true, order: action.payload };
    case ORDER_CREATE_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const orderListReducers = (state = { loading: false }, action: any) => {
  switch (action.type) {
    case ORDER_USER_LIST_REQUEST:
      return { loading: true };
    case ORDER_USER_LIST_SUCCESS:
      return { loading: false, success: true, order: action.payload };
    case ORDER_USER_LIST_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_USER_DELETE_REQUEST:
      return { loading: true };
    case ORDER_USER_DELETE_SUCCESS:
      return { loading: false, success: true, order: action.payload };
    case ORDER_USER_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
