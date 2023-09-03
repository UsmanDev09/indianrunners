export const accountReducer = (
  state: any,
  action: {
    type: any;
    payload: { firstName: any; lastName: any; userName: any; profile: any };
  }
) => {
  switch (action.type) {
    case "ACCOUNT_UPDATE":
      return {
        account: {
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          userName: action.payload.userName,
          profile: action.payload.profile,
        },
      };
    default:
      return state;
  }
};
