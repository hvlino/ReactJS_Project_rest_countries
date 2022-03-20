import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from './App';
import Provider from './Context';

const countries = require('./mocks/countries.json');

const server = setupServer(
  rest.get('https://restcountries.com/v3.1/all', (req, res, ctx) => res(ctx.json(countries))),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('should be able to get the theme text', async () => {
  await act(async () => {
    render(<Provider><App /></Provider>);
  });
  const linkElement = screen.getByText('Dark Mode');
  expect(linkElement).toBeInTheDocument();
});

test('should be able to get some country names inside document', async () => {
  render(<Provider><App /></Provider>);
  await waitFor(() => {
    const regionElement = screen.getByText('Germany');
    expect(regionElement).toBeInTheDocument();
  });
});

test('should be able to filter the countries inside document', async () => {
  await act(async () => {
    render(<Provider><App /></Provider>);
  });
  await waitFor(async () => {
    const regionElement = screen.getAllByText('Filter By Region')[0].closest('.Dropdown-control');
    expect(screen.getAllByRole('document')).toHaveLength(5);
    fireEvent.mouseDown(regionElement);
    await waitFor(async () => {
      const europeFilter = screen.getByText('Europe');
      fireEvent.click(europeFilter);

      await waitFor(() => {
        expect(screen.getAllByRole('document')).toHaveLength(1);
      });
    });
  });
});
