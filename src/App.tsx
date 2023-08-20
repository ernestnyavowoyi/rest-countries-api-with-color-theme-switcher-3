import { Link, Route, RouterProvider, createBrowserRouter, createRoutesFromElements, useRouteMatch } from 'react-router-dom';
import './App.css';
import Root from './components/Root';
import Countries from './components/Countries';
import { ErrorBoundary } from 'react-error-boundary';
import CountryDetailsCard from './components/CountryDetailsCard';


// create the Routes from the Route elements :)

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Root />}>
    <Route index element={
      <ErrorBoundary fallback={<p>Sorry. There was an error displaying the list of countries.</p>} onError={(error, errorInfo) => { console.log(error); console.log(errorInfo); console.log('^^^^^^^^ The above is the error.') }}>
        <Countries />
      </ErrorBoundary>

    } />
    <Route path=":cca3" element={
      <ErrorBoundary fallback={(
        <>
          <p>Ooopss... An error occured. Please <Link to='/'>Click here</Link> to go to the Homepage</p>
        </>
      )}>
        <CountryDetailsCard />
      </ErrorBoundary>
    } />
    <Route path="about" element={<p>This project was made with react and built by Hon. Nyavowoyi Ernest (Captain James).</p>} />
  </Route>
));




function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
