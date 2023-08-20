import React from 'react'
import DarkModeToggler from './DarkModeToggler';
import { useSelector } from 'react-redux';

const Header = () => {

  const darkModeState = useSelector((state) => state.darkMode);

  return (
    <div className={`header_container${darkModeState.modeName === "dark" ? "_darkMode" : ""}`}>
      <div className="header">
        <p className="app_title">Where in the world?</p>
        <div><DarkModeToggler /></div>
      </div>
    </div>
  )
}


export default Header;