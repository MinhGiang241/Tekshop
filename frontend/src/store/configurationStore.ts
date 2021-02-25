import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import {
  productListReducer,
  productDetailsReducer,
} from "./reducers/productReducers";

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// store creation
function store() {
  const middleware = [thunk];
  const store = createStore(
    combineReducers({
      productList: productListReducer,
      productDetails: productDetailsReducer,
    }),
    {},
    composeEnhancers(applyMiddleware(...middleware))
  );
  return store;
}

export default store;
