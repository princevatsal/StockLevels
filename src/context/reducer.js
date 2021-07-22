import {
  setUSER,
  setVISITED,
  setUSERINFO,
  setWATCHLIST,
  updateWATCHLIST,
} from './Types';
import AsyncStorage from '@react-native-community/async-storage';

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
const setUserInfo = (userInfo, state) => {
  return {
    ...state,
    userInfo,
  };
};
const setWatchlist = (watchlist, state) => {
  return {
    ...state,
    watchlist,
  };
};
const updateWatchlist = (watchlist, state) => {
  AsyncStorage.setItem('watchlist', JSON.stringify(watchlist));
  return {
    ...state,
    watchlist,
  };
};
export const userReducer = (state, action) => {
  switch (action.type) {
    case setUSER:
      return setUser(action.payload, state);
    case setVISITED:
      return setVisited(action.payload, state);
    case setUSERINFO:
      return setUserInfo(action.payload, state);
    case setWATCHLIST:
      return setWatchlist(action.payload, state);
    case updateWATCHLIST:
      return updateWatchlist(action.payload, state);
    default:
      return state;
  }
};
