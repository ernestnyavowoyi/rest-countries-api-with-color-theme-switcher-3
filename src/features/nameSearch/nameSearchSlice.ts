import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../utils/api";
import axios from "axios";
import { setSelectedRegion, clearSelectedRegion } from '../regionFilter/regionFilterSlice';
import { CountryType } from "../country/countrySlice";

type InitialState = {
    searchTerm: string,
    searchResults: Array<CountryType>
    loading: boolean,
    errorMsg: string,
}

const initialState : InitialState = {
    searchTerm: "",
    searchResults: [],
    loading: false,
    errorMsg: ""
};

export const searchCountriesByName = createAsyncThunk(
    'search',
    async (name) => {
        console.log('this is fine oo' + name);
        return axios.get(`${API.nameSearch}/${name}`).then((response) => response.data);
    }
);


const nameSearchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        updateSearchTerm: (state, action) => {
            if (action.payload.trimStart() === "") {
                state.searchTerm = "";
            } else {
                state.searchTerm = action.payload;
            }
        },
        clearSearchTerm: (state) => {
            state.searchTerm = "";
        },
    },
    extraReducers: (builder) => {

        // When a region is changed, clear the name
        builder.addCase(setSelectedRegion, (state) => {
            // state.searchTerm = "";
            state.loading = false;
            state.errorMsg = "";
            console.log('Country search term has been cleared.');
        })

        builder.addCase(clearSelectedRegion, (state) => {
            state.loading = false;
            state.errorMsg = '';
            state.searchTerm = "";
            console.log(`The country name has been cleared!`);
        })

    }
});

export default nameSearchSlice.reducer;

export const { updateSearchTerm, clearSearchTerm } = nameSearchSlice.actions;

