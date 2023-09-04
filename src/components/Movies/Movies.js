import './Movies.css';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

const Movies = ({ isSaved }) => {

    return (
        <div className="movies">
            <SearchForm />
            <MoviesCardList isSaved={isSaved}/>
        </div>
    );
};

export default Movies;