import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { searchCountriesByName, updateSearchTerm } from '../features/nameSearch/nameSearchSlice';
import { setCountries, clearNameFilter, filterCountriesByName } from '../features/country/countrySlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { setSelectedRegion, clearSelectedRegion, getSelectedRegion } from '../features/regionFilter/regionFilterSlice';

export const CountryNameSearchInput = React.memo(() => {
    const countryNameSearchState = useSelector((state) => state.nameSearch);
    const allCountries = useSelector((state) => state.allCountries);
    const regionState = useSelector((state) => state.regionFilter);
    const dispatch = useDispatch();

    const handleSearch = (event) => {
        event.preventDefault();
        if(event.key === "Enter") {
            if (countryNameSearchState.searchTerm.trimStart() === '') {
                // I prefer this method of clearing the name to dispatching the setCountries() method.
                // console.log(`The selected region is ${regionState.selectedRegion}`);
                dispatch(setSelectedRegion(regionState.selectedRegion));
            } else {
                console.log(`Searching for ${event.target.value}`);
                dispatch(setSelectedRegion(regionState.selectedRegion));
                // dispatch(searchCountriesByName(countryNameSearchState.searchTerm.trimStart()))
                dispatch(filterCountriesByName(event.target.value));
                console.log(`Search completed!`);
            }
        }
        return;
    };

    return (
        <>
            <div className="country_name_search_input">

                <form onSubmit={(e) => {e.preventDefault(); handleSearch(e);}} method="POST" className='form_input'>
                    <label htmlFor="countrySearchInput"><FontAwesomeIcon icon={faSearch} /></label>
                    <input placeholder='Search for a country...' type="text" id="countrySearchInput" onChange={(e) => dispatch(updateSearchTerm(e.target.value.trimStart()))} value={countryNameSearchState.searchTerm} 
                        onKeyUp={handleSearch} 
                    />
                </form>
                
            </div>
        </>
    )
})
