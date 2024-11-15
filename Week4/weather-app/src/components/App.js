// App.js
import React, { useState } from 'react';
import '../styles/App.css';
import dotenv from 'dotenv';

import MainContainer from './MainContainer';
import SideContainer from './SideContainer';
dotenv.config();
const apiKey = process.env.WEATHER_APP_KEY;
console.log('line 9' + apiKey);

function App() {
  // STEP 1: Use state to manage city data.
  const [selectedCity, setSelectedCity] = useState(null);

  // STEP 2: Create a function to update the city data in the state.
  const updateSelectedCity = (cityData) => {
    console.log('line 17' + apiKey);
    console.log('updated')
    setSelectedCity(cityData);
  };

  return (
    <div className="app-container">
      {/* STEP 3: Connect Components through Props. */}

      {/* Pass selectedCity to MainContainer to display the weather data */}
      <MainContainer selectedCity={selectedCity} apiKey={apiKey}  />

      {/* Pass updateSelectedCity function to SideContainer to update the selected city */}

      <SideContainer updateSelectedCity={updateSelectedCity} apiKey={apiKey} />
    </div>
  );
}

export default App;