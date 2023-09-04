import './AboutProgect.css';

const AboutProgect = () => {

  return (
    <section className="aboutprog" id="aboutprog">
      <h2 className="aboutprog__title">О проекте</h2>
      <ul className="aboutprog__info">
        <li className="aboutprog__item">
          <h3 className="aboutprog__subtitle">Дипломный проект включал 5 этапов</h3>
          <p className="aboutprog__description">Составление плана, работу над бэкендом,
            вёрстку, добавление функциональности и финальные доработки.</p>
        </li>
        <li className="aboutprog__item">
          <h3 className="aboutprog__subtitle">На выполнение диплома ушло 5 недель</h3>
          <p className="aboutprog__description">У каждого этапа был мягкий и жёсткий дедлайн,
            которые нужно было соблюдать, чтобы успешно защититься.</p>
        </li>
      </ ul>

      <div className="aboutprog__diagram">
        <div className="little-column">
          <p className="aboutprog__diagram_black">1 неделя</p>
          <p className="aboutprog__diagram_white">Back-end</p>
          
        </div>
        <div className="big-column">
        <p className="aboutprog__diagram_gray">4 недели</p>
          <p className="aboutprog__diagram_white">Front-end</p>
        </div>
      </div>
    </section>
  );
};

export default AboutProgect;