import { ADMINLOGIN, ADMINAUTH } from "../type";
import { url } from "../../config/config";
import { toast } from "react-toastify";

export const login = (data) => (dispatch) => {
  fetch(`${url}/api/quality/login`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-type": "Application/json" },
    body: JSON.stringify(data),
  })
    .then((res) => {
      res.json().then((d) => {
        // console.log(d);
        if (d.success === true) {
          dispatch({
            type: ADMINAUTH,
            payload: true,
          });
        }
        if (d.error === true) {
          toast.error(d.message)
        }

        dispatch({
          type: ADMINLOGIN,
          payload: d,
        });
      });
    })
    .catch((r) => {
      // console.log(r);
      toast.error("Something went wrong ! Try again");
    });
};
export const checkAdmin = () => (dispatch) => {
  fetch(`${url}/api/quality/checkUser`, {
    method: "POST",
    credentials: "include",
  }).then((res) => {
    res
      .json()
      .then((d) => {
        // console.log(d);
        if (d.success === true) {
          dispatch({
            type: ADMINAUTH,
            payload: true,
          });
        } else if (d.error === true) {
          // console.log(d.message);
          d.message === "app/network-error" &&
            toast.error("server offline ! please contact team");
          dispatch({
            type: ADMINAUTH,
            payload: false,
          });
        }
      })
      .catch((r) => {
        console.log(r);
        // console.log('Something went wrong ! Try again')
      });
  });
};
export const logout = () => (dispatch) => {
  fetch(`${url}/api/logout`, {
    method: "POST",
    credentials: "include",
  }).then((res) => {
    res
      .json()
      .then((d) => {
        // console.log(d);
        if (d.success === true) {
          dispatch({
            type: ADMINAUTH,
            payload: false,
          });
          window.location = "/";
        }
      })
      .catch((r) => console.log(r));
  });
};
