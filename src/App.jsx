import React, { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [unit, setUnit] = useState(0);
  const [isCelcius, setCelcius] = useState(true);
  const [temperature, setTemperature] = useState(0);
  const [cityName, setCityName] = useState("");
  const [countryName, setCountryName] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=895284fb2d2c50a520ea537456963d9c`

  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const available = (position) => {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
  }

  const fetchWeather = async () => {
    try {
      await windows.navigator.geolocation.getCurrentPosition(available);
      const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=895284fb2d2c50a520ea537456963d9c`)
      setTemperature(res.data.main.temp);
      setCityName(res.data.name)
      setCountryName(res.data.sys.country);
    } catch (err) { console.log.err };
  }

  useEffect(() => {
    fetchWeather();
  }, [latitude, longitude])

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        setUnit(response.data.main.temp)
      })
      setLocation('')
    }
  }

  const convertUnit = () => {
    if (isCelcius) {
      (setUnit((unit - 32) / 1.80));
      setCelcius(false);
    } else {
      setUnit((unit * 1.80) + 32);
      setCelcius(true);
    }
  }

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='Search for Location'
          type="text" />
        <p className='yourLocation'>Enter Your Location</p>
      </div>

      <div className="container">

        {data.name !== undefined &&
          <div className="top">
            <div className="location">
              <p>Your Current Location is:</p>
              {data.sys ? <p className='climateType'>{data.sys.country}, {data.name}</p> : null}
            </div>
            <div className="location">
              <p>Temperature is:</p>
            </div>
            <div className="temp">
              {data.main ? <h1>{unit.toFixed(0)} º {isCelcius ? "Farenheit" : "Celsius"}</h1> : null}
              <button className='unitButton' onClick={convertUnit}>Convert Unit</button>
            </div>
            <div className="description">
              {data.weather ? <p className='climateType'>{data.weather?.[0].main}</p> : null}
            </div>
            <div>
              <img className='climateImage' src={`http://openweathermap.org/img/wn/${data.weather?.[0].icon}@2x.png`} alt="/" />
            </div>
          </div>
        }

        {data.name !== undefined &&
          <div className="bottom">
            <div className="feels">
              {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°F</p> : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default App;
