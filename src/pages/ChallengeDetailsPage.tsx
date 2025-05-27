import { Helmet } from 'react-helmet-async';

import altImg240 from '@/assets/images/alt-240px.webp';
import { useState } from 'react';
import HandleParticipation from '../components/ChallengeDetailsPage/HandleParticipation';
import VoteChallenge from '../components/ChallengeDetailsPage/VoteChallenge';
import ProgressBar from '../components/ProgressBar';
import { useAuth } from '../contexts/AuthContext';
import StatusLabel from '../ui/StatusLabel';

export default function ChallengesDetailsPage() {
  const [rating, setRating] = useState<number>(1);
  const [isVoted, setIsVoted] = useState<boolean>(false);

  // ! Mockdata pour les données reçu de l'API par la suite
  const { isAuthenticated } = useAuth();
  const isOwner = false;
  const isAlreadyParticipating = false;

  return (
    <>
      <Helmet>
        <title>Détails du Challenge God of War No Hit | Gamer Challenges</title>
        <meta
          name="description"
          content="Explorez les détails du challenge God of War, relevez le défi et partagez vos exploits avec la communauté sur Gamer Challenges."
        />
        <meta
          property="og:title"
          content="Détails du Challenge | Gamer Challenges"
        />
        <meta
          property="og:description"
          content="Découvrez les règles, les participants et les vidéos du challenge God of War. Participez et gagnez en popularité grâce aux votes de la communauté."
        />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content="https://www.gamerchallenges.com/challenges/1"
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
      {/* Section de la page */}
      <section className="challenge-details-page">
        <h1 className="challenge-details-page__title">Challenge</h1>
        <h2 className="challenge-details-page__sub-title">God of War No Hit</h2>
        <div className="challenge-details-page__content">
          <aside className="challenge-details-page__aside">
            <img
              className="challenge-details-page__aside__image"
              src={altImg240}
              alt="illustration du défi God of War no hit"
              srcSet={`${altImg240} 240w`}
              loading="lazy"
            />
            <div className="challenge-details-page__aside__infos">
              <p className="challenge-details-page__aside__infos-game">
                jeu : god of war
              </p>
              <p className="challenge-details-page__aside__infos-category">
                catégorie : performance
              </p>
              <p className="challenge-details-page__aside__infos-level">
                niveau : difficile
              </p>
            </div>
            <div className="challenge-details-page__aside__rating-container">
              <p
                className="challenge-details-page__aside__rating"
                aria-label="note en pourcentage du challenge"
              >
                45%
              </p>
              <ProgressBar rating={45} />
            </div>
            <p className="challenge-details-page__aside__participations">
              42 participations
            </p>
            <StatusLabel status="open" />
          </aside>
          <div className="challenge-details-page__articles">
            <article className="challenge-details-page__article">
              <h3 className="challenge-details-page__article__title">
                description
              </h3>
              <p className="challenge-details-page__article__description">
                Le défi "No Hit" dans God of War est une épreuve de maîtrise et
                de patience. Le but est simple : terminer le jeu sans encaisser
                un seul coup de la part des ennemis. Ce challenge mettra à
                l'épreuve vos réflexes, votre stratégie, et votre connaissance
                du jeu. Seuls les plus habiles parviendront à traverser les
                batailles et les environnements les plus ardus sans jamais être
                touchés. En outre, ce challenge vous permet de découvrir le jeu
                sous un autre angle, en choisissant le chemin de la prudence et
                de la précision. Serez-vous capable de prouver que vous êtes le
                maître absolu de la guerre sans subir de blessures ?
              </p>
            </article>
            <article className="challenge-details-page__article">
              <h3 className="challenge-details-page__article__title">règles</h3>
              <p className="challenge-details-page__article__description">
                1 - Aucun dégât : Ne pas subir de dégâts de la part des ennemis.
                Si Kratos prend des dégâts, le défi est échoué. 2 - Difficulté :
                Choisissez la difficulté souhaitée, mais il est recommandé de
                jouer en mode normal ou supérieur. 3 - Objets de soin : Vous
                pouvez utiliser des objets de soin, mais ne soyez pas touché
                après leur utilisation. 4 - Sauvegarde : Vous pouvez
                sauvegarder, mais chargez uniquement avant un combat difficile.
                5 - Preuve : Une vidéo ou une capture d'écran montrant l'absence
                de dégâts est requise pour valider le défi. 6 - Pas de triche :
                Aucun mod, cheat code ou outil de triche autorisé. 7 - Mode New
                Game+ : Ne pas utiliser de New Game+.
              </p>
            </article>
          </div>
        </div>
        <HandleParticipation
          isOwner={isOwner}
          isAlreadyParticipating={isAlreadyParticipating}
          isAuthenticated={isAuthenticated}
        />
        {!isVoted && isAuthenticated && !isOwner && (
          <VoteChallenge
            rating={rating}
            setRating={setRating}
            setIsVoted={setIsVoted}
          />
        )}
      </section>
    </>
  );
}
