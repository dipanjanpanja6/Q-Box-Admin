import { ADMINLOGIN, ADMINAUTH,TEACHERLIST } from "../type";

const initialState = {
  adminLogin: {},
  auth: null,
  adminAuth: null,
  teacherList:[]
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
    case TEACHERLIST:
      return {
        ...state,
        teacherList: actions.payload,
      };

    default:
      return state;
  }
}
