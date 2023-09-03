export type ItemCard_Props = {
  title?: string;
  price?: string;
  picture?: any;
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
}

export const initialState = {
  account: { firstName: "", lastName: "", userName: "", profile: 0 },
};

export type AccountContextType = {
  account: AccountState;
};
