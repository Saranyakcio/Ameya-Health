import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [showOverlay, setShowOverlay] = useState(false);
  const [orderId, setOrderId] = useState(null);

  return (
    <AppContext.Provider
      value={{
        location,
        setLocation,
        showOverlay,
        setShowOverlay,
        orderId,
        setOrderId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);