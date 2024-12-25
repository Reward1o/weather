import React, {FC, useState} from 'react';
import axios from 'axios'
import '../styles/WeatherCard.css';
import WeatherApi from "./WeatherApi.tsx";

const API_KEY = import.meta.env.VITE_API_KEY;

interface Coordinates {
   name: string;
   country: string;
   local_names: {
      ru: string;
   };
   lat: number;
   lon: number;
}

const WeatherCard: FC = () => {
   const [data, setData] = useState<Coordinates | null>(null);
   const [city, setCity] = useState<string>('');

   const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      setCity(e.target.value);
   }

   const submitCityName = async () => {
      const response = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${API_KEY}&lang="ru"`)
      try {
         setData(response.data[0])
         setCity('');
      } catch (error) {
         console.error('Ошибка запроса: ' + error)
      }
   }
   return (
      <div>
         <input className="input_search" onChange={changeInput} value={city} type="text"/>
         <button className="button_search" onClick={submitCityName}>Поиск</button>
         <WeatherApi data={data}/>
      </div>
   )
};

export default WeatherCard;