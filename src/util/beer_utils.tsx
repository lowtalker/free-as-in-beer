import { JSX } from 'react';
import beersJson from '../data/beers.json';
import { capitalCharacterRegex } from './regex_utils';
import { AbvRange, Beer, BeerInfo, BeerSearchParams, Brewery } from './types';

// generate a list off all beer styles available from the beers.json data
export const allBeerStyles: string[] = beersJson
    .map((beer) => beer.style_name)
    .flatMap((style_name) => (style_name ? [style_name] : []))
    .flatMap((style) => (capitalCharacterRegex.test(style) ? [style] : []));

// create a set of beer style strings, removing duplicate styles
export const uniqueBeerStyles: string[] = Array.from(new Set(allBeerStyles)).sort();

// dynamically set the available beer styles based on beer name entered
export function selectBeerStyles(selectedBeers: Beer[]): string[] {
    let selectedStyles = selectedBeers.map((beer) => beer.style_name)
        .flatMap((style_name) => (style_name ? [style_name] : []))
        .flatMap((style) => (capitalCharacterRegex.test(style) ? [style] : []));

    return Array.from(new Set(selectedStyles)).sort();
}

// create an <option> tag for the beer style Form.Select, showing only the styles for the beers selected
export function generateStyleOptions(styleList: string[]): JSX.Element[] {
    return styleList.map((style, index) => <option key={index} value={style}>{style}</option>)
}

export function updateNameParam(currentSearchParams: BeerSearchParams, beerName: string): BeerSearchParams {
    currentSearchParams.name = beerName;
    return currentSearchParams;
}

export function updateStyleParam(currentSearchParams: BeerSearchParams, beerStyle: string): BeerSearchParams {
    currentSearchParams.style_name = beerStyle;
    return currentSearchParams;
}

export function updateAbvRange(currentSearchParams: BeerSearchParams, abvRange: AbvRange): BeerSearchParams {
    currentSearchParams.abvRange = abvRange;
    return currentSearchParams;
}

// set the max range for abv values when a min or max has not yet been entered by the user
export function normalizeAbvValues(min: any, max: any): AbvRange {
    let normalizedAbv = initialAbvRange;

    // the min & max value state hooks are initialized as empty strings in App.tsx
    // so that the placeholder will render properly. Here we check for a value before updating
    if (min !== '') {
        normalizedAbv.min = Number.parseFloat(min);
    }

    if (max !== '') {
        normalizedAbv.max = Number.parseFloat(max);
    }
    return normalizedAbv;
}

export function getBrewery(breweryId: string, breweries: Brewery[]): string | undefined {
    return breweries.find((brewery) => (brewery.id === breweryId))?.name;
}

export function createBeerInfoArray(beers: Beer[], breweries: Brewery[]): BeerInfo[] {
    return beers.flatMap((beer: Beer) => {
        let brewery = (getBrewery(beer.brewery_id, breweries) || '');        
        return createBeerInfo(beer, brewery)
    });
}

export function createBeerInfo(beer: Beer, breweryName: string): BeerInfo {
    return {
        id: beer.id,
        name: beer.name,
        style: (beer.style_name || ''),
        abv: beer.abv,
        description: beer.descript,
        breweryName: breweryName
    };
}

export const initialAbvRange: AbvRange = { min: 0, max: 20 };
export const initialBeerSearchParams: BeerSearchParams = { name: null, style_name: null, abvRange: initialAbvRange };