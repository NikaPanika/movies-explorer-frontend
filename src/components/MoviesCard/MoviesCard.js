import './MoviesCard.css';

function MoviesCard({
    film,
    isSaved
}) {

    return (
        <section className="card">
            <div className="card__container">
                <img className="card__image" src={film.image} alt={film.name} />
                <button className={`
                ${film.isAdd && !isSaved ? ' card__button_saved' : ''}
                ${!film.isAdd && !isSaved ? ' card__button_unsaved' : ''}
                ${isSaved ? ' card__button_remove' : ''}`
                } type="button">
                </button>
            </div>



            <div className="card__info">
                <h2 className="card__title">
                    {film.name}
                </h2>
                <p className="card__duration">
                    {film.duration}
                </p>
            </div>
        </section>
    );
}

export default MoviesCard;