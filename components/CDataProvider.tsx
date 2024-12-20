import React, { createContext, useState, useContext, type PropsWithChildren } from 'react';

type CDataProviderType = {
  temp: number | null;
  setTemp: React.Dispatch<React.SetStateAction<number | null>>;
  hour: number;
  setHour: React.Dispatch<React.SetStateAction<number>>;
  windSpeed: number;
  setWindSpeed: React.Dispatch<React.SetStateAction<number>>;
  coins: number;
  setCoins: React.Dispatch<React.SetStateAction<number>>;
  wheelTries: number;
  setWheelTries: React.Dispatch<React.SetStateAction<number>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  condition: string;
  setCondition: React.Dispatch<React.SetStateAction<string>>;
  buttonActive: boolean;
  setButtonActive: React.Dispatch<React.SetStateAction<boolean>>;
  pokemon: Record<string, any>;
  setPokemon: React.Dispatch<React.SetStateAction<Record<string, any>>>;
}

const DataContext = createContext<CDataProviderType | undefined>(undefined);

export const CDataProvider = ( {children}: PropsWithChildren ) => {
  const [temp, setTemp] = useState<number | null>(null);
  const [coins, setCoins] = useState<number>(0);
  const [hour, setHour] = useState<number>(0);
  const [windSpeed, setWindSpeed] = useState<number>(0);
  const [condition, setCondition] = useState<string>("");
  const [wheelTries, setWheelTries] = useState<number>(10);
  const [description, setDescription] = useState<string>("");
  const [buttonActive, setButtonActive] = useState<boolean>(true);
  const [pokemon, setPokemon] = useState<Record<string, any>>([]);

  return (
    <DataContext.Provider value={{
      temp,
      setTemp,
      windSpeed,
      setWindSpeed,
      description,
      setDescription,
      hour,
      setHour,
      coins,
      setCoins,
      condition,
      setCondition,
      wheelTries,
      setWheelTries,
      buttonActive,
      setButtonActive,
      pokemon,
      setPokemon
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
