import { ADMINLOGIN, ADMINAUTH } from "../type";

const initialState = {
  adminLogin: {},
  auth: null,
  adminAuth: null,
};

export default function (state = initialState, actions) {
  switch (actions.type) {
    case ADMINAUTH:
      return {
        ...state,
        adminAuth: actions.payload,
      };
    case ADMINLOGIN:
      return {
        ...state,
        adminLogin: actions.payload,
      };

    default:
      return state;
  }
}
