import React, {
  createContext, useState, useEffect, useMemo,
} from 'react';
import { getCountries } from './countryServices';

export const Context = createContext('');

export default function ctx({ children }) {
  const [countries, setCountries] = useState([]);
  const [activeFilter, setActiveFilter] = useState('ALL');

  const filterList = useMemo(() => countries.filter((country) => {
    if (activeFilter === 'ACTIVE') {
      return !country.completed;
    }
    if (activeFilter === 'COMPLETED') {
      return country.completed;
    }
    return true;
  }));

  useEffect(async () => {
    const results = await getCountries();
    setCountries(results);
  });

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const values = {
    countries, filterList, activeFilter, setActiveFilter,
  };

  return (
    <Context.Provider value={values}>
      {children}
    </Context.Provider>
  );
}
