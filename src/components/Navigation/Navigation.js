import './Navigation.css';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Navigation = ({ isLogged, onBurgerClick }) => {

    const { pathname } = useLocation();

    return (
        <nav className="navigation">
            {!isLogged
                ?
                <>
                    <NavLink className="navigation__link" to="/signup">Регистрация</NavLink>
                    <NavLink className="navigation__link" to="/signin">
                        <span className="navigation__entrance">Войти</span>
                    </NavLink>
                </>
                :
                <>
                    <div className="navigation__menu">
                        <NavLink className={`navigation__navlink ${(pathname === '/movies') ? 'active-link' : ''}`} to="/movies" >Фильмы</NavLink>
                        <NavLink className={`navigation__navlink ${(pathname === '/saved-movies') ? 'active-link' : ''}`} to="/saved-movies" >Сохранённые фильмы</NavLink>
                        <div className="navigation__profile">
                            <NavLink className="navigation__navlink" to="/profile" >
                                <span className="navigation__account">Аккаунт</span>
                            </NavLink>
                            <button className="navigation__menu-button" type="button" />
                        </div>
                    </div>

                    <div className="menu-burger" onClick={onBurgerClick}>
                        <span></span>
                    </div>

                </>
            }
        </nav >
    );
}

export default Navigation;