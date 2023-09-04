import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useState, useEffect } from 'react';
import films from './films'

const MoviesCardList = ({isSaved}) => {

    const [ amountOfCards, setAmountOfCards ] = useState(12);
    const [ isAllCards, setIsAllCards ] = useState(false);
  
    function setInitialNumber() {
      const windowWidth = window.innerWidth;
  
      if (windowWidth >= 1024) {
        setAmountOfCards(12)
      };
      if ((windowWidth >= 768) && (windowWidth < 1024)) {
        setAmountOfCards(8)
      };
      if (windowWidth < 768) {
        setAmountOfCards(5)
      };
  
    }
  
    function addCards() {

        setAmountOfCards(amountOfCards + 3);
    }
  
    function checkIsAllCards() {
  
      films.length < amountOfCards
      ?
      setIsAllCards(true)
      :
      setIsAllCards(false)
  
    }
  
    useEffect(() => {
  
      checkIsAllCards();
  
    })
  
    useEffect(() => {
  
      setInitialNumber()
  
    }, [])
    
  return (
    <section className="cards">
        <div className="cards__list">
          {films.slice(0, amountOfCards).map((film) => (
            <MoviesCard
              key={film.id}
              film={film}
              isSaved={isSaved}
            />
          ))}
        </div>

      <button className="cards__more" onClick={addCards} hidden={isAllCards}>Ещё</button>

    </section>
  );
};

export default MoviesCardList;