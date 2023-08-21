import React from 'react'
import { useNavigate } from 'react-router-dom'
import { CountryType } from '../features/country/countrySlice';

// Define the props interface
interface ComponentProps {
  info: CountryType
}

export const CountryCard: React.FC<ComponentProps> = React.memo(({ info }) => {

  const navigate = useNavigate();  

  return (
    <>
      <div className='country_card' onClick={() => { navigate(`/${info.cca3}/`) }}>
          <div className="country_flag_container">
            <img className='country_flag' src={info.flags.svg} alt={info.flags.alt} />
          </div>
          <div className='info'>
            <p className='country_name'>{info.name.common}</p>
            <div className='country_stat_basic'>
              <p><span className='population'>Population: </span>{Intl.NumberFormat().format(info.population)}</p>
              <p><span className='region'>Region: </span>{info.region}</p>
              <p><span className='capital'>Capital: </span>{info.capital}</p>
            </div>
          </div>
          {/* <p>We are using the {darkModeState.modeName} mode.</p> */}
        {/* <Link to={`/${info.cca3}`}>

        </Link> */}
      </div>

    </>
  )
}, ((prevObj, nextObj) => { return JSON.stringify(prevObj) === JSON.stringify(nextObj); }))
