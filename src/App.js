import React from 'react';
import './App.css';
import 'weather-icons/css/weather-icons.css'
import Weather from './components/Weather';

function App() {
  return (
    <div className="App">
    <div className="container-fluid">
    <div className="container">
      <div className="lead display-4 text-light py-4">
        Weather App
        </div>
        <div className="text-white">
          <Weather />
        </div>
    </div>
    </div>
    </div>
  );
}

export default App;
