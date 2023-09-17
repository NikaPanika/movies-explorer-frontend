import './SearchForm.css';
import { useState, useEffect } from 'react';
import lens from '../../images/icon.svg';
import { useLocation } from 'react-router-dom';

const SearchForm = ({ handleGetMovies, filmsInputSearch, handleOnChange, isOn }) => {
    const { pathname } = useLocation();
    const [inputSearch, setInputSearch] = useState('');
    const [isChecked, setIsChecked] = useState(false);

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
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
        handleOnChange(!isChecked); // Передаем обратное значение чекбокса в колбэк-функцию
    };


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
                        {pathname === '/movies' ?
                            <input className="search__checkbox" type="checkbox" onChange={handleOnChange} value={isOn} checked={isOn} />
                            :
                            <input className="search__checkbox" type="checkbox" onChange={handleCheckboxChange} value={isOn} checked={isOn} />
                        }

                        <span className="search__ellipse" />
                    </label>
                    <p className="search__type">Короткометражки</p>
                </div>
            </form>
        </section>

    );
}

export default SearchForm;