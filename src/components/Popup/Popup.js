import './Popup.css'
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function Popup({ isOpen, onClose }) {

    const { pathname } = useLocation();

    return (
        <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
            <div className="popup__container">
                <button className="popup__close-button" type="button" onClick={onClose}></button>
                <div className="popup__menu">
                    <div className="popup__navigation">
                        <NavLink className={`popup__navlink active-burger ${(pathname === '/') ? 'active-link' : ''}`} to="/" onClick={onClose}>Главная</NavLink>
                        <NavLink className={`popup__navlink active-burger ${(pathname === '/movies') ? 'active-link' : ''}`} to="/movies" onClick={onClose} >Фильмы</NavLink>
                        <NavLink className={`popup__navlink active-burger ${(pathname === '/saved-movies') ? 'active-link' : ''}`} to="/saved-movies" onClick={onClose} >Сохранённые фильмы</NavLink>
                    </div>

                    <div className="popup__profile">
                        <NavLink className="popup__navlink popup__navlink_last" to="/profile" onClick={onClose}>
                            <span className="popup__account">Аккаунт</span>
                        </NavLink>
                        <button className="popup__menu-button" type="button" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Popup;