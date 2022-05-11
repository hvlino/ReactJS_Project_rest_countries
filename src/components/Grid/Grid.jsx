import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import Dropdown from 'react-dropdown';
import { Context } from '../../Context';
import Card from '../Card/Card';
import './Grid.scss';
import Spinner from '../Spinner/spinner';

const GridDiv = styled.div`
  background: ${(props) => props.theme[props.currenttheme].secondaryBackground};
  color: ${(props) => props.theme[props.currenttheme].primaryText};
  input {
    background: ${(props) => props.theme[props.currenttheme].primaryBackground};
    color: ${(props) => props.theme[props.currenttheme].primaryText};
  }
  input::placeholder {
    color: ${(props) => props.theme[props.currenttheme].primaryText};
    }
  .search-bar {
    box-shadow: ${(props) => props.theme[props.currenttheme].shadow};
  }
  .Dropdown-control, .Dropdown-menu, .Dropdown-option {
    background: ${(props) => props.theme[props.currenttheme].primaryBackground};
    color: ${(props) => props.theme[props.currenttheme].primaryText};
  }
  .Dropdown-control img {
    filter: invert();
  }
  .Dropdown-control {
    box-shadow: ${(props) => props.theme[props.currenttheme].shadow};
  }
  .Dropdown-option:hover {
        background-color: ${(props) => props.theme[props.currenttheme].hover};
      }
`;

export function Grid() {
  const {
    loadCountries,
    setCountries,
    options,
    setActiveFilter,
    filteredCountries,
    filterCountryList,
    theme,
  } = useContext(Context);

  const [targetCountries, setTargetCountries] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const controller = new AbortController();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const countryArray = await loadCountries(controller.signal);
        setCountries(countryArray);
      } catch (e) {
        controller.abort();
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    setActiveFilter('All');
  }, [targetCountries]);

  // useEffect(() => {
  //   setTargetCountries('');
  // }, [activeFilter]);

  const searchCountries = (ev) => {
    ev.preventDefault();
    const { value } = ev.target;
    setTargetCountries(value);
    filterCountryList(value);
  };

  return (
    isLoading ? <Spinner />
      : (
        <GridDiv className="grid" currenttheme={theme}>
          <div className="search-n-filter">
            <div className="search-input">
              <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iMjAiIGhlaWdodD0iMjAiCnZpZXdCb3g9IjAgMCAxNzIgMTcyIgpzdHlsZT0iIGZpbGw6IzAwMDAwMDsiPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIGZvbnQtZmFtaWx5PSJub25lIiBmb250LXdlaWdodD0ibm9uZSIgZm9udC1zaXplPSJub25lIiB0ZXh0LWFuY2hvcj0ibm9uZSIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0wLDE3MnYtMTcyaDE3MnYxNzJ6IiBmaWxsPSJub25lIj48L3BhdGg+PGcgZmlsbD0iI2IwYjBiMCI+PHBhdGggZD0iTTcyLjI0LDEwLjMyYy0zMi4yNjM0NCwwIC01OC40OCwyNi4yMTY1NiAtNTguNDgsNTguNDhjMCwzMi4yNjM0NCAyNi4yMTY1Niw1OC40OCA1OC40OCw1OC40OGMxMi43NjU2MywwIDI0LjU2Mzc1LC00LjExMTg3IDM0LjE4NSwtMTEuMDcyNWw0NS4yNTc1LDQ1LjE1bDkuNjc1LC05LjY3NWwtNDQuNzIsLTQ0LjgyNzVjOC43ODgxMywtMTAuMjM5MzcgMTQuMDgyNSwtMjMuNTI5MDYgMTQuMDgyNSwtMzguMDU1YzAsLTMyLjI2MzQ0IC0yNi4yMTY1NiwtNTguNDggLTU4LjQ4LC01OC40OHpNNzIuMjQsMTcuMmMyOC41NDEyNSwwIDUxLjYsMjMuMDU4NzUgNTEuNiw1MS42YzAsMjguNTQxMjUgLTIzLjA1ODc1LDUxLjYgLTUxLjYsNTEuNmMtMjguNTQxMjUsMCAtNTEuNiwtMjMuMDU4NzUgLTUxLjYsLTUxLjZjMCwtMjguNTQxMjUgMjMuMDU4NzUsLTUxLjYgNTEuNiwtNTEuNnoiPjwvcGF0aD48L2c+PC9nPjwvc3ZnPg==" className="search-icon" alt="search-icon" />
              <input currenttheme={theme} placeholder="Search for a country" onChange={searchCountries} className="search-bar" data-testid="searchInput" />
            </div>
            <div className="filters-desktop">
              <Dropdown
                options={options}
                placeholder="Filter By Region"
                arrowOpen={<img src="https://img.icons8.com/ios-glyphs/10/000000/chevron-up.png" alt="chevron-down" />}
                arrowClosed={<img src="https://img.icons8.com/ios-glyphs/10/000000/chevron-down.png" alt="chevron-down" />}
                onChange={(filter) => {
                  setActiveFilter(filter.value);
                }}
              />
            </div>
          </div>
          <div className="filters-mobile">
            <Dropdown
              options={options}
              placeholder="Filter By Region"
              arrowOpen={<img src="https://img.icons8.com/ios-glyphs/10/000000/chevron-up.png" alt="chevron-down" />}
              arrowClosed={<img src="https://img.icons8.com/ios-glyphs/10/000000/chevron-down.png" alt="chevron-down" />}
              onChange={(filter) => {
                setActiveFilter(filter.value);
              }}
            />
          </div>
          <div className="country-grid">
            <div className="country-card">
              <div className="container">
                {filteredCountries.filter((country) => country.name.common.toLowerCase()
                  .includes(targetCountries.toLowerCase()))
                  .map((country) => <Card country={country} key={country.name.common} />)}
              </div>
            </div>
          </div>
        </GridDiv>
      )
  );
}
