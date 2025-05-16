import { Helmet } from 'react-helmet-async';
import ParticipationCard from '../ParticipationCard';

export default function ChallengeParticipationsPage() {
  return (
    <>
      <Helmet>
        <title>Participations au challenge | Gamer Challenges</title>
        <meta
          name="description"
          content="Découvrez les vidéos des participants à ce challenge, soutenez-les avec vos votes et inspirez-vous de leurs exploits sur Gamer Challenges."
        />
        <meta
          property="og:title"
          content="Participations au challenge | Gamer Challenges"
        />
        <meta
          property="og:description"
          content="Visionnez les participations à ce challenge, votez pour vos vidéos préférées et participez à votre tour !"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://www.gamerchallenges.com/challenges/:id/participations"
        />
      </Helmet>
      <section className="challenge-participations">
        <h1 className="challenge-participations__title">participation</h1>
        <h2 className="challenge-participations__sub-title">celeste any %</h2>
        <section className="challenge-participations__container">
          <ParticipationCard />
          <ParticipationCard />
          <ParticipationCard />
          <ParticipationCard />
          <ParticipationCard />
          <ParticipationCard />
        </section>
      </section>
    </>
  );
}
