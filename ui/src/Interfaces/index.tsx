export type ItemCard_Props = {
  name?: string;
  price?: string;
  picture?: any;
  type?: string;
  _id?: string;
};

export type Challenge_Props = {
  challenge: {
    activity: string;
    name?: string;
    price?: string;
    picture?: any;
    type?: string;
    _id?: string;
  };
};

// An interface for our actions
interface AccountAction {
  type: "ACCOUNT_UPDATE";
  payload: number;
}

// An interface for our state
interface AccountState {
  firstName: string | null;
  lastName: string | null;
  userName: string | null;
  profile: number | string | null;
  token: string | null;
  email: string | null;
  role: string | null;
}

// An interface for our state
interface CartState {
  Count: string | null;
  Price: string | null;
}

export const initialState = {
  account: { firstName: "", lastName: "", userName: "", profile: 0, token: "" },
};

export const initialCartState = {
  Cart: { Count: 0, Bill: 0 },
};

export type AccountContextType = {
  account: AccountState;
};

export type CartContextType = {
  Cart: CartState;
};
