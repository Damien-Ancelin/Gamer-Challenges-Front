import { Helmet } from 'react-helmet-async';
import ChallengeCard from '../../components/ChallengeCard/ChallengeCard';

export default function UserChallengesPage() {
  const username = 'JoeMaker';
  return (
    <>
      <Helmet>
        <title>Challenges de {username} | Gamer Challenges</title>
        <meta
          name="description"
          content="Découvrez les défis relevés par cet utilisateur, visionnez ses vidéos, et votez pour ses meilleures performances sur Gamer Challenges."
        />
        <meta
          property="og:title"
          content="Challenges de l'utilisateur | Gamer Challenges"
        />
        <meta
          property="og:description"
          content="Explorez les challenges auxquels cet utilisateur a participé et soutenez ses exploits en votant pour ses vidéos."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://www.gamerchallenges.com/challenges/utilisateur"
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
        <h1 className="challenges-page__title">mes challenges</h1>
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
