import React, { createContext, useContext, useReducer } from 'react';

const AppContext = createContext();

const initialState = {
  currID: 0,
  currHatching: -1,
  eggs: [],
  pets: []
};

const appReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_EGG':
      return {
        ...state,
        eggs: [...state.eggs, action.payload],
        currID: state.currID + 1
      };
    case 'REMOVE_EGG':
      return {
        ...state,
        eggs: state.eggs.filter(egg => egg.id !== action.payload.id),
      };
    case 'ADD_PET':
      return {
        ...state,
        eggs: [...state.eggs, action.payload],
        currHatching: action.payload.id
      };
    default:
      return state;
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);