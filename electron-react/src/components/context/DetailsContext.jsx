import React, { useState, createContext } from 'react';
import stringifyObject from 'stringify-object';

export const DetailsContext = createContext();

export const DetailsProvider = ({ children }) => {
  const [compProps, setCompProps] = useState(`{"count": 1}`);
  const [compActions, setCompActions] = useState({
    handleClick: () => console.log('button clicked')
  });
  const [compHTML, setCompHTML] = useState(`<button onClick = {actions.handleClick}>Click Me</button>`);
  return(
    <DetailsContext.Provider 
      value = {{
        compProps: [compProps, setCompProps], 
        compActions: [compActions, setCompActions], 
        compHTML: [compHTML, setCompHTML]
      }}
    >
      {children}
    </DetailsContext.Provider>
  );
};