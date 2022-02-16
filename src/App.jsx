import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="Header">
        <div className="title">Where in the world?</div>
        <div className="theme">
          <img alt="moon-icon" src="https://img.icons8.com/external-dreamstale-lineal-dreamstale/15/000000/external-moon-weather-dreamstale-lineal-dreamstale-6.png" />
          Dark Mode
        </div>
      </div>
      <div className="search-n-filter">
        <div className="search-input">
          <img src="https://img.icons8.com/material-outlined/15/000000/search--v1.png" className="search-icon" alt="search-icon" />
          <input placeholder="Search for a country" className="search-bar" />
        </div>
        <div className="dropdown-filters">
          <div className="filter-box">Filter by Region</div>
          <div><img src="https://img.icons8.com/ios-glyphs/10/000000/chevron-down.png" alt="chevron-down" /></div>
        </div>
      </div>
      <div className="country-grid">
        <div className="country-card">
          <div className="container">
            <div className="card">
              <div className="card-header">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/2560px-Flag_of_Germany.svg.png" alt="rover" />
              </div>
              <div className="card-body">
                <div className="country-name">Germany</div>
                <p>
                  <div className="info-numbers">Population:</div>
                  <div className="info-numbers">Region:</div>
                  <div className="info-numbers">Capital:</div>
                </p>
              </div>
            </div>
            <div className="card">
              <div className="card-header">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/2560px-Flag_of_Germany.svg.png" alt="rover" />
              </div>
              <div className="card-body">
                <div className="country-name">Germany</div>
                <p>
                  <div className="info-numbers">Population:</div>
                  <div className="info-numbers">Region:</div>
                  <div className="info-numbers">Capital:</div>
                </p>
              </div>
            </div>
            <div className="card">
              <div className="card-header">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/2560px-Flag_of_Germany.svg.png" alt="rover" />
              </div>
              <div className="card-body">
                <div className="country-name">Germany</div>
                <p>
                  <div className="info-numbers">Population:</div>
                  <div className="info-numbers">Region:</div>
                  <div className="info-numbers">Capital:</div>
                </p>
              </div>
            </div>
            <div className="card">
              <div className="card-header">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/2560px-Flag_of_Germany.svg.png" alt="rover" />
              </div>
              <div className="card-body">
                <div className="country-name">Germany</div>
                <p>
                  <div className="info-numbers">Population:</div>
                  <div className="info-numbers">Region:</div>
                  <div className="info-numbers">Capital:</div>
                </p>
              </div>
            </div>
            <div className="card">
              <div className="card-header">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/2560px-Flag_of_Germany.svg.png" alt="rover" />
              </div>
              <div className="card-body">
                <div className="country-name">Germany</div>
                <p>
                  <div className="info-numbers">Population:</div>
                  <div className="info-numbers">Region:</div>
                  <div className="info-numbers">Capital:</div>
                </p>
              </div>
            </div>
            <div className="card">
              <div className="card-header">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/2560px-Flag_of_Germany.svg.png" alt="rover" />
              </div>
              <div className="card-body">
                <div className="country-name">Germany</div>
                <p>
                  <div className="info-numbers">Population:</div>
                  <div className="info-numbers">Region:</div>
                  <div className="info-numbers">Capital:</div>
                </p>
              </div>
            </div>
            <div className="card">
              <div className="card-header">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/2560px-Flag_of_Germany.svg.png" alt="rover" />
              </div>
              <div className="card-body">
                <div className="country-name">Germany</div>
                <p>
                  <div className="info-numbers">Population:</div>
                  <div className="info-numbers">Region:</div>
                  <div className="info-numbers">Capital:</div>
                </p>
              </div>
            </div>
            <div className="card">
              <div className="card-header">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/2560px-Flag_of_Germany.svg.png" alt="rover" />
              </div>
              <div className="card-body">
                <div className="country-name">Germany</div>
                <p>
                  <div className="info-numbers">Population:</div>
                  <div className="info-numbers">Region:</div>
                  <div className="info-numbers">Capital:</div>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
