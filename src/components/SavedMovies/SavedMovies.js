import './SavedMovies'
import { useState, useEffect } from 'react';
import mainApi from '../../utils/MainApi';
import { useLocation } from 'react-router-dom';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';


const SavedMovies = () => {
    const { pathname } = useLocation();

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
                console.log(data)
                setAllSavedFilms(data);
                console.log(data);
                console.log(isOn);
            })
            .catch((err) => {
                setMovieError(`Ошибка сервера ${err}`);
            });
        console.log(allSavedfilms);

    }, []);

    function handleGetMovies(inputSearch) {
        console.log(inputSearch);
        setFilmsInputSearch(inputSearch);
        mainApi
            .getMovies()
            .then((data) => {
                let filteredData = data.filter(({ nameRU }) => nameRU.toLowerCase().includes(inputSearch.toLowerCase()));
                if (isOn) {
                    const shortFilms = filteredData.filter(({ duration }) => duration <= 40);
                    console.log(shortFilms);
                    setAllSavedFilms(shortFilms);
                } else{
                    setAllSavedFilms(filteredData);
                }
                

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
                    console.log(filmsInputSearch);
                    handleGetMovies(filmsInputSearch);
                })
                .catch(() => {
                    setMovieError('Во время получения обновленных данных.');
                }))
            .catch(() => {
                setMovieError('Во время удаления фильма произошла ошибка.');
            })
    }

    function setShortFilms(on) {
        console.log(on);
        if (on) {
            const shortFilms = allSavedfilms.filter(({ duration }) => duration <= 40);
            console.log(shortFilms);
            setAllSavedFilms(shortFilms);
        } else {
            mainApi
            .getMovies()
            .then((data) => {
                let filteredData = data.filter(({ nameRU }) => nameRU.toLowerCase().includes(filmsInputSearch.toLowerCase()));
                console.log(data)
                setAllSavedFilms(filteredData);
                console.log(data);
                console.log(isOn);
            })
            .catch((err) => {
                setMovieError(`Ошибка сервера ${err}`);
            });
        }
    }


    function handleOnChange(checkbox) {
        console.log(checkbox);
        if (checkbox) {
            setIsOn(true);
            console.log(isOn)
            setShortFilms(true);
        } else {
            setIsOn(false);
            setShortFilms(false);
        }
        console.log(isOn);
    }

    return (
        <main className="movies-saved">
            <SearchForm handleGetMovies={handleGetMovies} filmsInputSearch={filmsInputSearch} handleOnChange={handleOnChange} isOn={isOn}/>
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