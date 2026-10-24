import React, { createContext, useContext } from 'react';

const ModeContext = createContext();

export const ModeProvider = ({ children }) => {
  return (
    <ModeContext.Provider
      value={{
        mode: 'developer',
        isGodMode: false,
        toggleMode: () => {},
        isTransitioning: false
      }}
    >
      {children}
    </ModeContext.Provider>
  );
};

export const useMode = () => useContext(ModeContext);
