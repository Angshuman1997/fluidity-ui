import { NOTIFICATION } from "../actionTypes/actionTypes";

const notificationFunc = (data) => {
  return {
    type: NOTIFICATION,
    payload: data,
  };
};

export { notificationFunc };
