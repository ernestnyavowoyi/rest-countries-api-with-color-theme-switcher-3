import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API } from "../../utils/api";
import axios from 'axios';

import { setSelectedRegion, clearSelectedRegion } from '../regionFilter/regionFilterSlice';


export interface CountryType {
    name: {
        common: string,
        official: string,
        nativeName: {[key: string]: string}
    },
    population: number,
    region: string,
    borders: Array<string>,
    capital: Array<string>,
    flags: {
        alt: string,
        png: string,
        svg: string
    },
    subregion: string,
    tld: Array<string>,
    languages: {
        [key: string]: string
    },
    cca3: string,
    currencies: {
        [key:string]: string
    }
}

const emptyCountryType: CountryType = {
    name: {
        common: "",
        official: "",
        nativeName: {}
    },
    population: 0,
    region: "",
    borders: [],
    capital: [],
    flags: {
        alt: "",
        png: "",
        svg: ""
    },
    subregion: "",
    tld: [],
    languages: {},
    cca3: "",
    currencies: {},
}

interface InitialState {
    allCountries: Array<CountryType>,
    loading: boolean,
    errorMsg: string,
    selectedDisplayCountry: CountryType,
    displayedCountries: Array<CountryType>
}

// define the initial state (or skeleton) of this part of the application
const initialState : InitialState = {
    allCountries: [],
    loading: false,
    errorMsg: "",
    selectedDisplayCountry: emptyCountryType,
    displayedCountries: [],
};

export const fetchAllCountries = createAsyncThunk(
    'country/fetchAllCountries',
    async () => {
        return axios.get(API.all).then((response) => response.data)
    }
)

export const fetchCountryByAlphaCode = createAsyncThunk(
    'country/fetchCountryByAlphaCode',
    async (code) => {
        return axios.get(`${API.alphaSearch}/${code}`).then((response) => response.data);
    }
)

const countrySlice = createSlice({
    name: 'country',
    initialState,
    reducers: {
        setCountries: (state, action) => {
            state.loading = false;
            state.displayedCountries = action.payload;
            state.errorMsg = "";
        },

        setSelectedDisplayCountry: (state, action) => {
            state.loading = false;
            state.selectedDisplayCountry = action.payload;
            state.errorMsg = "";
        },

        clearSelectedDisplayCountry: (state) => {
            state.loading = false;
            state.selectedDisplayCountry = emptyCountryType;
            state.errorMsg = "";
        },

        clearNameFilter: (state) => {
            state.loading = false;
            state.selectedDisplayCountry = emptyCountryType;
            state.errorMsg = '';
            state.displayedCountries = state.allCountries;
        },

        filterCountriesByName: (state, action) => {
            state.loading = false;
            state.selectedDisplayCountry = emptyCountryType;
            state.errorMsg = '';
            const q = action.payload.toLowerCase().trimStart();
            // if there is no search term, we simply dispatch the clear name filter
            if(!q) {
                state.displayedCountries = state.allCountries;
                return;   
            }
            // if(!state.displayedCountries) {
            //     console.log(state);
            // }
            console.log(`Thank goodness we are here! with ${action.payload}`);
            console.log(state.displayedCountries.length);
            const displayedCountries = state.displayedCountries.filter((country) => {
                const common_name = country.name.common.toLowerCase();
                const official_name = country.name.official.toLowerCase();
                return common_name.includes(q) || official_name.includes(q);
            })

            state.displayedCountries = displayedCountries.length ? displayedCountries : []; 
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllCountries.pending, (state) => {
            state.loading = true;
            state.allCountries = [];
            state.displayedCountries = [];
            state.errorMsg = ""
        })
        builder.addCase(fetchAllCountries.fulfilled, (state, action) => {
            state.loading = false;
            state.allCountries = action.payload;
            state.displayedCountries = state.allCountries;
            state.errorMsg = "";
        })
        builder.addCase(fetchAllCountries.rejected, (state, action) => {
            state.loading = false;
            state.allCountries = [];
            state.displayedCountries = state.allCountries;
            state.errorMsg = action.error.message ?? '';
        })


        // Search for a list of countries belonging to the specified region
        builder.addCase(setSelectedRegion, (state, action) => {
            const region = action.payload.toLowerCase();
            if(region) {
                state.displayedCountries = state.allCountries.filter((country) => {
                    return country.region.toLowerCase() === region;
                });
            } else {
                state.displayedCountries = state.allCountries;
            }
            console.log(`Filtering done for the selected region.`);
        })

        // Changing the selected retion to re-display all the countries
        builder.addCase(clearSelectedRegion, (state) => {
            state.loading = false;
            state.displayedCountries = state.allCountries;
            state.selectedDisplayCountry = emptyCountryType;
            state.errorMsg = "";
            console.log(`Filter on countries cleared.`);
        })

    }
})

export default countrySlice.reducer;

export const { setCountries, setSelectedDisplayCountry, clearSelectedDisplayCountry, clearNameFilter, filterCountriesByName } = countrySlice.actions;

