import './ErrorPage.css';
import { NavLink } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <main className="error-page">
            <section className="error-page__box">
                <h1 className="error-page__title">404</h1>
                <p className="error-page__text">Страница не найдена</p>
            </section>
            <NavLink to="/" className="error-page__link">Назад</NavLink>
        </main>
    );
};

export default ErrorPage;