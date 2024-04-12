import { GET_DATA_BEGIN, GET_DATA_ERROR, GET_DATA_SUCCESS, SET_CITY, SET_IS_IN_FARENHEIT } from "./actions";

const reducer = (state, action) => {
  if (action.type === SET_IS_IN_FARENHEIT) {
    return {
      ...state,
      isInFarenheit: action.payload.isInFarenheit,
    };
  } else if (action.type === SET_CITY) {
    return {
      ...state,
      city: action.payload.city,
    };
  } else if (action.type === GET_DATA_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  } else if (action.type === GET_DATA_ERROR) {
    return {
      ...state,
      isLoading: false,
    };
  } else if (action.type === GET_DATA_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      data: action.payload.data,
    }
  }

  throw new Error(`no such action: ${action.type}`)
};

export default reducer;
