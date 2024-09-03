import { CartItem } from "../redux/slices/pizza/types";

// export const calcTotalPrice = (items: CartItem[]) => {
//   return items.reduce((sum, obj) => {
//     return obj.price * obj.count + sum;
//   }, 0);
// };

export const calcTotalPrice = (
  items: CartItem[],
  currency: keyof CartItem["prices"]
) => {
  return items.reduce((sum, obj) => {
    return obj.prices[currency][obj.sizes[0]] * obj.count + sum;
  }, 0);
};
