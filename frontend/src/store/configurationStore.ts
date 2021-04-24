import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import {
  productListReducer,
  productDetailsReducer,
} from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";
import { userLoginReducer, userRegisterReducer } from "./reducers/userReducers";
import {
  orderCreateReducers,
  orderDetailsReducers,
  orderListReducers,
} from "./reducers/orderReducers";

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const cartItemsFromStore = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart") as string)
  : [];

const userInfoFromStore = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo") as string)
  : null;

const orderCreateFromStore = localStorage.getItem("orderCreate")
  ? JSON.parse(localStorage.getItem("userInfo") as string)
  : null;

const orderListFromStore = localStorage.getItem("orderList")
  ? JSON.parse(localStorage.getItem("orderList") as string)
  : [];

const initialState = {
  cart: {
    cartItems: cartItemsFromStore,
  },
  orderCreate: orderCreateFromStore,
  userLogin: { userInfo: userInfoFromStore, loading: false },
  orderList: { order: orderListFromStore },
};

// store creation
function store() {
  const store = createStore(
    combineReducers({
      productList: productListReducer,
      productDetails: productDetailsReducer,
      cart: cartReducer,
      userLogin: userLoginReducer,
      userRegister: userRegisterReducer,
      orderCreate: orderCreateReducers,
      orderDetails: orderDetailsReducers,
      orderList: orderListReducers,
    }),
    // @ts-ignore
    initialState,
    composeEnhancers(applyMiddleware(thunk))
  );
  return store;
}

export default store;
