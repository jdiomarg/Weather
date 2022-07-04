import React, { useEffect, useState } from 'react'
import axios from 'axios';


function Api() {
    const [data, setData] = useState({})

    useEffect(() => {
        axios.get('https://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=cf1a1a62d9d3ca34e028a364cb0e80ca')
            .then((response) => setData(response.data))
    }, []);

    return (
        <div className="app">
            <div className="search">
                <h1>HOLA</h1>
            </div>
        </div>
    );
}

export default Api




const onLoad = () => {
    navigator.geolocation.getCurrentPosition(fetchData);
}

  // const fetchData = position => {
  //   const (latitude, longitude) = data.coord;
  //   fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=895284fb2d2c50a520ea537456963d9c`)
  //     .then(response => response.json())
  //     .then(data => setData(data))
  // }