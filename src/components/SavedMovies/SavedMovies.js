import './SavedMovies'
import { useState, useEffect } from 'react';
import mainApi from '../../utils/MainApi';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';


const SavedMovies = () => {

    const [preloader, setPreloader] = useState(false);
    const [movieError, setMovieError] = useState('');
    const [filmsInputSearch, setFilmsInputSearch] = useState('');
    const [allSavedfilms, setAllSavedFilms] = useState(null);
    const [isOn, setIsOn] = useState(false);

    useEffect(() => {
        setIsOn(false);
   
        mainApi
            .getMovies()
            .then((data) => {
                setAllSavedFilms(data);
                console.log(data);
                console.log(isOn);
                setShortFilms(isOn);
            })
            .catch((err) => {
                setMovieError(`Ошибка сервера ${err}`);
            });
        console.log(allSavedfilms);

    }, []);

    function handleGetMovies(inputSearch) {
        console.log(inputSearch);
        mainApi
            .getMovies()
            .then((data) => {
                let filteredData = data.filter(({ nameRU }) => nameRU.toLowerCase().includes(inputSearch.toLowerCase()));
                setAllSavedFilms(filteredData);

            })
            .catch((err) => {
                setMovieError(`Ошибка сервера ${err}`);
            });
    }

    function deleteMovie(filmId) {
        console.log(filmId);
        mainApi.deleteMovie(filmId)
            .then(() => mainApi.getMovies()
                .then((data) => {
                    setAllSavedFilms(data);
                })
                .catch(() => {
                    setMovieError('Во время получения обновленных данных.');
                }))
            .catch(() => {
                setMovieError('Во время удаления фильма произошла ошибка.');
            })
    }
    function setShortFilms(isOn) {
        console.log(isOn);
        console.log(localStorage.getItem('short-saved-films'))
        if (isOn) {
            const shortFilms = allSavedfilms.filter(({ duration }) => duration <= 40);
            console.log(shortFilms);
            setAllSavedFilms(shortFilms);
        } else {
            handleGetMovies(filmsInputSearch)
        }
    }


    function handleOnChange() {
        console.log(isOn);
        console.log(localStorage.getItem('short-saved-films'));
        if (isOn) {
            setIsOn(false);
            localStorage.setItem('short-saved-films', false);
            setShortFilms(false);
        } else {
            setIsOn(true);
            localStorage.setItem('short-saved-films', true);
            console.log(isOn)
            setShortFilms(true);
        }
        console.log(isOn);


    }
    /* 84955545061 */
    return (
        <main className="movies-saved">
            <SearchForm handleGetMovies={handleGetMovies} filmsInputSearch={filmsInputSearch} handleOnChange={handleOnChange} isOn={isOn} />
            {preloader && <Preloader />}
            {movieError && <div className="movies-saved__text-error">{movieError}</div>}
            {!preloader && !movieError && allSavedfilms && (
                <MoviesCardList

                    films={allSavedfilms}
                    deleteMovie={deleteMovie} />
            )}
        </main>
    );
};

export default SavedMovies;