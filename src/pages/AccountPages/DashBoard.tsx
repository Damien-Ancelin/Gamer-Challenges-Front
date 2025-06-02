import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router';
import type { ChallengeCard as TChallengeCard } from '../../@types';

import { useErrorHandler } from '../../components/ErrorHandlerComponent';
import { useAuth } from '../../contexts/AuthContext';
import { api } from '../../services/api';
import Loader from '../../ui/Loader';

import DashboardChallengeCard from '../../components/DashBoard/DashBoardChallengeCard/DashboardChallengeCard';
import DashBoardParticipationCard from '../../components/DashBoard/DashBoardParticipationCard';
import DashBoardProfileCard from '../../components/DashBoard/DashBoardProfileCard';

export default function DashBoard() {
  // Hooks
  const handleError = useErrorHandler();
  const { isAuthenticated } = useAuth();

  // State
  const navigate = useNavigate();
  const [userChallenges, setUserChallenges] = useState<TChallengeCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const data = await api.getUserChallenges(5, 1, 'updatedAt', 'desc');
        if (data) {
          setUserChallenges(data.challenges);
        }
      } catch (error) {
        if (error instanceof Error) {
          await handleError(error);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchChallenges();
  }, [handleError]);

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
          {!isLoading &&
            userChallenges?.map((challenge) => (
              <DashboardChallengeCard
                key={challenge.id}
                challenge={challenge}
              />
            ))}
          {isLoading && <Loader />}
          {!isLoading && userChallenges.length === 0 && (
            <h4 className="challenges-page__no-challenges">
              Vous n'avez pas encore créer de challenge.
            </h4>
          )}
          <div className="dashboard__challenges__button-container">
            <Link to="/compte/challenges-by-me/creer-challenge">
              <button type="button" className="button button--blue-border">
                créer un challenge
              </button>
            </Link>
            {!isLoading && userChallenges.length !== 0 && (
              <Link to="/compte/challenges-by-me">
                <button type="button" className="button button--blue-border">
                  voir tous mes challenges
                </button>
              </Link>
            )}
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
