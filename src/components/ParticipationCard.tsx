export default function ParticipationCard() {
  const youtubeURL = 'https://www.youtube.com/watch?v=q7iKIz1SXpU';
  const youtubeVideoId = youtubeURL.split('v=')[1];
  // const youtubeEmbedURL = `https://www.youtube.com/embed/${youtubeVideoId}`;
  const youtubeThumbnailURL120x90 = `https://img.youtube.com/vi/${youtubeVideoId}/default.jpg`;
  const youtubeThumbnailURL320x180 = `https://img.youtube.com/vi/${youtubeVideoId}/mqdefault.jpg`;
  // const youtubeThumbnailURL480x360 = `https://img.youtube.com/vi/${youtubeVideoId}/hqdefault.jpg`;

  return (
    <article className="participation-card yellow-border">
      <div className="participation-card__content">
        <div className="participation-card__content__image">
          <img
            className="participation-card__content__image-main"
            src={youtubeThumbnailURL120x90}
            srcSet={`${youtubeThumbnailURL120x90} 125w, ${youtubeThumbnailURL320x180} 320w`}
            sizes="(max-width: 768px) 125px, (max-width: 1440px) 320px"
            alt="Illustration du défi CELESTE ANY %"
            loading="lazy"
          />
          <button
            className="participation-card__content__image-button button button--purple-border"
            type="button"
          >
            voir la vidéo
          </button>
        </div>

        <div className="participation-card__content__details-container">
          <div className="participation-card__content__details__header">
            <header className="participation-card__content__details__header-container">
              <h3 className="participation-card__content__details__header-title">
                celest any %
              </h3>
              <span className="label participation-card__content__details__header-owner">
                joemaker95
              </span>
            </header>
            <div className="participation-card__content__details__infos">
              <p className="participation-card__content__details__infos-game">
                jeu : celeste
              </p>
              <p className="participation-card__content__details__infos-category">
                catégorie : speedrun
              </p>
              <p className="participation-card__content__details__infos-level">
                niveau : très difficile
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
