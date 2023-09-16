import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const MoviesCardList = ({
  films,
  currentMovies,
  saveMovies,
  savedFilms,
  deleteMovie }) => {

  const { pathname } = useLocation();

  const [amountOfCards, setAmountOfCards] = useState(12);
  const [isAllCards, setIsAllCards] = useState(false);

  function setInitialNumber() {
    const windowWidth = window.innerWidth;

    if (windowWidth >= 1280) {
      setAmountOfCards(12)
    } else if ((windowWidth >= 768) && (windowWidth <= 1279)) {
      setAmountOfCards(8)
    };
    if (windowWidth < 768) {
      setAmountOfCards(5)
    };

  }

  function addCards() {
    const width = window.innerWidth;
    if (width >= 1280) {
      setAmountOfCards(amountOfCards + 4);
    } else if ((width >= 769) && (width <= 1279)) {
      setAmountOfCards(amountOfCards + 3);
    } else if (width <= 768) {
      setAmountOfCards(amountOfCards + 2);
    }
  }

  function checkIsAllCards() {
    console.log(films.length);
    console.log(amountOfCards);
    films.length < amountOfCards
      ?
      setIsAllCards(true)
      :
      setIsAllCards(false)

  }

  useEffect(() => {

    checkIsAllCards();

  }, [])

  useEffect(() => {

    setInitialNumber()

  }, [])

  useEffect(() => {
    window.addEventListener('resize', setInitialNumber);
    return () => window.removeEventListener('resize', setInitialNumber);
  });

  return (
    <section className="cards">
      <ul className="cards__list">
        {films.slice(0, amountOfCards).map((film) => (
          <li className="cards__element" key={film.movieId}>
            <MoviesCard
              key={film.movieId}
              film={film}
              saveMovies={saveMovies}
              savedFilms={savedFilms}
              deleteMovie={deleteMovie}
              films={films}
            />
          </li>
        ))}
      </ul>

      {pathname === '/movies'
        &&
        <button 
        className="cards__more" 
        type="button" 
        onClick={addCards} 
        hidden={isAllCards}>Ещё</button>}

    </section>
  );
};

export default MoviesCardList;