import React, { createContext, useState, useContext, type PropsWithChildren } from 'react';
import { generateWildPokemon } from "@/utils/generateWildPokemon";

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
  weatherCondition: string;
  setWeatherCondition: React.Dispatch<React.SetStateAction<string>>;

  // Misc
  coins: number;
  setCoins: React.Dispatch<React.SetStateAction<number>>;
  wheelTries: number;
  setWheelTries: React.Dispatch<React.SetStateAction<number>>;

  // Buttons
  attackTrigger: boolean;
  setAttackTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  buttonActive: boolean;
  setButtonActive: React.Dispatch<React.SetStateAction<boolean>>;
  
  // Pokemon
  collection: Record<string, any>;
  setCollection: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  pokemon: Record<string, any>;
  setPokemon: React.Dispatch<React.SetStateAction<Record<string, any>>>;
}

const DataContext = createContext<CDataProviderType | undefined>(undefined);

export const CDataProvider = ( {children}: PropsWithChildren ) => {
  const [temp, setTemp] = useState<number | null>(null);
  const [hour, setHour] = useState<number>(0);
  const [windSpeed, setWindSpeed] = useState<number>(0);
  const [weatherCondition, setWeatherCondition] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const [coins, setCoins] = useState<number>(0);
  const [wheelTries, setWheelTries] = useState<number>(10);

  const [buttonActive, setButtonActive] = useState<boolean>(true);
  const [attackTrigger, setAttackTrigger] = useState<boolean>(true);

  const [collection, setCollection] = useState<Record<string, any>>([]);
  const [pokemon, setPokemon] = useState<Record<string, any>>(generateWildPokemon("rain"));

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
      weatherCondition,
      setWeatherCondition,
      wheelTries,
      setWheelTries,

      attackTrigger,
      setAttackTrigger,
      buttonActive,
      setButtonActive,

      collection,
      setCollection,
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

