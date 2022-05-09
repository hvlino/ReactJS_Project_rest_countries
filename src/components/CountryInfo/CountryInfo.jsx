/* eslint-disable react/prop-types */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { Context } from '../../Context';
import CountryBorder from '../CountryBorder/CountryBorder';
import './CountryInfo.scss';
import Spinner from '../Spinner/spinner';

// eslint-disable-next-line import/prefer-default-export
const CountryInfo = function CountryInfo() {
  const [targetCountry, setTargetCountry] = useState(null);
  const { country } = useParams();
  const history = useNavigate();
  const navigate = () => {
    history('/');
  };

  const { loadTargetCountry, countries, theme } = useContext(Context);

  const controller = new AbortController();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const countryArray = await loadTargetCountry(controller.signal, country);
        setTargetCountry(countryArray[0]);
      } catch (e) {
        controller.abort();
      }
    };
    fetchData();
    return () => {
      controller.abort();
    };
  }, []);

  const dotto = (num) => {
    const val = num.toString();
    let final = val[0];

    for (let i = 1; i < val.length; i++) {
      if ((val.length - i) % 3 === 0) { final += ','; }
      final += val[i];
    }

    return final;
  };
};
