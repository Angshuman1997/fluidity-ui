import { NOTIFICATION, USERCREDS } from "../actionTypes/actionTypes";

const notificationFunc = (data) => {
  return {
    type: NOTIFICATION,
    payload: data,
  };
};

const userCredsFunc = (data) => {
  return {
    type: USERCREDS,
    payload: data,
  };
};

export { notificationFunc, userCredsFunc };
