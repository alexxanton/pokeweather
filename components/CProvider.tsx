import React, { createContext, useState } from 'react';

const WeatherData = createContext("");

export const MyProvider = ({ children }) => {
  const [state, setState] = useState("some value");

  return (
    <WeatherData.Provider value={{ state, setState }}>
      {children}
    </WeatherData.Provider>
  );
};

export default WeatherData;
