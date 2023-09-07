import './App.css';
import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Popup from '../Popup/Popup';
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import ErrorPage from '../ErrorPage/ErrorPage';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isLogged, setIsLogged] = useState(false);
  const { pathname } = useLocation();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [serverError, setServerError] = useState('');

  function closePopup() {
    setIsPopupOpen(false);
  }

  function handlePopupOpen() {
    setIsPopupOpen(true);
  }

  useEffect(() => {
    const currentPath = window.location.pathname;

    if (currentPath === '/movies' || currentPath === '/saved-movies' || currentPath === '/profile') {
      setIsLogged(true);
    }
    else {
      setIsLogged(false);
    }

  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        {(pathname === '/' || pathname === '/movies' || pathname === '/saved-movies' || pathname === '/profile') && <Header isLogged={isLogged} onBurgerClick={handlePopupOpen} />}
        <Routes>
          <Route path="/" element={<Main />} />
          <ProtectedRoute path="/movies" isLogged={isLogged} isSaved={false} element={Movies} />
          {/* <Route path="/movies" element={<Movies isSaved={false} />} /> */}
          <Route path="/saved-movies" element={<Movies isSaved={true} />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signup" element={<Register serverError={serverError} />} />
          <Route path="/signin" element={<Login />} />
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
