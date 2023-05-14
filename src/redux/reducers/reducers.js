import { NOTIFICATION, USERCREDS } from "../actionTypes/actionTypes";

const initialState = {
  notification: {},
  userCreds: {},
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case NOTIFICATION:
      return {
        ...state,
        notification: action.payload,
      };
    case USERCREDS:
      return {
        ...state,
        userCreds: action.payload,
      };
    default:
      return state;
  }
};
