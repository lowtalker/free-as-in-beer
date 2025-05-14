import React from 'react';
import ReactDOMClient from 'react-dom/client';
import { render, screen } from '@testing-library/react';
import App from './App';
import { updateNameParam, normalizeAbvValues } from './util/beer_utils';
import { AbvRange, Beer, BeerSearchParams } from './util/types';
import testBeersJson from './data/testBeers.json';
import { filterBeers } from './util/filters';
import BeerNameInput from './components/BeerNameInput';

test('renders app successfully without crashing', () => {
  const div = document.createElement('div');
  ReactDOMClient.createRoot(div).render(<App />);
});

test('update name param', () => {
  let range: AbvRange = { min: 0, max: 10 };
  let beerParams: BeerSearchParams = {
    name: 'coors',
    abvRange: range,
    style_name: "lager"
  }
  let updatedParams = updateNameParam(beerParams, 'budweiser')
  expect(updatedParams.name).toMatch('budweiser')
});

test('normalize abv values', () => {
  let normalizedRange = normalizeAbvValues(3.2, '');

  expect(normalizedRange.min).toBe(3.2);
  expect(normalizedRange.max).toBe(20);
});

test('filter beer list', () => {
  let range: AbvRange = { min: 0, max: 20 };
  let beerParams: BeerSearchParams = {
    name: "Hocus Pocus",
    abvRange: range,
    style_name: ""
  }
  let selectedBeers: Beer[] = filterBeers(beerParams, testBeersJson);
  expect(selectedBeers[0].name).toBe("Hocus Pocus");

});

test('itemsList component', async () => {
  render(<BeerNameInput placeHolder="name" inputValue={"Harvest Ale 2006"} />)
  await screen.findByPlaceholderText('name').then((input) => {
    expect(input).toBeTruthy();
  });
});


