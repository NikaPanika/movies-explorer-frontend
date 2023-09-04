import './Footer.css';

const Footer = () => {

    return (
        <footer className="footer">
            <h2 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
            <div className="footer__container">
                <div className="footer__info">
                    <p className="footer__yandex">Яндекс.Практикум</p>
                    <p className="footer__git">Github</p>
                </div>
                <p className="footer__date">©2023</p>
            </div>
        </footer>
    );
};

export default Footer;