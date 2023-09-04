import './Techs.css';

const Techs = () => {

    return (
        <section className="techs" id="tech">
            <h2 className="techs__title">Технологии</h2>

            <h3 className="techs__subtitle">7 технологий</h3>
            <p className="techs__description">На курсе веб-разработки мы освоили технологии, 
            которые применили в дипломном проекте.</p>
            <div className="techs__grid">
                <p className="techs__item">HTML</p>
                <p className="techs__item">CSS</p>
                <p className="techs__item">JS</p>
                <p className="techs__item">React</p>
                <p className="techs__item">Git</p>
                <p className="techs__item">Express.js</p>
                <p className="techs__item">mongoDB</p>
            </div>
        </section>
    );
};

export default Techs;