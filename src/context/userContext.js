import React, {createContext, useReducer} from 'react';
import {
  setUSER,
  setVISITED,
  setUSERINFO,
  setWATCHLIST,
  updateWATCHLIST,
} from './Types';
const initialState = {
  user: null,
  visited: null,
  userInfo: null,
  watchlist: [],
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
  const setUserInfo = data => {
    dispatch({type: setUSERINFO, payload: data});
  };
  const setWatchlist = data => {
    dispatch({type: setWATCHLIST, payload: data});
  };
  const updateWatchlist = data => {
    dispatch({type: updateWATCHLIST, payload: data});
  };
  return (
    <UserContext.Provider
      value={{
        user: state.user,
        visited: state.visited,
        userInfo: state.userInfo,
        watchlist: state.watchlist,
        setUser,
        setVisited,
        setUserInfo,
        setWatchlist,
        updateWatchlist,
      }}>
      {children}
    </UserContext.Provider>
  );
};
