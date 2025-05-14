import { AbvRange, Beer, BeerSearchParams } from "./types";

// select beers from the data using the parameters entered
export function filterBeers(params: BeerSearchParams, beerList: Beer[]): Beer[] {

    return beerList.filter((beer: Beer) => {
        // if a beer name or keyword has been entered, check to see if it matches a beer name
        if (params.name) {
            return beer.name.toLowerCase().includes(params.name.toLowerCase());
        }
        // if no name has been entered, leave the beer on the list
        else { return beer; }

    }).filter((beer: Beer) => {
        // check of a beer abv value falls within the abv range specified by the user
        if (params.abvRange) { return isAbvValueInRange(beer.abv, params.abvRange); }
        else { return beer; }

    }).filter((beer: Beer) => {
        // if a style name has been selected from the Form.Select dropdown menu, check for a match
        if (params.style_name) { return beer.style_name === params.style_name; }
        else { return beer; }
    });
};

export function isAbvValueInRange(abv: string, abvRange: AbvRange): boolean {

    const abvNumber: number = Number.parseFloat(abv);
    let abvMinBool = (abvRange.min <= abvNumber && abvNumber <= abvRange.max);
    return abvMinBool;
}