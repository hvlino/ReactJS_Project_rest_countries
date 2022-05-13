import React, {
  createContext, useState, useMemo, useEffect,
} from 'react';
import { getCountries, getTargetCountry } from './countryServices';

export const Context = createContext('');

export default function ctx({ children }) {
  const [countries, setCountries] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const currentTheme = window.localStorage.getItem('theme');
  const [theme, setTheme] = useState(currentTheme ?? 'light');

  useEffect(() => {
    window.localStorage.setItem('theme', theme);
  }, [theme]);

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
    for (let i = 0; i < countries.length; i += 1) {
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

  const value = {
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

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  );
}
