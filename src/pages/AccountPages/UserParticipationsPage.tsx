import { Helmet } from 'react-helmet-async';
import ParticipationCard from '../../components/ParticipationCard';

export default function UserParticipationsPage() {
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
      <section className="user-participations-pages">
        <h1 className="user-participations-pages__title">Mes participation</h1>
        <section className="user-participations-pages__container">
          <ParticipationCard />
        </section>
      </section>
    </>
  );
}
