import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router';
import type {
  ChallengeCard as TChallengeCard,
  ParticipationCard as TParticipationCard,
} from '../../@types';

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
  const [userParticipations, setUserParticipations] = useState<
    TParticipationCard[]
  >([]);
  const [isChallengesLoading, setIsChallengesLoading] = useState(false);
  const [isParticipationsLoading, setIsParticipationsLoading] = useState(false);
  const [participationUpdated, setParticipationUpdated] =
    useState<boolean>(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    setIsChallengesLoading(true);
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
        setIsChallengesLoading(false);
      }
    };
    fetchChallenges();
  }, [handleError]);

  useEffect(() => {
    setIsParticipationsLoading(true);
    const fetchParticipations = async () => {
      try {
        const data = await api.getUserParticipations(3, 1, 'updatedAt', 'desc');
        if (data) {
          setUserParticipations(data.participations);
        }
      } catch (error) {
        if (error instanceof Error) {
          await handleError(error);
        }
      } finally {
        setIsParticipationsLoading(false);
        if (participationUpdated) {
          setParticipationUpdated(false);
        }
      }
    };
    fetchParticipations();
  }, [handleError, participationUpdated]);

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
          {!isChallengesLoading &&
            userChallenges?.map((challenge) => (
              <DashboardChallengeCard
                key={challenge.id}
                challenge={challenge}
              />
            ))}
          {isChallengesLoading && <Loader />}
          {!isChallengesLoading && userChallenges.length === 0 && (
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
            {!isChallengesLoading && userChallenges.length !== 0 && (
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
          {!isParticipationsLoading &&
            userParticipations?.map((participation) => (
              <DashBoardParticipationCard
                key={participation.id}
                participation={participation}
                setParticipationUpdated={setParticipationUpdated}
              />
            ))}
          {isParticipationsLoading && <Loader />}
          {!isParticipationsLoading && userParticipations.length === 0 && (
            <h4 className="user-participations-page__no-participations">
              Vous n'avez pas encore participer à un challenge.
            </h4>
          )}
          <div className="dashboard__challenges__button-container">
            <Link to="mes-participations">
              <button type="button" className="button button--yellow-border">
                voir toutes mes participations
              </button>
            </Link>
          </div>
        </section>
      </section>
    </>
  );
}
