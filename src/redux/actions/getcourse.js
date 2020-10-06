import {
  GETMONTHLYQUESTION,
  // GETQBANKQUESTION,
  // GETQBOOKQUESTION,
  GETWEEKLYQUESTION,
  GETQUESTIONVIAID,
  REJECTEDGETQBOOKQUESTION,
  REJECTEDGETQBANKQUESTION,
  REJECTEDGETWEEKLYQUESTION,
  REJECTEDGETMONTHLYQUESTION, CLEARQUESTION
} from "../type";
import axios from "axios";
import { url } from "../../config/config";


export const GetWeeklyQuestion = () => async (dispatch) => {
  const response = await axios.get(
    `${url}/api/course/admin/WeeklyTest/id/0`
  );
  dispatch({
    type: GETWEEKLYQUESTION,
    payload: response.data.data,
  });
};

export const GetMonthlyQuestion = () => async (dispatch) => {
  const response = await axios.get(
    `${url}/api/course/admin/MonthlyTest/id/0`
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


// REJECTED
export const RejectedGetQBookQuestion = (id) => async (dispatch) => {
  const response = await axios.get(
    `${url}/api/course/admin/QBook/${id}/0/reject`
  );
  dispatch({
    type: REJECTEDGETQBOOKQUESTION,
    payload: response.data.data,
  });
};

export const RejectedGetQBankQuestion = (id) => async (dispatch) => {
  const response = await axios.get(
    `${url}/api/course/admin/Qbank/${id}/0/reject`
  );
  dispatch({
    type: REJECTEDGETQBANKQUESTION,
    payload: response.data.data,
  });
};

export const RejectedGetWeeklyQuestion = (id) => async (dispatch) => {
  const response = await axios.get(
    `${url}/api/course/admin/WeeklyTest/${id}/0/reject`
  );
  dispatch({
    type: REJECTEDGETWEEKLYQUESTION,
    payload: response.data.data,
  });
};

export const RejectedGetMonthlyQuestion = (id) => async (dispatch) => {
  const response = await axios.get(
    `${url}/api/course/admin/MonthlyTest/${id}/0/reject`
  );
  dispatch({
    type: REJECTEDGETMONTHLYQUESTION,
    payload: response.data.data,
  });
};
