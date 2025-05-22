import DashboardChallengeCard from '../../components/DashBoard/DashboardChallengeCard';
import ParticipationCard from '../../components/ParticipationCard';

export default function DashBoard() {
  return (
    <section className="dashboard">
      <h1 className="dashboard__title">Dashboard</h1>
      <section className="dashboard__challenges">
        <h2 className="dashboard__challenges__title">Mes challenges</h2>
        <DashboardChallengeCard />
        <DashboardChallengeCard />
        <DashboardChallengeCard />
        <DashboardChallengeCard />
        <div className="dashboard__challenges__button-container">
          <button type="button" className="button button--blue-border">
            créer un challenge
          </button>
          <button type="button" className="button button--blue-border">
            voir tous mes challenges
          </button>
        </div>
      </section>
      <section className="dashboard__participations">
        <h2 className="dashboard__participations__title">Mes participations</h2>
        <ParticipationCard />
        <ParticipationCard />
        <ParticipationCard />
      </section>
      <section className="dashboard__profil">
        <h2 className="dashboard__profil__title">Mon profil</h2>
      </section>
    </section>
  );
}
