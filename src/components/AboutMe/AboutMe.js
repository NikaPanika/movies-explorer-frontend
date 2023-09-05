import './AboutMe.css';
import photo from '../../images/men.jpg';
const AboutMe = () => {

    return (
        <section className="aboutme" id="aboutme">
            <h2 className="aboutme__title">Студент</h2>
            <div className="aboutme__container">
                <img className="aboutme__photo" alt="Фотография владельца страницы" src={photo} />
                <div className="aboutme__info">
                    <h3 className="aboutme__name">Виталий</h3>
                    <p className="aboutme__about">Фронтенд-разработчик, 30 лет</p>
                    <p className="aboutme__description">Я родился и живу в Саратове, 
                    закончил факультет экономики СГУ. У меня есть жена и дочь. 
                    Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. 
                    С 2015 года работал в компании «СКБ Контур». После того, 
                    как прошёл курс по веб&#8209;разработке, начал заниматься фриланс&#8209;заказами 
                    и ушёл с постоянной работы.</p>
                    <a className="aboutme__git" href='https://github.com/NikaPanika' target="_blank" rel="noreferrer">Github</a>
                </div>
            </div>
        </section>
    );
};

export default AboutMe;