import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router';
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
    <>
      <Helmet>
        <title>Mon tableau de bord | Gamer Challenges</title>
        <meta
          name="description"
          content="Consultez vos participations, gérez vos challenges et personnalisez votre profil sur GamerChallenges."
        />

        <meta
          property="og:title"
          content="Mon tableau de bord | Gamer Challenges"
        />
        <meta
          property="og:description"
          content="Consultez vos participations, gérez vos challenges et personnalisez votre profil sur GamerChallenges."
        />
        <meta property="og:image" content="/assets/images/alt-100px.webp" />
        <link
          rel="preload"
          as="image"
          href="/assets/images/alt-100px.webp"
          type="image/webp"
        />
      </Helmet>
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
            <Link to="/compte/challenges-by-me/creer-challenge">
              <button type="button" className="button button--blue-border">
                créer un challenge
              </button>
            </Link>
            <button type="button" className="button button--blue-border">
              voir tous mes challenges
            </button>
          </div>
        </section>
        <section className="dashboard__participations">
          <h2 className="dashboard__participations__title">
            Mes participations
          </h2>
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
    </>
  );
}
