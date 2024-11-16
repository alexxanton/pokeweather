import React, { createContext, useState, useContext, type PropsWithChildren } from 'react';

type CProviderType = {
  temp: number | null;
  setTemp: React.Dispatch<React.SetStateAction<number | null>>;
  windSpeed: number;
  setWindSpeed: React.Dispatch<React.SetStateAction<number>>;
  coins: number;
  setCoins: React.Dispatch<React.SetStateAction<number>>;
  wheelTries: number;
  setWheelTries: React.Dispatch<React.SetStateAction<number>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
}

const DataContext = createContext<CProviderType | undefined>(undefined);

export const CProvider = ( {children}: PropsWithChildren ) => {
  const [temp, setTemp] = useState<number | null>(null);
  const [windSpeed, setWindSpeed] = useState<number>(0);
  const [coins, setCoins] = useState<number>(0);
  const [wheelTries, setWheelTries] = useState<number>(10);
  const [description, setDescription] = useState<string>("");

  return (
    <DataContext.Provider value={{
      temp,
      setTemp,
      windSpeed,
      setWindSpeed,
      description,
      setDescription,
      coins,
      setCoins,
      wheelTries,
      setWheelTries,
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within a DataProvider');
  return context;
};
