import React from 'react'
import Header from './Header';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Root = () => {

  const darkModeState = useSelector((state) => state.darkMode);
  console.log(darkModeState);


  return (
    <div>
        <Header />
        <main className={`app${darkModeState.modeName === "dark" ? "_darkMode" : ""}`}>
            <Outlet />
        </main>
    </div>
  )
}

export default Root;