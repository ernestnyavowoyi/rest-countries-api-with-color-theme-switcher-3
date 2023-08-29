import { useEffect } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
// import { useSelector, useDispatch } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../app/hooks';

import { CountryType, CurrenciesType, NativeNameType, setSelectedDisplayCountry } from '../features/country/countrySlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { fetchAllCountries } from '../features/country/countrySlice';
import { Params } from 'react-router-dom';

const CountryDetailsCard:  React.FC = () => {

    const { cca3 } : Readonly<Params<string>> = useParams() ?? '';
    const location = useLocation();

    const navigate = useNavigate();

    const countriesState = useAppSelector((state) => state.allCountries);

    const allCountries = countriesState.allCountries;
    const selectedDisplayCountry : CountryType = countriesState.selectedDisplayCountry;

    const dispatch = useAppDispatch();


    const getNativeName = (obj: NativeNameType) => {
        if (!obj) {
            return "";
        }
        const keys = Object.keys(obj);
        const lastKey = keys[keys.length - 1];
        return obj[lastKey]?.common;
    }

    const getTopLevelDomains = (arr: Array<string>) => {
        if (!arr || !arr.length) {
            return "";
        }
        return arr.join(", ");
    }


    const getCurrencies = (obj: CurrenciesType ) => {
        if (!obj) {
            return "";
        }
        const keys = Object.keys(obj);
        const result:Array<string> = keys.map(curr => obj[curr].name);
        return result.join(", ");
    }

    const getLanguages = (obj: {[key: string] : string}) => {
        if (!obj) {
            return "";
        }
        const keys = Object.keys(obj);
        const result = keys.map((curr) => obj[curr]);
        return result.join(", ");
    }

    const handleBorderCountryClick = ( e: React.MouseEvent<HTMLElement> ) => {
        e.preventDefault();
        const target = e.target as HTMLButtonElement;
        const navLink = target.attributes.getNamedItem('data-country-code')?.value;
        // const navLink = target.attributes['data-country-code'].value;
        // console.log(navLink);
        // return;
        // setCountryCode(e.target.innerText.trim());
        // console.log('the thing is supposed to change');
        navigate(`/${navLink || target.innerText}`);
    }

    useEffect(() => {
        if (allCountries.length) {
            // console.log(`There were countries before oo`);
            const info = allCountries.filter((country) => country.cca3 === cca3);
            // console.log(info[0]);
            dispatch(setSelectedDisplayCountry(info[0]));
            const bordersCca3 = info[0].borders;
            // console.log(`the moment you find it!`);
            // console.log(bordersCca3);
            // console.log(`I hope you found it!`);
            let border_countries = [];
            // console.log(bordersCca3);
            border_countries = bordersCca3 && bordersCca3.map((border) => {
                // console.log(`Getting name for ${border}`);
                return allCountries.filter((country) => country.cca3 === border)[0].name.common;
            });
            // console.log(`So now we have the following as our border countries!`);
            console.log(border_countries);
        } else {
            // console.log(`OMG!.... we are crusing around by starting from this route!`);

            // Fetch the country using the country's alpha code :)
            const action = {
                type: 'country/fetchCountryByAlphaCode',
                payload: {
                  code: cca3,
                },
              };
              
            dispatch(action);
            // dispatch(fetchCountryByAlphaCode(cca3));
            dispatch(fetchAllCountries());
            // dispatch(setSelectedDisplayCountry(allCountries.filter((country) => country.cca3 === cca3)))
        }
    }, [location.pathname]);

    return (
        <div className="details_page_container">

            <div className='details_page'>
                <div className="back_button_container">
                    <button className='' type="button" onClick={() => navigate('/')}><span><FontAwesomeIcon icon={faArrowLeftLong} /></span> <span>Back</span></button>
                </div>

                {countriesState.loading ? <p>Loading...</p> :

                    countriesState.errorMsg.length ? <p>Error: {countriesState.errorMsg}</p> :

                        Object.keys(countriesState.selectedDisplayCountry).length ?
                            <div className="country_card_details">
                                {
                                    <>
                                        <div className='flag'>
                                            <img src={selectedDisplayCountry && selectedDisplayCountry.flags.svg} alt="" />
                                        </div>
                                        <div className="country_info_container">
                                            <div className='selected_country_name'>
                                                <p>{selectedDisplayCountry.name.common}</p>
                                            </div>
                                            <div className='country_info'>
                                                <div className='country_info_1'>
                                                    <p>Native Name: <span>{getNativeName(selectedDisplayCountry.name.nativeName)}</span></p>
                                                    <p>Population: <span>{Intl.NumberFormat().format(selectedDisplayCountry.population)}</span></p>
                                                    <p>Region: <span>{selectedDisplayCountry.region}</span></p>
                                                    <p>Sub Region: <span>{selectedDisplayCountry.subregion}</span></p>
                                                    <p>Capital: <span>{selectedDisplayCountry.capital}</span></p>
                                                </div>
                                                <div className='country_info_2'>
                                                    <p>Top Level Domain: <span>{getTopLevelDomains(selectedDisplayCountry.tld)}</span></p>
                                                    <p>Currencies: <span>{getCurrencies(selectedDisplayCountry.currencies)}</span></p>
                                                    <p>Languages: <span>{getLanguages(selectedDisplayCountry.languages)}</span></p>
                                                </div>
                                            </div>
                                            <div className="border_countries_container">
                                                <p className="border_countries_header">Border Countries:</p>
                                                {
                                                    allCountries.length ? (
                                                        <ul className='border_countries'>
                                                            {
                                                                (selectedDisplayCountry.borders && selectedDisplayCountry.borders.length) ? selectedDisplayCountry.borders.map((border) => {
                                                                    const country_info = allCountries.filter((country: CountryType) => country.cca3 === border)[0];
                                                                    return (
                                                                        <li data-country-code={country_info.cca3} className='button' onClick={handleBorderCountryClick} key={border}>{country_info.name.common}</li>
                                                                    );
                                                                }) :
                                                                    <p>No border countries.</p>
                                                            }
                                                        </ul>
                                                    ) :
                                                        (
                                                            <ul className='border_countries'>{selectedDisplayCountry.borders && selectedDisplayCountry.borders.length ? selectedDisplayCountry.borders.map(border => (<li className='button' onClick={handleBorderCountryClick} key={border}>{border}</li>)) : (<span>No border countries.</span>)}</ul>
                                                        )
                                                }

                                            </div>
                                        </div>
                                    </>
                                }
                            </div>
                            :
                            <div className='country_card_details_not_found'>
                                <p>Sorry. The requested country was not found.</p>
                            </div>
                }

            </div>
        </div>
    )
}

export default CountryDetailsCard