import React, { useState } from "react";
import { InputGroup, FormControl } from "react-bootstrap";
import "./home.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWind } from '@fortawesome/free-solid-svg-icons'

export default function Home() {
  const api = {
    key: "746bc7e095aede11b3178d4eb66c3978",
    base: "https://api.openweathermap.org/data/2.5/"
  }
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }
  
  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <>
      <div  className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app-warm' : 'app') : 'app'}>
        <InputGroup size="lg" className="search">
          <FormControl
            aria-label="Large"
            aria-describedby="inputGroup-sizing-sm"
            placeholder="search city weather"
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </InputGroup>
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp">
              {Math.round(weather.main.temp)}°c
            </div>
            <div className="temp">
              {Math.ceil(weather.wind.speed)}
              <FontAwesomeIcon icon={faWind}></FontAwesomeIcon>
            </div>
            <div className="weather">{weather.weather[0].description}</div>
          </div>
        </div>
        ) : (
          <div className="notfound">
            no such a country try another name
          </div>
        )}
      </div>
    </>
  );
}