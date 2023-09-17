import './App.css';
import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import { CurrentUserContext } from '../../context/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Popup from '../Popup/Popup';
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import ErrorPage from '../ErrorPage/ErrorPage';
import mainApi from '../../utils/MainApi';
import handleError from '../../utils/HandleError';
import moviesApi from '../../utils/MoviesApi';
import SavedMovies from '../SavedMovies/SavedMovies';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isLogged, setIsLogged] = useState(localStorage.getItem('loggedIn'));
  const { pathname } = useLocation();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [serverError, setServerError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  function closePopup() {
    setIsPopupOpen(false);
  }

  function handlePopupOpen() {
    setIsPopupOpen(true);
  }

  useEffect(() => {
    getUserInfo();
  }, []);


  function getUserInfo() {
    mainApi
      .getUser()
      .then((data) => {
        setCurrentUser(data);
        setIsLogged(true);
      })
      .catch((err) => {
        setServerError(err);

      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function onRegister(data) {
    const password = data.password;
    mainApi.registerUser(data)
      .then((res) => {
        const email = res.email;
        onLogin({ email, password });
        navigate('/signin', { replace: true });
        localStorage.setItem('user', JSON.stringify(res));
      })
      .catch((err) => {
        setServerError(handleError(err, '/signup'));

      });
  }

  function onLogin(data) {
    mainApi.loginUser(data)
      .then((data) => {
        setIsLogged(true);
        localStorage.setItem('jwt', data.jwt);
        localStorage.setItem('loggedIn', true);
        getUserInfo();
        navigate("/movies", { replace: true });
      })
      .catch((err) => {
        setServerError(handleError(err, '/signin'));
      });
  }

  function handleSignOut() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('searched-films');
    localStorage.removeItem('all-films');
    localStorage.removeItem('saved-films');
    localStorage.removeItem('user');
    localStorage.removeItem('all-movies');
    localStorage.removeItem('short-saved-films');
    localStorage.removeItem('short-films')
    setIsLogged(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        {(pathname === '/' || pathname === '/movies' || pathname === '/saved-movies' || pathname === '/profile') && <Header isLogged={isLogged} onBurgerClick={handlePopupOpen} />}
        <Routes>
          <Route path="/" element={<Main />} />
          <Route
            path="/movies"
            element={
              <ProtectedRoute
                path="/movies"
                isLogged={isLogged}
                element={Movies} />
            } />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute
                path="/movies"
                isLogged={isLogged}
                element={SavedMovies} />
            } />

          <Route
            path="/profile"
            element={
              <ProtectedRoute
                isLogged={isLogged}
                isSaved={false}
                element={Profile}
                handleSignOut={handleSignOut}
                setCurrentUser={setCurrentUser} />} />
          <Route path="/signup" element={<Register serverError={serverError} onRegister={onRegister} />} />
          <Route path="/signin" element={<Login serverError={serverError} onLogin={onLogin} />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        {(pathname === '/' || pathname === '/movies' || pathname === '/saved-movies') && <Footer />}
        <Popup
          isOpen={isPopupOpen}
          onClose={closePopup} />
      </div >
    </CurrentUserContext.Provider>
  );
}

export default App;
