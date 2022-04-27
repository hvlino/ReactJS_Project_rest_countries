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
import App from './App';
import CountryInfo from './components/CountryInfo/CountryInfo';
import Provider from './Context';
import '@testing-library/jest-dom';

const countries = require('./mocks/countries.json');
const germanyJson = require('./mocks/germany.json');

const handles = [
  rest.get('https://restcountries.com/v3.1/all', (req, res, ctx) => res(ctx.json(countries))),
  rest.get('https://restcountries.com/v3.1/name/cuba', (req, res, ctx) => res(ctx.json([countries[5]]))),
  rest.get('https://restcountries.com/v3.1/name/germany', (req, res, ctx) => res(ctx.json(germanyJson))),
];

const server = setupServer(...handles);

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
  await act(async () => {
    render(<Provider><App /></Provider>);
  });
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
        <Provider>
          <Routes>
            <Route path="/countries/:country" element={<CountryInfo />} />
          </Routes>
        </Provider>
      </Router>,
    );
  });
  await waitFor(async () => {
    const germany = screen.getByText('Deutschland');
    expect(germany).toBeInTheDocument();
  });
});

// test('should be able to exit the details page', async () => {
//   await act(async () => {
//     render(<Provider><App /></Provider>);
//   });
//   await waitFor(async () => {
//     const germany = screen.getByText('Germany');
//     expect(germany).toBeInTheDocument();
//     fireEvent.click(germany);
//     await waitFor(async () => {
//       const brazil = screen.queryByText('Brazil');
//       expect(brazil).not.toBeInTheDocument();
//       const nativeName = screen.getByText('Native Name:');
//       expect(nativeName).toBeInTheDocument();
//       const backButton = screen.getByText('Back');
//       expect(backButton).toBeInTheDocument();
//       fireEvent.click(backButton);
//       await waitFor(() => {
//         const brazil2 = screen.getByText('Brazil');
//         expect(brazil2).toBeInTheDocument();
//       });
//     });
//   });
// });

// test('should be able to see the url change', async () => {
//   await act(async () => {
//     render(<Provider><App /></Provider>);
//   });
//   await waitFor(() => {
//     global.window = { location: { pathname: null } };
//     window.location.pathname = document;
//     const germany = screen.getByText('Germany');
//     expect(germany).toBeInTheDocument();
//     fireEvent.click(germany);
//     const brazil = screen.queryByText('Brazil');
//     expect(brazil).not.toBeInTheDocument();
//     const nativeName = screen.getByText('Native Name:');
//     expect(nativeName).toBeInTheDocument();
//     expect(window.location.pathname).toEqual('/countries/germany');
//   });
// });

// test('should be able to check for a country with no borders', async () => {
//   await act(async () => {
//     render(<Provider><App /></Provider>);
//   });
//   await waitFor(async () => {
//     const germany = screen.queryByText('Germany');
//     expect(germany).toBeInTheDocument();
//     await waitFor(() => {
//       const backButton = screen.getByText('Back');
//       expect(backButton).toBeInTheDocument();
//       fireEvent.click(backButton);
//       const cuba = screen.getByText('Cuba');
//       expect(cuba).toBeInTheDocument();
//       fireEvent.click(cuba);
//     });
//     const nativeName = screen.getByText('Native Name:');
//     const borders = screen.queryByText('Border Countries:');
//     expect(nativeName).toBeInTheDocument();
//     expect(borders).not.toBeInTheDocument();
//   });
// });
