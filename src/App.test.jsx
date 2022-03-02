import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText('Dark Mode');
  expect(linkElement).toBeInTheDocument();
});

test('should be able to filter', () => {
  render(<App />);
  const filterOptions = screen.getByText('Filter By Rehion');
  fireEvent.click(filterOptions);
  const americaFilter = screen.getByText('America');
  fireEvent.click(americaFilter);
  const cuba = screen.getByText('Cuba');
  expect(cuba).not.toBeInTheDocument();
});
