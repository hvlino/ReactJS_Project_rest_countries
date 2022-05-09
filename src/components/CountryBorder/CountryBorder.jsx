/* eslint-disable react/prop-types */
/* eslint-disable import/prefer-default-export */
// <Link to={`/countries/${borderCountry}`}>{borderCountry}</Link>
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Context } from '../../Context';
import { getTargetCountry } from '../../countryServices';

const CountryBorder = function CountryBorder({ code }) {
  const [country, setCountry] = useState('');
  const { theme } = useContext(Context);

  const controller = new AbortController();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getTargetCountry(controller.signal, code);
        setCountry(result[0]);
      } catch (e) {
        controller.abort();
      }
    };
    fetchData();
    return () => {
      controller.abort();
    };
  }, []);

  return country ? (
    <Link currenttheme={theme} to={`/countries/${country.name.common.toLowerCase()}`}>
      {country.name.common}
    </Link>
  ) : '';
};

CountryBorder.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  code: PropTypes.string.isRequired,
};

export default CountryBorder;
