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

  // User Data
  user: string;
  setUser: React.Dispatch<React.SetStateAction<string>>;
  userId: number;
  setUserId: React.Dispatch<React.SetStateAction<number>>;
  boost: number;
  setBoost: React.Dispatch<React.SetStateAction<number>>;
  coins: number;
  setCoins: React.Dispatch<React.SetStateAction<number>>;
  wheelTries: number;
  setWheelTries: React.Dispatch<React.SetStateAction<number>>;

  // Buttons
  buttonActive: boolean;
  setButtonActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const DataContext = createContext<CDataProviderType | undefined>(undefined);

export const CDataProvider = ( {children}: PropsWithChildren ) => {
  const [temp, setTemp] = useState<number | null>(null);
  const [hour, setHour] = useState<number>(0);
  const [windSpeed, setWindSpeed] = useState<number>(0);
  const [weatherCondition, setWeatherCondition] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const [user, setUser] = useState("");
  const [userId, setUserId] = useState(0);
  const [boost, setBoost] = useState(0);
  const [coins, setCoins] = useState<number>(0);
  const [wheelTries, setWheelTries] = useState<number>(10);

  const [buttonActive, setButtonActive] = useState<boolean>(true);

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

      user,
      setUser,
      userId,
      setUserId,
      boost,
      setBoost,
      coins,
      setCoins,
      weatherCondition,
      setWeatherCondition,
      wheelTries,
      setWheelTries,

      buttonActive,
      setButtonActive,
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
