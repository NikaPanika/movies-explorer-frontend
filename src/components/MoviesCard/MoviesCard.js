import './MoviesCard.css';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

function MoviesCard({ film,
    saveMovies,
    savedFilms,
    deleteMovie,
    films

}) {

    const { pathname } = useLocation();
    const [isAdd, setIsAdd] = useState(false);

    function handleFavoriteToogle() {
        if (!film.isAdd) {
            film.isAdd = true;
            setIsAdd(true)
            const removeAdd = JSON.parse(JSON.stringify(film));
            delete removeAdd.isAdd;
            saveMovies(removeAdd);
        } else {
            film.isAdd = false;
            setIsAdd(false)
            handleDelete();
        }

    }

    function handleDelete() {
        if (pathname === '/movies') {
            film.isAdd = false;
            const savedMovie = savedFilms.find((savedFilm) => {
                return film.movieId === savedFilm.movieId
            })
            deleteMovie(savedMovie._id);
        } else {
            film.isAdd = false;
            const card = films.find((item) => {
                return film.movieId === item.movieId
            })
            deleteMovie(card._id);
        }


    }

    function openVideo() {
        window.open(film.trailerLink)
    }

    return (
        <div className="card">
            <div className="card__container" >

                <img className="card__image" src={film.image} alt={film.nameRU} onClick={openVideo} />

                {pathname === '/movies' ?
                    film.isAdd ?
                        <button className='card__button card__button_saved' type="button" onClick={handleFavoriteToogle}></button>
                        :
                        <button className='card__button card__button_unsaved' type="button" onClick={handleFavoriteToogle}></button>

                    : <button className="card__button  card__button_remove"
                        type="button" onClick={handleDelete}>
                    </button>}

            </div>

            <div className="card__info">
                <h2 className="card__title">
                    {film.nameRU}
                </h2>
                <p className="card__duration">
                    {`${Math.trunc(film.duration / 60)}ч ${film.duration % 60}м`}
                </p>
            </div>
        </div >
    );
}

export default MoviesCard;