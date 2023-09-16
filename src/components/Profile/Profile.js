import './Profile.css';
import { useState, useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import mainApi from '../../utils/MainApi';
import handleError from '../../utils/HandleError';

const Profile = ({ handleSignOut, setCurrentUser }) => {

    const [isAble, setIsAble] = useState(true);
    const [isHidden, setIsHidden] = useState(false);
    const currentUser = useContext(CurrentUserContext);
    const [name, setName] = useState(currentUser.name);
    const [email, setEmail] = useState(currentUser.email);
    const [serverError, setServerError] = useState(true);

    function handleSubmit(e) {
        console.log(name);
        console.log(email);
        e.preventDefault();
        setIsAble(!isAble);
        setIsHidden(!isHidden);
        mainApi.updateUser({ name, email })
            .then((res) => {
                setName(res.name);
                setEmail(res.email);
                setCurrentUser(res);
                setServerError('Сохранение прошло успешно!');
            })
            .catch((err) => {
                setServerError(handleError(err, '/profile'));
            });
    }

    function handleNameChange(e) {
        const value = e.target.value;
        setName(value);
    }

    function handleEmailChange(evt) {
        const value = evt.target.value;
        setEmail(value);

    }

    function handleEditClick(e) {
        e.preventDefault();
        setIsAble(!isAble);
        setIsHidden(!isHidden);
    }

    function handleSaveClick(e) {
        e.preventDefault();
        setIsAble(!isAble);
        setIsHidden(!isHidden);
    }

    useEffect(() => {
        setName(currentUser.name);
        setEmail(currentUser.email);
        console.log(currentUser)
    }, [currentUser])

    useEffect(() => {
        setServerError('');
    }, [])

    return (
        <main className="profile">
            <section className="profile__container">

                <h1 className="profile__title">{`Привет, ${name || localStorage.getItem('user').name}`}</h1>
                <form className="profile__form" onSubmit={handleSaveClick}>
                    <fieldset className="profile__info">
                        <div className="profile__container-form">
                            <label className="profile__label">Имя</label>
                            <input
                                className="profile__input"
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Имя"
                                minLength="2"
                                maxLength="30"
                                value={name || ''}
                                required
                                disabled={isAble}
                                onChange={handleNameChange}
                            ></input>
                        </div>
                        <div className="profile__container-form">
                            <label className="profile__label">E-mail</label>
                            <input
                                className="profile__input"
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Email"
                                value={email || ''}
                                disabled={isAble}
                                required
                                onChange={handleEmailChange}
                            ></input>
                        </div>

                    </fieldset>
                    <div className="profile__buttons" >
                        <p className="profile__error">{serverError}</p>
                        <button className="profile__edit-button" type='button' onClick={handleEditClick} hidden={isHidden}>Редактировать</button>
                        <NavLink className="profile__signout-button" hidden={isHidden} to='/' onClick={handleSignOut}>Выйти из аккаунта</NavLink>
                    </div>
                    <button className="profile__save-button" type='submit' onClick={handleSubmit} hidden={!isHidden}>Сохранить</button>
                </form>
            </section>


        </main>

    );
}

export default Profile;