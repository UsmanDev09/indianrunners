import { CartContextType } from "@/Interfaces";

const getCart = (): CartContextType => {
  const Cart = {
    Cart: {
      Count: localStorage.getItem("firstName"),
      Price: localStorage.getItem("lastName"),
    },
  };
  return Cart;
};

export default getCart;
