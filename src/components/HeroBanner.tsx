import heroBannerImg250 from '@/assets/images/hero-banner_250px.webp';
import heroBannerImg300 from '@/assets/images/hero-banner_300px.webp';

export default function HeroBanner() {
  return (
    <section className="hero-banner">
      <h2 id="hero-banner-title">Prêt à prouver ton skill au monde entier ?</h2>
      <div className="hero-banner__content">
        <img
          className="hero-banner__image"
          src={heroBannerImg250}
          srcSet={`${heroBannerImg250} 250w, ${heroBannerImg300} 300w`}
          sizes="(max-width: 768px) 250px, 300px"
          alt=""
          loading="lazy"
        />
        <div className="hero-banner__text-button-container">
          <p className="hero-banner__text">
            Bienvenue sur{' '}
            <strong className="hero-banner__strong">GamerChallenges</strong>, la
            plateforme où chaque joueur peut relever des défis, poster ses
            meilleures actions en vidéo, et grimper dans les classements grâce
            aux votes de la communauté. Que tu sois un speedrunner, un sniper
            d'élite ou un stratège en or, il y a un challenge pour toi.
          </p>
          <div className="hero-banner__button-container">
            <button
              className="hero-banner__button button button--yellow-border"
              type="button"
              aria-label="S'inscrire à GamerChallenges"
            >
              s'inscrire
            </button>
            <button
              className="hero-banner__button button button--orange-border"
              type="button"
              aria-label="Voir les challenges"
            >
              voir les challenges
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
