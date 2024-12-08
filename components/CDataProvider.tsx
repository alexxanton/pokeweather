import React, { createContext, useState, useContext, type PropsWithChildren } from 'react';

type CDataProviderType = {
  // Weather
  temp: number | null;
  setTemp: React.Dispatch<React.SetStateAction<number | null>>;
  hour: number;
  setHour: React.Dispatch<React.SetStateAction<number>>;
  windSpeed: number;
  setWindSpeed: React.Dispatch<React.SetStateAction<number>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  condition: string;
  setCondition: React.Dispatch<React.SetStateAction<string>>;

  // Misc
  coins: number;
  setCoins: React.Dispatch<React.SetStateAction<number>>;
  wheelTries: number;
  setWheelTries: React.Dispatch<React.SetStateAction<number>>;

  // Buttons
  buttonActive: boolean;
  setButtonActive: React.Dispatch<React.SetStateAction<boolean>>;
  
  // Pokemon
  collection: Record<string, any>;
  setCollection: React.Dispatch<React.SetStateAction<Record<string, any>>>;
}

const DataContext = createContext<CDataProviderType | undefined>(undefined);

export const CDataProvider = ( {children}: PropsWithChildren ) => {
  const [temp, setTemp] = useState<number | null>(null);
  const [hour, setHour] = useState<number>(0);
  const [windSpeed, setWindSpeed] = useState<number>(0);
  const [condition, setCondition] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  
  const [coins, setCoins] = useState<number>(0);
  const [wheelTries, setWheelTries] = useState<number>(10);

  const [buttonActive, setButtonActive] = useState<boolean>(true);

  const [collection, setCollection] = useState<Record<string, any>>([]);

  return (
    <DataContext.Provider value={{
      temp,
      setTemp,
      hour,
      setHour,
      windSpeed,
      setWindSpeed,
      description,
      setDescription,

      coins,
      setCoins,
      condition,
      setCondition,
      wheelTries,
      setWheelTries,

      buttonActive,
      setButtonActive,

      collection,
      setCollection
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
