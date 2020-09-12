import {
  GETMONTHLYQUESTION,
  GETQBANKQUESTION,
  GETQBOOKQUESTION,
  GETWEEKLYQUESTION,
  GETQUESTIONVIAID,
  REJECTEDGETQBOOKQUESTION,
  REJECTEDGETQBANKQUESTION,
  REJECTEDGETWEEKLYQUESTION,
  REJECTEDGETMONTHLYQUESTION, CLEARQUESTION
} from "../type";
import axios from "axios";
import { url } from "../../config/config";
import { toast } from "react-toastify";

export const GetQBookQuestion = () => async (dispatch) => {
  const response = await axios.get(`${url}/api/course/admin/getqbookquestion`);

  dispatch({
    type: GETQBOOKQUESTION,
    payload: response.data.data,
  });
};

// export const GetQBankQuestion = (id, page) => async (dispatch) => {
//   const response = await axios.get(`${url}/api/course/admin/getqbankquestion/${id}/${page}`);
//   dispatch({
//     type: GETQBANKQUESTION,
//     payload: response.data,
//   });
// };

export const GetWeeklyQuestion = () => async (dispatch) => {
  const response = await axios.get(
    `${url}/api/course/admin/getweeklytestquestion`
  );
  dispatch({
    type: GETWEEKLYQUESTION,
    payload: response.data.data,
  });
};

export const GetMonthlyQuestion = () => async (dispatch) => {
  const response = await axios.get(
    `${url}/api/course/admin/getmonthlytestquestion`
  );
  dispatch({
    type: GETMONTHLYQUESTION,
    payload: response.data.data,
  });
};

export const GetQuestionViaId = (param) => async (dispatch) => {
  const response = await axios.get(
    `${url}/api/course/admin/getquestion/${param.collect}/${param.qid}`
  );
  dispatch({
    type: GETQUESTIONVIAID,
    payload: response.data.data[0],
  });
};

export const EmptyCurrentQuestion = () => async (dispatch) => {
  dispatch({
    type: GETQUESTIONVIAID,
    payload: {
      is: false,
    },
  });
};
export const EmptyQuestion = () => async (dispatch) => {
  dispatch({ type: CLEARQUESTION, });
};

export const ApproveQuestion = (param) => async (dispatch) => {
  const response = await axios.get(
    `${url}/api/course/admin/approvequestion/QBook/${param.collect}/${param.qid}`
  );
};

// REJECTED
export const RejectedGetQBookQuestion = () => async (dispatch) => {
  const response = await axios.get(
    `${url}/api/course/admin/getqbookrejectedquestion`
  );
  dispatch({
    type: REJECTEDGETQBOOKQUESTION,
    payload: response.data.data,
  });
};

export const RejectedGetQBankQuestion = (id) => async (dispatch) => {
  const response = await axios.get(
    `${url}/api/course/admin/getqbankkrejectedquestion/${id}/0`
  );
  dispatch({
    type: REJECTEDGETQBANKQUESTION,
    payload: response.data.data,
  });
};

export const RejectedGetWeeklyQuestion = () => async (dispatch) => {
  const response = await axios.get(
    `${url}/api/course/admin/getweeklyrejectedquestion`
  );
  dispatch({
    type: REJECTEDGETWEEKLYQUESTION,
    payload: response.data.data,
  });
};

export const RejectedGetMonthlyQuestion = () => async (dispatch) => {
  const response = await axios.get(
    `${url}/api/course/admin/getmonthlyrejectedquestion`
  );
  dispatch({
    type: REJECTEDGETMONTHLYQUESTION,
    payload: response.data.data,
  });
};
