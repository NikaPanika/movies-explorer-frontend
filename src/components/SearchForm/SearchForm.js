import './SearchForm.css';
import { useState, useEffect } from 'react';
import lens from '../../images/icon.svg';

const SearchForm = ({ handleGetMovies, filmsInputSearch, handleOnChange, isOn }) => {

    const [inputSearch, setInputSearch] = useState('');

    function handleInputChange(evt) {
        setInputSearch(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        handleGetMovies(inputSearch);
        console.log(inputSearch)
    }

    useEffect(() => {
        setInputSearch(filmsInputSearch);
    }, [filmsInputSearch]);

    return (
        <section>
            <form className="search">
                <div className="search__container">
                    <img className="search__lens" src={lens} alt="лупа" />
                    <input className="search__input" placeholder="Фильм" type="text" value={inputSearch || ''} onChange={handleInputChange} required />
                    <button type="submit" className="search__button" onClick={handleSubmit}>Найти</button>
                </div>
                <div className="search__short-films">
                    <label className="search__label">
                        <input className="search__checkbox" type="checkbox" onChange={handleOnChange} value={isOn} checked={isOn} />
                        <span className="search__ellipse" />
                    </label>
                    <p className="search__type">Короткометражки</p>
                </div>
            </form>
        </section>

    );
}

export default SearchForm;