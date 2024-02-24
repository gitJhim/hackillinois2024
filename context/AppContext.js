import React, { createContext, useContext, useReducer } from 'react';

const AppContext = createContext();

const initialState = {
  eggs: [],
};

const appReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_EGG':
      return {
        ...state,
        eggs: [...state.eggs, action.payload],
      };
    case 'REMOVE_EGG':
      return {
        ...state,
        eggs: state.tasks.filter(eggs => eggs.id !== action.payload),
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