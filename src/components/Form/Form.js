import './Form.css'
import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../images/logo.svg';
import { useEffect, useRef } from 'react';

function Form({
    name,
    title,
    inputs,
    buttonText,
    onSubmit,
    isLoading,
    navLink,
    navText,
    text,
    serverError
}) {

    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.value = "";
    }, []);

    return (
        <form className="form" name={name} noValidate>
            <div className="form__box">
                <NavLink className="form__logo-link" to="/">
                    <img className="form__logo" src={logo} alt="Логотип" />
                </NavLink>

                <h2 className="form__title">{title}</h2>
                <div className="form__container">
                    {inputs.map((item) => {
                        return (
                            <>
                                <label className="form__label" >{item.title}</label>
                                <input className="form__input"
                                    type={item.type}
                                    name={item.name}
                                    required={item.required}
                                    minLength={item.minLength}
                                    maxLength={item.maxLength}
                                    defaultValue={item.value}
                                    placeholder={item.placeholder}
                                    ref={inputRef}
                                />
                                <span className="form__error">{item.error}</span>
                            </>
                        )
                    })}
                </div>
            </div>

            <span className="form__error-message"></span>
            <button className="form__button-submit" type="submit" disabled={isLoading} >
                {buttonText}
            </button>
            <nav className="form__navigation">
                <p className="form__message">{text}</p>
                <NavLink className="form__navlink" to={navLink} >{navText}</NavLink>
            </nav>
        </form>
    );

}

export default Form;