import React, {createContext, useReducer} from 'react';
import {setUSER, setVISITED} from './Types';
const initialState = {
  user: null,
  visited: null,
};

// Reducers
import {userReducer} from './reducer';

export const UserContext = createContext();
export const UserProvider = ({children}) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const setUser = user => {
    dispatch({type: setUSER, payload: user});
  };
  const setVisited = data => {
    dispatch({type: setVISITED, payload: data});
  };
  return (
    <UserContext.Provider
      value={{
        user: state.user,
        visited: state.visited,
        setUser,
        setVisited,
      }}>
      {children}
    </UserContext.Provider>
  );
};
