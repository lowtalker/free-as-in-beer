export type Beer = {
    id: string;
    brewery_id: string;
    name: string;
    abv: string;
    ibu: string;
    srm: string;
    upc: string;
    filepath: string;
    descript: string;
    add_user: string | null;
    last_mod: string | null;
    style_name: string | null;
    cat_name: string | null;
}

export type BeerSearchParams = {
    name: string | null;
    abvRange: AbvRange | null;
    style_name: string | null;
}

export type AbvRange = {
    min: number,
    max: number,
}

export type Brewery = {
    id: string,
    name: string,
    address1: string,
    city: string,
    state: string,
    code: string,
    country: string,
    phone: string,
    website: string,
    filepath: string,
    descript: string,
    latitude: string,
    longitude: string,
}

export type BeerInfo = {
    id: string,
    name: string,
    style: string,
    abv: string,
    description: string,
    breweryName: string,
}