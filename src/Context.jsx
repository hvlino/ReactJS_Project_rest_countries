/* eslint-disable no-plusplus */
import React, {
  createContext, useState, useMemo,
} from 'react';
import { getCountries, getTargetCountry } from './countryServices';

export const Context = createContext('');

export default function ctx({ children }) {
  const [countries, setCountries] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [theme, setTheme] = useState('light');

  const loadCountries = async (signal) => {
    const results = await getCountries(signal);
    setCountries(results);
    return results;
  };

  const loadTargetCountry = async (signal, countryName) => {
    const result = await getTargetCountry(signal, countryName);
    return result;
  };

  const options = useMemo(() => {
    const regions = [];
    for (let i = 0; i < countries.length; i++) {
      if (!regions.includes(countries[i].region)) {
        regions.push(countries[i].region);
      }
    }
    regions.sort();
    regions.unshift('All');
    return regions;
  }, [countries]);

  const filteredCountries = useMemo(() => {
    if (activeFilter === 'All') {
      return countries;
    }
    return countries.filter((country) => country.region === activeFilter);
  }, [countries, activeFilter]);

  const filterCountryList = (name) => {
    if (activeFilter !== 'All') {
      setActiveFilter('All');
    }
    return countries.filter((country) => country.name.common.includes(name));
  };
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const values = {
    countries,
    loadCountries,
    setCountries,
    options,
    activeFilter,
    setActiveFilter,
    filteredCountries,
    filterCountryList,
    loadTargetCountry,
    theme,
    toggleTheme,
  };

  // loadCountries();
  return (
    <Context.Provider value={values}>
      {children}
    </Context.Provider>
  );
}
