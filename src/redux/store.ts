import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "./filter/slice";
import cartSlice from "./cart/slice";
import pizzaSlice from "./pizza/slice";
export const store = configureStore({
  reducer: { filter: filterSlice, cart: cartSlice, pizza: pizzaSlice },
});
export type RootState = ReturnType<typeof store.getState>;
