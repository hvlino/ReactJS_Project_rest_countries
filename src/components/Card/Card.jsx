/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-plusplus */
import React, { useContext } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import './Card.scss';
import { Context } from '../../Context';

const StyledCard = styled.div`
  background: ${(props) => props.theme[props.currenttheme].primaryBackground};
  color: ${(props) => props.theme[props.currenttheme].primaryText};
  box-shadow: ${(props) => props.theme[props.currenttheme].shadow};
`;

// eslint-disable-next-line import/prefer-default-export
const Card = function Card({ country }) {
  const {
    theme,
  } = useContext(Context);
  const history = useNavigate();

  const dotto = (num) => {
    const val = num.toString();
    let final = val[0];

    for (let i = 1; i < val.length; i++) {
      if ((val.length - i) % 3 === 0) { final += ','; }
      final += val[i];
    }

    return final;
  };

  const navigate = () => {
    history(`/countries/${country.name.common.toLowerCase()}`);
  };

  return (
    <StyledCard className="card" key={country.name.common} onClick={navigate} role="document" currenttheme={theme}>
      <div className="card-header" dell="black">
        <img src={country.flags.svg} alt={country.name.common} className="country-image" />
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
    </StyledCard>
  );
};

Card.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  country: PropTypes.object.isRequired,
};

export default Card;
