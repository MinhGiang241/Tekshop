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

export const productListReducer = (state = { products: [] }, action: any) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDetailsReducer = (
  state = { product: { reviews: [] } },
  action: any
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case POST_PRODUCT_REVIEWS_REQUEST:
      return { ...state, loading: false };
    case POST_PRODUCT_REVIEWS_SUCCESS:
      return { loading: false, product: action.payload };
    case POST_PRODUCT_REVIEWS_FAIL:
      return { loading: false, error: action.payload };
    case CLEAR_PRODUCT:
      return { product: { reviews: [] } };
    default:
      return state;
  }
};

export const postReviewReducers = (
  state = { product: { reviews: [] } },
  action: any
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case CLEAR_PRODUCT:
      return { product: { reviews: [] } };
    default:
      return state;
  }
};
