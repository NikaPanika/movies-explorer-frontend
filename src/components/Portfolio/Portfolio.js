import './Portfolio.css'
import arrow from '../../images/arrow.svg'

const Portfolio = () => {

    return (
        <section className="portfolio">
            <h1 className="portfolio__title">Портфолио</h1>
            <div className="portfolio__links">
                <a className="portfolio__link" href="https://nikapanika.github.io/how-to-learn/" target="_blank" rel="noreferrer">
                    <p className="portfolio__text">
                    Статичный сайт
                    </p>
                    <img className="portfolio__arrow" alt="стрелка" src={arrow}/>
                </a>
                <a className="portfolio__link" href="https://nikapanika.github.io/russian-travel/index.html" target="_blank" rel="noreferrer">
                    <p className="portfolio__text">
                    Адаптивный сайт
                    </p>
                    <img className="portfolio__arrow" alt="стрелка" src={arrow}/>
                </a>
                <a className="portfolio__link" href="https://mestogallery.nomoreparties.co/sign-in" target="_blank" rel="noreferrer">
                    <p className="portfolio__text">
                    Одностраничное приложение
                    </p>
                    <img className="portfolio__arrow" alt="стрелка" src={arrow}/>
                </a>
            </div>
        </section>
    );
}

export default Portfolio;