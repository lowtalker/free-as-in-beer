import React from 'react';
import { useState, JSX } from 'react';

import ItemsList from './components/ItemsList';
import BeerNameInput from './components/BeerNameInput';
import NumberRangeInputs from './components/NumberRangeInputs';

import beersJson from './data/beers.json';
import breweriesJson from './data/breweries.json'

import { Beer, BeerInfo, BeerSearchParams } from './util/types';
import { createBeerInfoArray, generateStyleOptions, initialBeerSearchParams, normalizeAbvValues, selectBeerStyles, uniqueBeerStyles, updateAbvRange, updateNameParam, updateStyleParam } from './util/beer_utils';
import { NAME } from './util/constants';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container';
import { filterBeers } from './util/filters';
import { Image } from 'react-bootstrap';

function App() {

  const [beerStyleOptions, setBeerStyleOptions] = useState<JSX.Element[]>(generateStyleOptions(uniqueBeerStyles))
  const [selectedBeers, setSelectedBeers] = useState<Array<Beer>>(beersJson)
  const[selectedBeerInfos, setSelectedBeerInfos] = useState<Array<BeerInfo>>(createBeerInfoArray(selectedBeers, breweriesJson)) 
  const [searchParams, setSearchParams] = useState<BeerSearchParams>(initialBeerSearchParams)

  const [beerName, setBeerName] = useState<string>('');
  const [beerMinAbv, setBeerMinAbv] = useState<string>('');
  const [beerMaxAbv, setBeerMaxAbv] = useState<string>('');
  const [beerStyle, setBeerStyle] = useState<string>('');

  // search beers by name
  const handleNameInputChange = (name: string): void => {
    setBeerName(name);
    setSearchParams(updateNameParam(searchParams, name));
    setSelectedBeers(filterBeers(searchParams, beersJson));
    setSelectedBeerInfos(createBeerInfoArray(selectedBeers, breweriesJson))
    setBeerStyleOptions(generateStyleOptions(selectBeerStyles(selectedBeers)));

  }

  // search beers by style
  const handleStyleInputChange = (style: string): void => {
    setBeerStyle(style);
    setSearchParams(updateStyleParam(searchParams, style));
    setSelectedBeers(filterBeers(searchParams, beersJson));
    setSelectedBeerInfos(createBeerInfoArray(selectedBeers, breweriesJson))
    setBeerStyleOptions(generateStyleOptions(selectBeerStyles(selectedBeers)));
  }

  function handleAbvMin(min: string): void {
    setBeerMinAbv(min);
    filterByAbvRange();
  }

  function handleAbvMax(max: string): void {
    setBeerMaxAbv(max);
    filterByAbvRange();
  }

  // search beers by abv value
  function filterByAbvRange(): void {
    // conversion of min/max abv values happens here so that: 
    // 1. the placeholder value will render in the Form.Control component 
    //    (which requires the min/max useState values to be strings)
    // 2. the abv range values as numbers can be used to calculate the beers with an abv
    //    in the specified range (which requires the AbvRange type to specify min/max as numbers)
    let abvRange = normalizeAbvValues(beerMinAbv, beerMaxAbv);

    setSearchParams(updateAbvRange(searchParams, abvRange));
    setSelectedBeers(filterBeers(searchParams, beersJson));
    setSelectedBeerInfos(createBeerInfoArray(selectedBeers, breweriesJson))
    setBeerStyleOptions(generateStyleOptions(selectBeerStyles(selectedBeers)));
  }

  // reset all state hooks 
  function handleClearParameters(): void {

    setBeerStyleOptions(generateStyleOptions(uniqueBeerStyles));
    setSelectedBeers(beersJson)
    setSelectedBeerInfos(createBeerInfoArray(selectedBeers, breweriesJson))
    setSearchParams(initialBeerSearchParams)

    setBeerName('');
    setBeerStyle('');
    setBeerMinAbv('');
    setBeerMaxAbv('');
    window.location.reload();
  }

  return (
    <div className="App">
      <header className="App-header">
        <br />

        <Form>
          <h1>Beer Hound</h1>
          <br />
          <Row>
            <Container as={Col}><Image src="https://media.tenor.com/tayNzuiMSsMAAAAM/beer-dog-beer.gif" fluid /></Container>
            <Container as={Col}>
              <Row className="mb-3">
                <Form.Group className="mb-3">
                  <BeerNameInput placeHolder={NAME} inputValue={beerName} onChangeCallback={handleNameInputChange} />
                </Form.Group>
              </Row>
            </Container>
            <Container as={Col}>
              <Row className="mb-3">
                <Form.Group className="mb-3">
                  <NumberRangeInputs minInputValue={beerMinAbv} maxInputValue={beerMaxAbv} minChangeCallback={handleAbvMin} maxChangeCallback={handleAbvMax} />
                </Form.Group>
              </Row>
            </Container>
            <Container fluid="md" as={Col}>
              <Row className="mb-3">
                <Form.Group className="mb-3" as={Col}>
                  <Form.Label>Style</Form.Label>
                  <Form.Select title="Style" value={beerStyle} onChange={event => handleStyleInputChange(event.target.value)} onInputCapture={event => handleStyleInputChange(event.currentTarget.value)}>
                    <option></option>
                    {beerStyleOptions}
                  </Form.Select>
                </Form.Group>
              </Row>
            </Container>
            <Container as={Col}>
              <Row >
                <Form.Group className="mb-3" as={Col}>
                  <Form.Label></Form.Label>
                  <Container>
                    <Button variant="secondary" onClick={handleClearParameters}>Clear Selections</Button>
                  </Container>
                </Form.Group>
              </Row>
            </Container>
            <Container as={Col}><Image src="https://media.tenor.com/TC6YHaAEWC8AAAAM/beerdog-dog-beer.gif" fluid /></Container>
          </Row>
          {/* display beer info matching search parameters*/}
          {<ItemsList items={selectedBeerInfos} />}
        </Form>
      </header>
    </div>
  );
}

export default App;