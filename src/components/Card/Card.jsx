import React, { useContext } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import './Card.scss';
import { Context } from '../../Context';

const StyledCard = styled.div`
  transition: ${(props) => props.theme[props.currenttheme].transition};
  background: ${(props) => props.theme[props.currenttheme].primaryBackground};
  color: ${(props) => props.theme[props.currenttheme].primaryText};
  box-shadow: ${(props) => props.theme[props.currenttheme].shadow};
`;

const Card = function Card({ country }) {
  const {
    theme,
  } = useContext(Context);
  const history = useNavigate();

  const dotto = (num) => {
    const val = num.toString();
    let final = val[0];

    for (let i = 1; i < val.length; i += 1) {
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
  country: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default Card;
