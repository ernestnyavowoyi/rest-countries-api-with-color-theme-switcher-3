import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../utils/api";
// import { CountryType } from "../country/countrySlice";

interface InitialState {
    selectedRegion: string,
    // loading: boolean,
    // results: Array<CountryType>,
    // errorMsg: string
}

const initialState : InitialState = {
    selectedRegion: "",
    // loading: false,
    // results: [],
    // errorMsg: ""
};

export const filterCountriesByRegion = createAsyncThunk(
    'filterCountriesByRegion',
    async (region) => {
        return axios.get(`${API.regionSearch}/${region}`).then((response) => response.data);
    }
)

const regionFilterSlice = createSlice({
    name: 'regionFilter',
    initialState,
    reducers: {
        setSelectedRegion: (state, action) => {
            // console.log(action.payload);

            const region = action.payload.trim();
            if(region) {
                state.selectedRegion = region;
            } else {
                state.selectedRegion = "";
            }
        },
        clearSelectedRegion: (state) => {
            state.selectedRegion = "";
        },
    }
})

export default regionFilterSlice.reducer;

export const { setSelectedRegion, clearSelectedRegion} = regionFilterSlice.actions;