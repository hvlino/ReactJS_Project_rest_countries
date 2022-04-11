import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // useParams,
  // Link,
} from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Grid } from './components/Grid/Grid';
import Header from './components/Header/Header';
import CountryInfo from './components/CountryInfo/CountryInfo';
import './App.scss';
import 'react-dropdown/style.css';
import theme from './theme';

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Grid />} />
            <Route path="/countries/:country" element={<CountryInfo />} />
          </Routes>
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
