import { CART_ADD_ITEM } from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action: any) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload.product;
      const existItem = state.cartItems.find((x: any) => x._id === item._id);
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x: any) =>
            // @ts-ignore
            x.product === existItem.product ? item : x
          ),
        };
      }
      return { ...state, cartItems: [...state.cartItems, item] };
    default:
      return state;
  }
};
