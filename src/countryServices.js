const axios = require('axios').default;

export const getCountries = async (signal) => {
  const response = await axios.get('https://restcountries.com/v3.1/all?fields=name,flags,capital,population,region,cca3', { signal });
  return response.data;
};

export const getTargetCountry = async (signal, countryName) => {
  const response = await axios.get(`https://restcountries.com/v3.1/name/${countryName}/?fields=name,flags,capital,population,region,subregion,tld,languages,borders,currencies,cca3`, { signal });
  return response.data;
};
