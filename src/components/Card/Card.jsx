/* eslint-disable no-plusplus */
import React from 'react';
import PropTypes from 'prop-types';
import './Card.scss';

// eslint-disable-next-line import/prefer-default-export
const Card = function Card({ country }) {
  const dotto = (num) => {
    const val = num.toString();
    let final = val[0];

    for (let i = 1; i < val.length; i++) {
      if ((val.length - i) % 3 === 0) { final += ','; }
      final += val[i];
    }

    return final;
  };

  return (
    <div className="card" key={country.name.common} role="document">
      <div className="card-header">
        <img src={country.flags.png} alt={country.name.common} className="country-image" />
      </div>
      <div className="card-body">
        <div className="country-name">{country.name.common}</div>
        <div>
          <div className="info-numbers">
            Population:
            {' '}
            {dotto(country.population)}
          </div>
          <div className="info-numbers">
            Region:
            {' '}
            {country.region}
          </div>
          <div className="info-numbers capital-div">
            Capital:
            {' '}
            {country.capital[0]}
          </div>
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  country: PropTypes.object.isRequired,
};

export default Card;
