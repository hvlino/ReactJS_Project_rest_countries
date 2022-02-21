/* eslint-disable no-console */
const axios = require('axios').default;

export const getCountry = async (countryCode) => {
  try {
    const response = await axios.get(`https://restcountries.com/v3.1/name/${countryCode}/?fields=name,flags,capital,population,region`);
    return response.data;
  } catch (error) {
    console.error(error.response.status, error.response.statusText);
    throw new Error(error);
  }
};

export const getCountries = async () => {
  try {
    const response = await axios.get('https://restcountries.com/v3.1/all?fields=name,flags,capital,population,region');
    return response.data;
  } catch (error) {
    console.error(error.response.status, error.response.statusText);
    throw new Error(error);
  }
};
