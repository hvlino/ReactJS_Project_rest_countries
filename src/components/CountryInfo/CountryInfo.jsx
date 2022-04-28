/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Context } from '../../Context';
import CountryBorder from '../CountryBorder/CountryBorder';
import './CountryInfo.scss';

// eslint-disable-next-line import/prefer-default-export
const CountryInfo = function CountryInfo() {
  const [targetCountry, setTargetCountry] = useState(null);
  const { country } = useParams();
  const history = useNavigate();
  const navigate = () => {
    history('/');
  };

  const { loadTargetCountry, countries } = useContext(Context);

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

  return (targetCountry === null ? <h1>Loading...</h1>
    : (
      <div className="globalDiv">
        <button type="button" onClick={navigate} className="backButton" data-testid="backButton">
          <img alt="left-arrow" src="https://www.svgrepo.com/show/126221/left-arrow.svg" className="left-arrow" />
          Back
        </button>
        <div className="image-and-info">
          <div className="country-flag">
            <img alt={targetCountry.name.common} src={targetCountry.flags.svg} className="country-image" />
          </div>
          <div className="informations">
            <h1>{targetCountry.name.common}</h1>
            <div className="details-columns">
              <div className="native-name">
                <div className="details">
                  <strong>Native Name:</strong>
                  {' '}
                  {Object.values(targetCountry.name.nativeName)[0].common}
                </div>
                <div className="details">
                  <strong>Population:</strong>
                  {' '}
                  {dotto(targetCountry.population)}
                </div>
                <div className="details">
                  <strong>Region:</strong>
                  {' '}
                  {targetCountry.region}
                </div>
                <div className="details">
                  <strong>Sub Region:</strong>
                  {' '}
                  {targetCountry.subregion}
                </div>
                <div className="details">
                  <strong>Capital:</strong>
                  {' '}
                  {targetCountry.capital}
                </div>
              </div>
              <div className="tld">
                <div className="details">
                  <strong>Top Level Domain:</strong>
                  {' '}
                  {targetCountry.tld}
                </div>
                <div className="details">
                  <strong>Currencies:</strong>
                  {' '}
                  {Object.values(targetCountry.currencies).map((currency) => currency.name).join(', ')}
                </div>
                <div className="details">
                  <strong>Languages:</strong>
                  {' '}
                  {Object.values(targetCountry.languages).join(', ')}
                </div>
              </div>
            </div>
            {targetCountry.borders.length > 0 && (
            <div className="border-countries">
              <strong><span>Border Countries:</span></strong>
              {targetCountry.borders.map((code) => <CountryBorder code={code} key={code} />) }
            </div>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default CountryInfo;
