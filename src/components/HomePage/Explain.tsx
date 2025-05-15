export default function Explain() {
  return (
    <section className="how-it-works">
      <h2>comment participer ?</h2>
      <div className="how-it-works__content">
        <article className="how-it-works__content__item how-it-works__content__item--purple-border">
          <h3 className="how-it-works__content__item__title">
            choisis ton challenge
          </h3>
          <button className="button button--purple-border" type="button">
            voir les challenges
          </button>
        </article>
        <article className="how-it-works__content__item how-it-works__content__item--orange-border">
          <h3 className="how-it-works__content__item__title">
            partage ta vidéo pour le valider
          </h3>
          <button className="button button--orange-border" type="button">
            voir les participations
          </button>
        </article>
        <article className="how-it-works__content__item how-it-works__content__item--blue-border">
          <h3 className="how-it-works__content__item__title">
            accumule les votes et domine le classment !
          </h3>
          <button className="button button--blue-border" type="button">
            voir le leaderboard
          </button>
        </article>
      </div>
    </section>
  );
}
