import { CartItem } from "../redux/cart/types";
import { Pizza } from "../redux/pizza/types";
import { calcTotalPrice } from "./calcTotalPrice";

export const getCartFromStorage = () => {
  const data = localStorage.getItem("cart");
  const items: CartItem[] = data ? JSON.parse(data) : [];
  const totalPrice = calcTotalPrice(items);

  return { items, totalPrice };
};
