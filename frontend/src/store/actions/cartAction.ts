import axios from "axios";
import { CART_ADD_ITEM } from "../constants/cartConstants";

export const addToCart = (id: any, qty: any) => async (
  dispatch: any,
  getState: any
) => {
  const { data } = await axios.get(`/api/products/${id}`);
  dispatch({ type: CART_ADD_ITEM, payload: { product: data, qty } });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
