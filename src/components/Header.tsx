import DarkModeToggler from './DarkModeToggler';
// import { useSelector } from 'react-redux';
import { useAppSelector } from '../app/hooks';


const Header = () => {

  const darkModeState = useAppSelector((state) => state.darkMode);

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