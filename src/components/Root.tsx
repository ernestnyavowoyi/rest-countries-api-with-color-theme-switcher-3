import Header from './Header';
import { Outlet } from 'react-router-dom';
// import { useSelector } from 'react-redux';
import { useAppSelector } from '../app/hooks';


const Root = () => {

  const darkModeState = useAppSelector((state) => state.darkMode);
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