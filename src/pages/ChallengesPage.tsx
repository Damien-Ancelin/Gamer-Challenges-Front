import { Helmet } from 'react-helmet-async';
import ChallengeCard from '../components/ChallengeCard';

export default function ChallengesPage() {
  return (
    <>
      <Helmet>
        <title>Challenges | Gamer Challenges</title>
        <meta
          name="description"
          content="Découvrez les meilleurs challenges, partagez vos exploits en vidéo et grimpez dans les classements grâce aux votes de la communauté sur Gamer Challenges."
        />
        <meta property="og:title" content="Challenges | Gamer Challenges" />
        <meta
          property="og:description"
          content="Participez à des challenges passionnants, partagez vos vidéos et gagnez en popularité grâce aux votes de la communauté."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://www.gamerchallenges.com/challenges"
        />
        <link
          rel="preload"
          as="image"
          href="/assets/svg/logo.svg"
          type="image/svg+xml"
        />
        <link
          rel="preload"
          as="image"
          href="/assets/svg/progressBar/0-20.svg"
          type="image/svg+xml"
        />
        <link
          rel="preload"
          as="image"
          href="/assets/svg/progressBar/21-40.svg"
          type="image/svg+xml"
        />
        <link
          rel="preload"
          as="image"
          href="/assets/svg/progressBar/41-60.svg"
          type="image/svg+xml"
        />
        <link
          rel="preload"
          as="image"
          href="/assets/svg/progressBar/61-80.svg"
          type="image/svg+xml"
        />
        <link
          rel="preload"
          as="image"
          href="/assets/svg/progressBar/81-100.svg"
          type="image/svg+xml"
        />
      </Helmet>
      <section className="challenges-page">
        <h1 className="challenges-page__title">Challenges</h1>
        <ChallengeCard />
        <ChallengeCard />
        <ChallengeCard />
        <ChallengeCard />
        <ChallengeCard />
        <ChallengeCard />
        <ChallengeCard />
        <ChallengeCard />
      </section>
    </>
  );
}
