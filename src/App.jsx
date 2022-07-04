import React, { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [isCelcius, setCelcius] = useState(true);
  const [temperature, setTemperature] = useState(0);
  const [countryName, setCountryName] = useState('');
  const [feel, setFeel] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [wind, setWind] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const savePosition = (position) => {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
  };

  const fetchWeather = async () => {
    try {
      await window.navigator.geolocation.getCurrentPosition(savePosition);
      const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=895284fb2d2c50a520ea537456963d9c`)
      setTemperature(res.data.main.temp);
      setData(res.data)
      setCountryName(res.data.sys.country);
      setFeel(res.data.main.feels_like);
      setHumidity(res.data.main.humidity);
      setWind(res.data.wind.speed);
      setLocation(res.data.name);
      console.log(res.data);
    } catch (err) {
      console.error(err)
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [latitude, longitude])

  const convertUnit = () => {
    if (isCelcius) {
      (setTemperature((temperature - 32) / 1.80));
      setCelcius(false);
    } else {
      setTemperature((temperature * 1.80) + 32);
      setCelcius(true);
    }
  }

  return (
    <div className="app">
      <div className="container">
        <div className="top">
          <div className="location">
            <p>Your Current Location is:</p>
            <p className='climateType'>{countryName}, {location}</p>
          </div>
          <div className="location">
            <p>Temperature is:</p>
          </div>
          <div className="temp">
            <h1>{temperature.toFixed(0)}º {isCelcius ? "Farenheit" : "Celsius"}</h1>
            <button className='unitButton' onClick={convertUnit}>Convert Unit</button>
          </div>
          <div className="description">
            <p className='climateType'>{data.weather?.[0].main}</p>
          </div>
          <div className='imageBox'>
            <img className='climateImage' src={`http://openweathermap.org/img/wn/${data.weather?.[0].icon}@2x.png`} alt="/" />
          </div>
        </div>

        <div className="bottom">
          <div className="feels">
            <p className='bold'>{feel.toFixed()}°F</p>
            <p>Feels Like</p>
          </div>
          <div className="humidity">
            <p className='bold'>{humidity}%</p>
            <p>Humidity</p>
          </div>
          <div className="wind">
            <p className='bold'>{wind.toFixed()} MPH</p>
            <p>Wind Speed</p>
          </div>
        </div>
      </div>
    </div>

  );
}

export default App;
