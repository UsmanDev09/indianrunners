import setAccount from "@/lib/setAccount";
import setCart from "@/lib/setCart";

export const accountReducer = (
  state: any,
  action: {
    type: any;
    payload: {
      firstName?: any;
      lastName?: any;
      userName?: any;
      profile?: any;
      Count?: any;
      Bill?: any;
      token?: any;
    };
  }
) => {
  switch (action.type) {
    case "ACCOUNT_UPDATE":
      setAccount(
        action.payload.firstName,
        action.payload.lastName,
        action.payload.userName,
        action.payload.profile,
        action.payload.token
      );
      console.log("Account update called");
      return {
        account: {
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          userName: action.payload.userName,
          profile: action.payload.profile,
          token: action.payload.token,
        },
      };
    case "CART_UPDATE":
      setCart(action.payload.Count, action.payload.Bill);
      console.log("Cart update called");
      return {
        Cart: {
          Count: action.payload.Count,
          Bill: action.payload.Bill,
        },
      };
    default:
      return state;
  }
};
