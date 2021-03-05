import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import {
  productListReducer,
  productDetailsReducer,
} from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";
import { userLoginReducer, userRegisterReducer } from "./reducers/userReducers";

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const cartItemsFromStore = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems") as string)
  : [];

const userInfoFromStore = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo") as string)
  : null;

const initialState = {
  productList: [],
  productDetails: {},
  cart: { cartItems: cartItemsFromStore },
  userLogin: userInfoFromStore,
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
    }),
    // @ts-ignore
    {},
    composeEnhancers(applyMiddleware(thunk))
  );
  return store;
}

export default store;
