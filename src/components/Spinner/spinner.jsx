import React, { useContext } from 'react';
import styled from 'styled-components';
import './spinner.scss';
import { Context } from '../../Context';

const StyledLoadingSpinner = styled.div`
  background: ${(props) => props.theme[props.currentTheme].primaryBackground};
`;

export default function LoadingSpinner() {
  const { theme } = useContext(Context);
  return (
    <StyledLoadingSpinner currentTheme={theme}>
      <div className="loading-spinner-box">
        <div className="loading-spinner" />
      </div>
    </StyledLoadingSpinner>
  );
}
