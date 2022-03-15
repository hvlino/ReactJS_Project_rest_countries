import React, { useContext, useEffect } from 'react';
import Dropdown from 'react-dropdown';
import { Context } from './Context';
import './App.scss';
import 'react-dropdown/style.css';

function App() {
  const {
    loadCountries, setCountries, options, setActiveFilter, filteredCountries,
  } = useContext(Context);

  useEffect(async () => {
    const countries = await loadCountries();
    setCountries(countries);
  }, []);
  return (
    <div className="App">
      <div className="Header">
        <div className="title">Where in the world?</div>
        <div className="theme">
          <img alt="moon-icon" src="https://img.icons8.com/external-flatart-icons-outline-flatarticons/20/000000/external-moon-basic-ui-elements-flatart-icons-outline-flatarticons.png" />
          Dark Mode
        </div>
      </div>
      <div className="search-n-filter">
        <div className="search-input">
          <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iMjAiIGhlaWdodD0iMjAiCnZpZXdCb3g9IjAgMCAxNzIgMTcyIgpzdHlsZT0iIGZpbGw6IzAwMDAwMDsiPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIGZvbnQtZmFtaWx5PSJub25lIiBmb250LXdlaWdodD0ibm9uZSIgZm9udC1zaXplPSJub25lIiB0ZXh0LWFuY2hvcj0ibm9uZSIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0wLDE3MnYtMTcyaDE3MnYxNzJ6IiBmaWxsPSJub25lIj48L3BhdGg+PGcgZmlsbD0iI2IwYjBiMCI+PHBhdGggZD0iTTcyLjI0LDEwLjMyYy0zMi4yNjM0NCwwIC01OC40OCwyNi4yMTY1NiAtNTguNDgsNTguNDhjMCwzMi4yNjM0NCAyNi4yMTY1Niw1OC40OCA1OC40OCw1OC40OGMxMi43NjU2MywwIDI0LjU2Mzc1LC00LjExMTg3IDM0LjE4NSwtMTEuMDcyNWw0NS4yNTc1LDQ1LjE1bDkuNjc1LC05LjY3NWwtNDQuNzIsLTQ0LjgyNzVjOC43ODgxMywtMTAuMjM5MzcgMTQuMDgyNSwtMjMuNTI5MDYgMTQuMDgyNSwtMzguMDU1YzAsLTMyLjI2MzQ0IC0yNi4yMTY1NiwtNTguNDggLTU4LjQ4LC01OC40OHpNNzIuMjQsMTcuMmMyOC41NDEyNSwwIDUxLjYsMjMuMDU4NzUgNTEuNiw1MS42YzAsMjguNTQxMjUgLTIzLjA1ODc1LDUxLjYgLTUxLjYsNTEuNmMtMjguNTQxMjUsMCAtNTEuNiwtMjMuMDU4NzUgLTUxLjYsLTUxLjZjMCwtMjguNTQxMjUgMjMuMDU4NzUsLTUxLjYgNTEuNiwtNTEuNnoiPjwvcGF0aD48L2c+PC9nPjwvc3ZnPg==" className="search-icon" alt="search-icon" />
          <input placeholder="Search for a country" className="search-bar" />
        </div>
        <div className="dropdown-filters">
          <Dropdown
            options={options}
            placeholder="Filter By Region"
            arrowOpen={<img src="https://img.icons8.com/ios-glyphs/10/000000/chevron-up.png" alt="chevron-down" />}
            arrowClosed={<img src="https://img.icons8.com/ios-glyphs/10/000000/chevron-down.png" alt="chevron-down" />}
            onChange={(filter) => {
              if (filter) {
                setActiveFilter(filter.value);
              }
            }}
          />
        </div>
      </div>
      <div className="country-grid">
        <div className="country-card">
          <div className="container">
            {filteredCountries.map((country) => (
              <div className="card" key={country.name.common}>
                <div className="card-header">
                  <img src={country.flags.png} alt={country.name.common} className="country-image" />
                </div>
                <div className="card-body">
                  <div className="country-name">{country.name.common}</div>
                  <div>
                    <div className="info-numbers">Population:</div>
                    <div className="info-numbers">Region:</div>
                    <div className="info-numbers">Capital:</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
