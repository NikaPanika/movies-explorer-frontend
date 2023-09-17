import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const MoviesCardList = ({
  films,
  saveMovies,
  savedFilms,
  deleteMovie,
  isOn }) => {

  const { pathname } = useLocation();

  const [amountOfCards, setAmountOfCards] = useState(films.length);
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
    console.log('ggggg')
    if (width >= 1280) {
      console.log('1111')
      setAmountOfCards(amountOfCards + 3);
    } else if ((width >= 769) && (width <= 1279)) {
      console.log('2222')
      setAmountOfCards(amountOfCards + 2);
    } else if (width <= 768) {
      console.log('3333')
      setAmountOfCards(amountOfCards + 2);
    }
  }

  function checkIsAllCards() {
    console.log(isOn);
    console.log(films.length);
    console.log(amountOfCards);
    if (isOn) {
      films.length < amountOfCards
        ?
        setIsAllCards(true)
        :
        setIsAllCards(false)
    } else {
      films.length < amountOfCards
        ?
        setIsAllCards(true)
        :
        setIsAllCards(false)
    }

  }

  useEffect(() => {
    checkIsAllCards();
    console.log(films)
  }, [amountOfCards, isOn, isAllCards, pathname])

  useEffect(() => {
    if (pathname === '/movies') {
      setInitialNumber();
    } 

  }, [films, pathname])

  useEffect(() => {
    if (pathname === '/saved-movies') {
      setIsAllCards(true);
      console.log(films.length)
      setAmountOfCards(films.length);
      console.log(isAllCards)
    }
  }, [isAllCards, pathname])

  useEffect(() => {
    if (pathname === '/movies') {
      window.addEventListener('resize', setInitialNumber);
      return () => window.removeEventListener('resize', setInitialNumber);
    }

  });

  return (
    <section className="cards">
      <ul className="cards__list">
        {films.slice(0, amountOfCards).map((film) => (
          <li className="cards__element" key={film.id || film.movieId}>
            {<MoviesCard
              key={film.movieId}
              film={film}
              saveMovies={saveMovies}
              savedFilms={savedFilms}
              deleteMovie={deleteMovie}
              films={films}
            />}
          </li>
        ))}
      </ul>

      <button
        className="cards__more"
        type="button"
        onClick={addCards}
        hidden={isAllCards}>Ещё</button>


    </section>
  );
};

export default MoviesCardList;