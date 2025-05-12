import HeroBanner from "../../components/HeroBanner";
import { Helmet } from "react-helmet";
export default function Homepage() {
  return (
    <>
      <Helmet>
        <title>Accueil | Gamer Challenges</title>
        <meta
          name="description"
          content="GamerChallenges : relevez des défis gaming, partagez vos exploits en vidéo et grimpez dans les classements grâce aux votes de la communauté."
        />
        <meta property="og:title" content="Accueil | Gamer Challenges" />
        <meta
          property="og:description"
          content="Relevez des défis gaming, partagez vos exploits en vidéo et grimpez dans les classements grâce aux votes de la communauté."
        />
        <meta
          property="og:image"
          content="/assets/images/hero-banner_300px.webp"
        />
        <meta
          property="og:image"
          content="/assets/images/hero-banner_250px.webp"
        />
        <link
          rel="preload"
          as="image"
          href="/assets/images/hero-banner_300px.webp"
          type="image/webp"
        />
        <link
          rel="preload"
          as="image"
          href="/assets/images/hero-banner_250px.webp"
          type="image/webp"
        />
      </Helmet>
      <HeroBanner />
    </>
  );
}
