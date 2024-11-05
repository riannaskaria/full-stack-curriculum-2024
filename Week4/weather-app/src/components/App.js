// App.js
import React, { useState } from 'react';
import '../styles/App.css';

import MainContainer from './MainContainer';
import SideContainer from './SideContainer';

const apiKey = '36ba1af3437c1d17d325a2d93e2f5979';

function App() {
  // STEP 1: Use state to manage city data.
  const [selectedCity, setSelectedCity] = useState(null);

  // STEP 2: Create a function to update the city data in the state.
  const updateSelectedCity = (cityData) => {
    setSelectedCity(cityData);
  };

  return (
    <div className="app-container">
      {/* STEP 3: Connect Components through Props. */}

      {/* Pass selectedCity to MainContainer to display the weather data */}
      <MainContainer apiKey={apiKey} selectedCity={selectedCity} />

      {/* Pass updateSelectedCity function to SideContainer to update the selected city */}
      <SideContainer apiKey={apiKey} setSelectedCity={updateSelectedCity} />
    </div>
  );
}

export default App;