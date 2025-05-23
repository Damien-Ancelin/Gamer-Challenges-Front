import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import DashBoardParticipationCard from '../../components/DashBoard/DashBoardParticipationCard';
import DashBoardProfileCard from '../../components/DashBoard/DashBoardProfileCard';
import DashboardChallengeCard from '../../components/DashBoard/DashboardChallengeCard';
import { useAuth } from '../../contexts/AuthContext';

export default function DashBoard() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return (
    <section className="dashboard">
      <h1 className="dashboard__title">Dashboard</h1>
      <section className="dashboard__profil">
        <h2 className="dashboard__profil__title">Mon profil</h2>
        <DashBoardProfileCard />
      </section>
      <section className="dashboard__challenges">
        <h2 className="dashboard__challenges__title">Mes challenges</h2>
        <DashboardChallengeCard />
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
        <DashBoardParticipationCard />
        <DashBoardParticipationCard />
        <DashBoardParticipationCard />
        <div className="dashboard__challenges__button-container">
          <button type="button" className="button button--yellow-border">
            voir toutes mes participations
          </button>
        </div>
      </section>
    </section>
  );
}
