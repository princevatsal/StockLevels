import {setUSER, setVISITED} from './Types';
const setUser = (user, state) => {
  return {
    ...state,
    user,
  };
};
const setVisited = (visited, state) => {
  return {
    ...state,
    visited,
  };
};
export const userReducer = (state, action) => {
  switch (action.type) {
    case setUSER:
      return setUser(action.payload, state);
    case setVISITED:
      return setVisited(action.payload, state);
    default:
      return state;
  }
};
