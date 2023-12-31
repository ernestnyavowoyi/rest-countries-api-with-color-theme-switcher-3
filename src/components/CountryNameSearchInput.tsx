import React /*{FormEvent, KeyboardEvent}*/ from 'react'
// import { useDispatch, useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../app/hooks';

import { updateSearchTerm } from '../features/nameSearch/nameSearchSlice';
import { filterCountriesByName } from '../features/country/countrySlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { setSelectedRegion } from '../features/regionFilter/regionFilterSlice';

export const CountryNameSearchInput = React.memo(() => {
    const countryNameSearchState = useAppSelector((state) => state.nameSearch);
    // const allCountries = useAppSelector((state) => state.allCountries);
    const regionState = useAppSelector((state) => state.regionFilter);
    const dispatch = useAppDispatch();

    const handleSearch = (event: any) => {
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