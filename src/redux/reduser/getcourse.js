import {
  GETMONTHLYQUESTION,
  GETQBANKQUESTION,
  GETQBOOKQUESTION,
  GETWEEKLYQUESTION,
  GETQUESTIONVIAID,
  REJECTEDGETQBOOKQUESTION,
  REJECTEDGETQBANKQUESTION,
  REJECTEDGETWEEKLYQUESTION,
  REJECTEDGETMONTHLYQUESTION,
} from "../type";

const initialState = {
  qbookquestion: [],
  qbankquestion: [],
  weeklyquestion: [],
  monthlyquestion: [],
  rejectedqbookquestion: [],
  rejectedqbankquestion: [],
  rejectedweeklyquestion: [],
  rejectedmonthlyquestion: [],
  currentViewQuestion: {
    is: false,
  },
};

export default function (state = initialState, actions) {
  switch (actions.type) {
    case GETQBOOKQUESTION:
      return {
        ...state,
        qbookquestion: actions.payload,
      };
    case GETQBANKQUESTION:
      return {
        ...state,
        qbankquestion: actions.payload,
      };
    case GETWEEKLYQUESTION:
      return {
        ...state,
        weeklyquestion: actions.payload,
      };
    case GETMONTHLYQUESTION:
      return {
        ...state,
        monthlyquestion: actions.payload,
      };
    case GETQUESTIONVIAID:
      return {
        ...state,
        currentViewQuestion: actions.payload,
      };
    case REJECTEDGETQBOOKQUESTION:
      return {
        ...state,
        rejectedqbookquestion: actions.payload,
      };
    case REJECTEDGETQBANKQUESTION:
      return {
        ...state,
        rejectedqbankquestion: actions.payload,
      };
    case REJECTEDGETWEEKLYQUESTION:
      return {
        ...state,
        rejectedweeklyquestion: actions.payload,
      };
    case REJECTEDGETMONTHLYQUESTION:
      return {
        ...state,
        rejectedmonthlyquestion: actions.payload,
      };
    default:
      return state;
  }
}
