import {
  NOTIFICATION
} from "../actionTypes/actionTypes";

const initialState = {
  notification: {},
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case NOTIFICATION:
      return {
        ...state,
        notification: action.payload,
      };
    default:
      return state;
  }
};
