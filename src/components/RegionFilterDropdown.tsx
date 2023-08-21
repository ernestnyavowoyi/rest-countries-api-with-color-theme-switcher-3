import React from 'react'
import { setSelectedRegion, clearSelectedRegion } from '../features/regionFilter/regionFilterSlice';
import { clearSearchTerm } from '../features/nameSearch/nameSearchSlice';
// import { useSelector, useDispatch } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../app/hooks';

// import { filterCountriesByRegion as filter } from '../features/regionFilter/regionFilterSlice';

const RegionFilterDropdown = React.memo(() => {

    const regionFilter = useAppSelector((state) => state.regionFilter);
    
    const dispatch = useAppDispatch();
    const options = [
        { value: "", label: "All"},
        { value: "africa", label: "Africa"},
        { value: "americas", label: "America"},
        { value: "asia", label: "Asia"},
        { value: "europe", label: "Europe"},
        { value: "oceania", label: "Oceania"},
    ];

    const handleChange = React.useCallback((event: { target: { value: string; }; }) => {
        const val = event.target.value.trim();
        // clear the search term when the user changes the region
        dispatch(clearSearchTerm());
        
        if(val) {
            dispatch(setSelectedRegion(val));
            // I no longer need to dispatch the filter method as it is handled differently without a network request now.
            // dispatch(filter(val)); 
        } else {
            dispatch(clearSelectedRegion());
        }
    }, [])

  return (
    <div className="region_filter_div">
        <select title="region_filter" value={regionFilter.selectedRegion} onChange={handleChange} name="region_filter" id="region_filter" className="region_filter_select" placeholder="Filter by Region">
            {options.map((option) => {
                return <option className='option' key={option.value} value={option.value}>{option.label}</option>
            })}
        </select>
    </div>
  )
})

export default RegionFilterDropdown