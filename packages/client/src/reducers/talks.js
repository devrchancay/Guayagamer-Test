import {
  LOADING,
  SUCCESS,
  ERROR,
  RECEIVE_TALKS,
  ACCUMULATE,
  INIT
} from "../actions/talks/actions";

const talks = (state = {}, action) => {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: action.status };
    case SUCCESS:
      return { ...state, messages: { errors: null, success: action.message } };
    case ERROR:
      return { ...state, messages: { success: null, errors: action.messages } };
    case RECEIVE_TALKS:
      return { ...state, data: { ...action.talks } };
    case ACCUMULATE:
      return {
        ...state,
        total: state.total + 1,
        totalHours: state.totalHours + action.duration
      };
    case INIT:
      return {
        ...state,
        total: 0,
        totalHours: 0,
        messages: {
          errors: null,
          success: null
        }
      };
    default:
      return state;
  }
};

export default talks;
