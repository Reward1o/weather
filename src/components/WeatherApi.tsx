import {FC, useEffect, useState} from 'react';
import axios from "axios";
import '../styles/WeatherApi.css'

const API_KEY = import.meta.env.VITE_API_KEY;

interface WeatherApiProps {
   data: {
      country: string;
      local_names: { [key: string]: string };
      lat: number;
      lon: number;
   } | null;
}

interface WeatherDataProps {
   // city: {
   //    country: string
   //    name: string
   // }
   list: {
      main: { temp: number };
      weather: {
         description: string
         icon: string
      }[];
      wind: { speed: number };
      dt_txt: string;
   }[];
}

const WeatherApi: FC<WeatherApiProps> = ({data}) => {
   const [weatherData, setWeatherData] = useState<WeatherDataProps | null>(null)
   useEffect(() => {
      if (data) {
         axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${data.lat}&lon=${data.lon}&units=metric&lang=ru&appid=${API_KEY}`)
            .then(res => {
               console.log(res.data);
               setWeatherData(res.data);
            }).catch(err => console.error(err))
      }
   }, [data, setWeatherData]);
   return (
      <div>{data && (
         <div>
            <h4>{data.local_names.ru} {data.country}</h4>
            {weatherData &&
               <div>
                  <h1>
                     {Math.round(weatherData.list[0].main.temp)}&#176;
                     <img src={`http://openweathermap.org/img/wn/${weatherData.list[0].weather[0].icon}.png`} alt='iconWeather'/>
                  </h1>
                  <h5>{weatherData.list[0].weather[0].description}</h5>
                  <h6>{Math.round(weatherData.list[0].wind.speed * 3.6)} км/ч</h6>
                  <div className='container'>
                     {weatherData.list.filter((_, index) => index % 8 === 0).slice(1, 5).map((item, index) => (
                        <div key={index}>
                           <h6>{item.dt_txt.slice(5, 10)}</h6>
                           <p>{Math.round(item.main.temp)}&#176;
                           <img src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`} alt='iconWeather'/>
                           </p>
                           <h6>{Math.round(item.wind.speed * 3.6)} км/ч</h6>
                        </div>
                     ))}
                  </div>
               </div>
            }
         </div>
         )}
      </div>
   );
};

export default WeatherApi;