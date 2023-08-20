import React, { useEffect } from 'react'
import { CountryType, fetchAllCountries } from '../features/country/countrySlice';
import { useDispatch, useSelector } from 'react-redux';
import { CountryCard } from './CountryCard';
import { CountryNameSearchInput } from './CountryNameSearchInput';
import RegionFilterDropdown from './RegionFilterDropdown';


const Countries = React.memo(() => {

    const countriesState = useSelector((state) => state.allCountries);
    const nameSearchState = useSelector((state) => state.nameSearch);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('This is a nice must-have feature!');
        if (!countriesState.displayedCountries.length) {
            dispatch(fetchAllCountries());
        } else {
            console.log('We are not refecthing the data');
        }
    }, []);
    return (
        <>
            <div className='filter_and_search_container'>
                <CountryNameSearchInput />
                <RegionFilterDropdown />
            </div>
            <div className="countries_container">
                {
                    countriesState.loading ?
                        <p>Loading Countries... Please wait...</p>
                        :
                        (
                            (countriesState.errorMsg.length && countriesState.displayedCountries.length)
                                ? <p className="data_loading_error">Sorry. There was an error. Please refresh the browser and try again.</p>
                                :
                                countriesState.displayedCountries.map((country: CountryType) => <CountryCard key={country.cca3} info={country} />)
                        )
                }
                
                {
                    nameSearchState.searchTerm && !countriesState.displayedCountries.length ? <p className='no_countries_found'>Found no countries matching {nameSearchState.searchTerm}.</p>
                    :
                    nameSearchState.errorMsg && <p className='no_countries_found_error'>No countries matched "<span style={{ fontWeight: '800' }}>{nameSearchState.searchTerm}</span>". Error: <span>{nameSearchState.errorMsg}</span></p>
                }

                {
                    /* The code below is no longer needed */

                    // nameSearchState.searchTerm && !nameSearchState.searchResults ? <p className='no_countries_found'>No results found</p>
                    // :
                    // nameSearchState.errorMsg && <p className='no_countries_found_error'>No countries matched "<span>{nameSearchState.searchTerm}</span>". Error: <span>{nameSearchState.errorMsg}</span></p>
                }
            </div>
        </>
    )
});

export default Countries;