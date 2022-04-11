import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // useParams,
  // Link,
} from 'react-router-dom';
import { Grid } from './components/Grid/Grid';
import Header from './components/Header/Header';
import CountryInfo from './components/CountryInfo/CountryInfo';
import './App.scss';
import 'react-dropdown/style.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Grid />} />
          <Route path="/countries/:country" element={<CountryInfo />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
