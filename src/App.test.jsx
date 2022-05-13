import '@testing-library/jest-dom';
import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import {
  MemoryRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import App from './App';
import CountryInfo from './components/CountryInfo/CountryInfo';
import Provider from './Context';
import theme from './theme';

const countries = require('./mocks/countries.json');
const germanyJson = require('./mocks/germany.json');
const cubaJson = require('./mocks/cuba.json');

const handles = [
  rest.get('https://restcountries.com/v3.1/all', (req, res, ctx) => res(ctx.json(countries))),
  rest.get('https://restcountries.com/v3.1/name/cuba', (req, res, ctx) => res(ctx.json(cubaJson))),
  rest.get('https://restcountries.com/v3.1/name/germany', (req, res, ctx) => res(ctx.json(germanyJson))),
  rest.get('https://restcountries.com/v3.1/name/*', (req, res, ctx) => res(ctx.json([]))),
];

const server = setupServer(...handles);

beforeEach(() => window.localStorage.removeItem('theme'));
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('should be able to get the theme text', async () => {
  await act(async () => {
    render(<Provider><App /></Provider>);
  });
  const linkElement = screen.getByText('Light Mode');
  expect(linkElement).toBeInTheDocument();
});

test('should be able to get some country names inside document', async () => {
  render(<Provider><App /></Provider>);
  await waitFor(() => {
    const regionElement = screen.getByText('Germany');
    expect(regionElement).toBeInTheDocument();
  });
});

test('should be able to filter the countries inside document (desktop)', async () => {
  await act(async () => {
    render(<Provider><App /></Provider>);
  });
  await waitFor(async () => {
    const regionElement = screen.getAllByText('Filter By Region')[0].closest('.Dropdown-control');
    expect(screen.getAllByRole('document')).toHaveLength(6);
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

test('should be able to filter the countries inside document (mobile)', async () => {
  await act(async () => {
    render(<Provider><App /></Provider>);
  });
  await waitFor(async () => {
    const regionElement = screen.getAllByText('Filter By Region')[1].closest('.Dropdown-control');
    expect(screen.getAllByRole('document')).toHaveLength(6);
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

test('should be able to search for some countries inside document', async () => {
  await act(async () => {
    render(<Provider><App /></Provider>);
  });
  await waitFor(async () => {
    await waitFor(async () => {
      const regionElement = screen.getAllByText('Filter By Region')[1].closest('.Dropdown-control');
      expect(screen.getAllByRole('document')).toHaveLength(6);
      fireEvent.mouseDown(regionElement);
      await waitFor(async () => {
        const europeFilter = screen.getByText('Europe');
        fireEvent.click(europeFilter);

        await waitFor(() => {
          expect(screen.getAllByRole('document')).toHaveLength(1);
        });
      });
    });
    const searchInput = screen.getByTestId('searchInput');
    expect(searchInput).toBeInTheDocument();
    fireEvent.change(searchInput, { target: { value: 'Russia' } });
    const regionElement = screen.queryByText('Germany');
    expect(regionElement).not.toBeInTheDocument();
  });
});

test('should be able to click the country card', async () => {
  render(<Provider><App /></Provider>);
  await waitFor(async () => {
    const [germany] = screen.getAllByRole('document');
    expect(germany).toBeInTheDocument();
    fireEvent.click(germany);
  });
});

test('should be able to view the details page', async () => {
  await act(async () => {
    render(
      <Router initialEntries={['/countries/germany']}>
        <ThemeProvider theme={theme}>
          <Provider>
            <Routes>
              <Route path="/countries/:country" element={<CountryInfo />} />
            </Routes>
          </Provider>
        </ThemeProvider>
      </Router>,
    );
  });
  await waitFor(async () => {
    const germany = screen.getByText('Deutschland');
    expect(germany).toBeInTheDocument();
  });
});

test('should click on theme button change theme', async () => {
  render(<Provider><App /></Provider>);
  const themeButton = screen.getByText('Light Mode');
  fireEvent.click(themeButton);
  expect(screen.getByText('Dark Mode')).toBeInTheDocument();
});

test('should use sun when in light mode and moon when in dark mode', async () => {
  const { container } = render(<Provider><App /></Provider>);
  const themeButton = screen.getByText('Light Mode');
  expect(container.querySelector('svg').innerHTML).toBe('sun-regular.svg');
  fireEvent.click(themeButton);
  expect(container.querySelector('svg').innerHTML).toBe('moon-regular.svg');
  fireEvent.click(themeButton);
  expect(container.querySelector('svg').innerHTML).toBe('sun-regular.svg');
});

test('should be able to view the details page of a border with no countries', async () => {
  await act(async () => {
    render(
      <Router initialEntries={['/countries/cuba']}>
        <ThemeProvider theme={theme}>
          <Provider>
            <Routes>
              <Route path="/countries/:country" element={<CountryInfo />} />
            </Routes>
          </Provider>
        </ThemeProvider>
      </Router>,
    );
  });
  await waitFor(async () => {
    const capital = screen.queryByText('Havana');
    expect(capital).toBeInTheDocument();
    const borders = screen.queryByText('Border Countries');
    expect(borders).not.toBeInTheDocument();
  });
});
