import './Movies.css';
import { useState, useEffect } from 'react';
import moviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

const Movies = () => {

    const [isShortFilms, setIsShortFilms] = useState(false);
    const [preloader, setPreloader] = useState(false);
    const [isOn, setIsOn] = useState(false);
    const [movieError, setMovieError] = useState('');
    const [filmsInputSearch, setFilmsInputSearch] = useState('');
    const [films, setFilms] = useState(JSON.parse(localStorage.getItem('all-films')));
    const [savedFilms, setSavedFilms] = useState(JSON.parse(localStorage.getItem('saved-films')));

    useEffect(() => {
        mainApi
        .getMovies()
        .then((data) => {
            setSavedFilms(data);
        })
        .catch((err) => {
            setMovieError(`Ошибка сервера ${err}`);
        });
      
        handleGetMovies(localStorage.getItem('searched-films'))
    
        const localStorageFilms = localStorage.getItem('all-films');

        if (localStorageFilms) {
            const filterData = JSON.parse(localStorageFilms);
            setFilms(filterData);
            setPreloader(false);
        }

        const localStorageFilmsInputSearch = localStorage.getItem('searched-films');

        if (localStorageFilmsInputSearch) {
            setFilmsInputSearch(localStorageFilmsInputSearch);
        }
    }, []);

    function handleGetMovies(inputSearch) {

        if (!inputSearch) {
            setMovieError('Нужно ввести ключевое слово');
            return false;
        }

        setMovieError('');
        setPreloader(true);

        moviesApi.getMovies()
            .then((data) => {

                const movies = data.map((item) => {

                    return {
                        country: item.country,
                        director: item.director,
                        duration: item.duration,
                        year: item.year,
                        description: item.description,
                        image: `https://api.nomoreparties.co${item.image.url}`,
                        trailerLink: item.trailerLink,
                        nameRU: item.nameRU,
                        nameEN: item.nameEN,
                        thumbnail: `https://api.nomoreparties.co${item.image.formats.thumbnail.url}`,
                        movieId: item.id,
                        isAdd: false
                    }
                })
                console.log(movies);
                console.log(inputSearch)
                let filteredData = movies.filter(({ nameRU }) => nameRU.toLowerCase().includes(inputSearch.toLowerCase()));
                localStorage.setItem('all-films', JSON.stringify(filteredData));
                localStorage.setItem('searched-films', inputSearch);
                console.log(savedFilms)
                if (savedFilms) {
                    let moviesWithIsSaved = filteredData.map((item) => {
                        let savedItem = savedFilms.find(movie => {
                            return movie.movieId === item.movieId
                        });
                        if (savedItem) {
                            return { ...item, isAdd: true }
                        } else {
                            return { ...item, isAdd: false }
                        }
                    });
                    console.log(moviesWithIsSaved);
                    setFilms(moviesWithIsSaved);
                } else {
                    setFilms(filteredData);
                }
                if(localStorage.getItem('short-films') === 'true'){
                    setShortFilms(JSON.parse(localStorage.getItem('short-films')))
                }

            }).catch(() => {
                setMovieError(
                    'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
                );

                setFilms([]);
                localStorage.removeItem('all-films');
                localStorage.removeItem('short-films');
                localStorage.removeItem('searched-films');
            }).finally(() => {
                setPreloader(false);
            })
    }

    function setShortFilms(isOn) {
        console.log(isOn);
        console.log(localStorage.getItem('short-films'))
        if (isOn) {
            localStorage.setItem('short-films', true);
            const shortFilms = films.filter(({ duration }) => duration <= 40);
            setFilms(shortFilms);
        } else {
            localStorage.setItem('short-films', false);
            handleGetMovies(localStorage.getItem('searched-films'));
        }
    }

    function saveMovies(film) {

        mainApi.addMovie(film)
            .then(() => mainApi.getMovies()
                .then((data) => {
                    const isSaved = data.map((item) => {
                        return {
                            ...item,
                            isAdd: true
                        }
                    })
                    console.log(isSaved)
                    localStorage.setItem('saved-films', JSON.stringify(isSaved));
                    setSavedFilms(isSaved);
                }).catch(() => {
                    setMovieError('Во время получения обновленных данных.');
                }))
            .catch(() => {
                setMovieError('Во время добавления фильма произошла ошибка.');
            })

    }
    function deleteMovie(filmId) {
        console.log(filmId);
        mainApi.deleteMovie(filmId)
            .then(() => mainApi.getMovies()
                .then((data) => {
                    setSavedFilms(data);
                })
                .catch(() => {
                    setMovieError('Во время получения обновленных данных.');
                }))
            .catch(() => {
                setMovieError('Во время удаления фильма произошла ошибка.');
            })
    }

 

    function handleOnChange() {
        console.log(isOn);
        if (isOn) {
            setIsOn(false);
            localStorage.setItem('short-films', false);

        } else {
            setIsOn(true);
            localStorage.setItem('short-films', true);
            console.log(isOn)
        }
        console.log(isOn);

        setShortFilms(isOn);
    }

    useEffect(() => {
        if (localStorage.getItem('short-films')) {
            setIsOn(JSON.parse(localStorage.getItem('short-films')));
        }
        console.log(isOn);

    }, [])

    useEffect(() => {
        if(films){
            setShortFilms(isOn);
        }
    }, [isOn])

    return (
        <main className="movies">
            <SearchForm handleGetMovies={handleGetMovies} filmsInputSearch={filmsInputSearch} handleOnChange={handleOnChange} isOn={isOn}/>
            {preloader && <Preloader />}
            {movieError && <div className="movies__text-error">{movieError}</div>}
            {!preloader && !movieError && films && (
                <MoviesCardList
                    savedFilms={savedFilms}
                    saveMovies={saveMovies}
                    films={films}
                    deleteMovie={deleteMovie} />
            )}
        </main>
    );
};

export default Movies;