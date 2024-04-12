import { createContext, useCallback, useContext, useEffect, useReducer } from "react";
import reducer from "./reducer";
import { GET_DATA_BEGIN, GET_DATA_ERROR, GET_DATA_SUCCESS, SET_CITY, SET_IS_IN_FARENHEIT } from "./actions";

const IS_IN_FARENHEIT = 'IS_IN_FARENHEIT';
const CITY = 'CITY';
const isInFarenheit = JSON.parse(localStorage.getItem(IS_IN_FARENHEIT) ?? 'true');
const city = localStorage.getItem(CITY) ?? '';
const initialState = {
  isInFarenheit,
  city,
  isLoading: false,
  data: null,
};

const AppContext = createContext(null);

const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setIsInFarenheit = useCallback((isInFarenheit) => {
    dispatch({
      type: SET_IS_IN_FARENHEIT,
      payload: { isInFarenheit },
    });
  }, [dispatch]);

  const setCity = useCallback((city) => {
    dispatch({
      type: SET_CITY,
      payload: { city },
    });
  }, [dispatch]);

  const loadData = useCallback(async () => {
    dispatch({ type: GET_DATA_BEGIN });

    try {
      const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=643332a3ac6541d9b61211129241104&q=${state.city}&days=3&aqi=no&alerts=no`);
      if (!response.ok) {
        throw new Error('Network response was not OK');
      }
      const data = await response.json();
      dispatch({
        type: GET_DATA_SUCCESS,
        payload: { data },
      });
    } catch (err) {
      console.log('There has been a problem with your fetch operation:', err);
      dispatch({ type: GET_DATA_ERROR });
    }
  }, [dispatch, state.city]);

  const saveFavorite = useCallback(async (isSet) => {
    if (isSet) {
      localStorage.setItem(IS_IN_FARENHEIT, state.isInFarenheit);
      localStorage.setItem(CITY, state.data.location.name);
    } else {
      localStorage.removeItem(IS_IN_FARENHEIT);
      localStorage.removeItem(CITY);
    }
  }, [state.data, state.isInFarenheit]);

  useEffect(() => {
    if (city) {
      loadData();
    }
    // eslint-disable-next-line
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,
        setIsInFarenheit,
        setCity,
        loadData,
        saveFavorite,
      }}
    >
      { children }
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export {
  AppContextProvider,
  useAppContext,
};
