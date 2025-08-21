import DOMPurify from 'dompurify';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import type { ChallengeCard as TChallengeCard } from '../../@types';

import { useErrorHandler } from '../../components/ErrorHandlerComponent';
import { api } from '../../services/api';

import Loader from '../../ui/Loader';

export default function UpdateChallengePage() {
  // Hook
  const navigate = useNavigate();
  const handleError = useErrorHandler();
  const { challengeId } = useParams();

  // State
  const [isLoading, setIsLoading] = useState(false);
  const [challenDataIsLoading, setChallenDataIsLoading] = useState(true);
  const [fileChallengeImage, setFileChallengeImage] = useState<File | null>(
    null,
  );

  // State for fetching data for the form
  const [currentChallenge, setCurrentChallenge] =
    useState<TChallengeCard | null>(null);
  const [games, setGames] = useState<Array<{ id: number; name: string }>>([]);
  const [categories, setCategories] = useState<
    Array<{ id: number; name: string }>
  >([]);
  const [levels, setLevels] = useState<Array<{ id: number; name: string }>>([]);

  // State for form data
  const [formChallengeData, setFormChallengeData] = useState({
    name: '',
    gameId: '',
    categoryId: '',
    levelId: '',
    description: '',
    rules: '',
    isOpen: false,
  });

  // * Get Challenge Data for select inputs
  useEffect(() => {
    const getChallengeData = async () => {
      try {
        const data = await api.getCreateChallengeData();
        if (data) {
          const { dataValues } = data;
          if (dataValues) {
            setGames(dataValues.games);
            setCategories(dataValues.categories);
            setLevels(dataValues.levels);

            if (!challengeId) {
              setFormChallengeData((prev) => ({
                ...prev,
                gameId: dataValues.games[0]?.id.toString() || '',
                categoryId: dataValues.categories[0]?.id.toString() || '',
                levelId: dataValues.levels[0]?.id.toString() || '',
              }));
            }
          }
        }
      } catch (error) {
        if (error instanceof Error) {
          await handleError(error);
        }
      } finally {
        setChallenDataIsLoading(false);
      }
    };
    getChallengeData();
  }, [handleError, challengeId]);

  // * Get current challenge data
  useEffect(() => {
    setIsLoading(true);
    if (!challengeId) {
      return;
    }

    const fetchChallenge = async () => {
      try {
        const data = await api.getChallengeById(challengeId);
        if (data) {
          setFormChallengeData({
            name: data.challenge.name,
            gameId: data.challenge.gameId.toString(),
            categoryId: data.challenge.categoryId.toString(),
            levelId: data.challenge.levelId.toString(),
            description: data.challenge.description,
            rules: data.challenge.rules,
            isOpen: data.challenge.isOpen,
          });
          setCurrentChallenge(data.challenge);
        }
      } catch (error) {
        if (error instanceof Error) {
          await handleError(error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchChallenge();
  }, [handleError, challengeId]);

  const handleUpdatedChallenge = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const name = formData.get('name') as string;
    const gameId = formData.get('gameId') as string;
    const categoryId = formData.get('categoryId') as string;
    const levelId = formData.get('levelId') as string;
    const description = formData.get('description') as string;
    const rules = formData.get('rules') as string;
    const isOpen = formData.get('isOpen');
    const challengeImage = fileChallengeImage || null;

    if (
      typeof name !== 'string' ||
      typeof gameId !== 'string' ||
      typeof categoryId !== 'string' ||
      typeof levelId !== 'string' ||
      typeof description !== 'string' ||
      typeof rules !== 'string' ||
      (challengeImage !== null && !(challengeImage instanceof File))
    ) {
      await handleError(new Error('Les données du formulaire sont invalides. Vérifiez vos informations.'));
      setIsLoading(false);
      return;
    }

    const sanitizedName = DOMPurify.sanitize(name);
    const sanitizedDescription = DOMPurify.sanitize(description);
    const sanitizedRules = DOMPurify.sanitize(rules);
    const sanitizedGameId = DOMPurify.sanitize(gameId);
    const sanitizedCategoryId = DOMPurify.sanitize(categoryId);
    const sanitizedLevelId = DOMPurify.sanitize(levelId);
    const sanitizedIsOpen = isOpen === 'on' || isOpen === 'true';

    const verifiedFormData = new FormData();
    verifiedFormData.append('name', sanitizedName);
    verifiedFormData.append('gameId', sanitizedGameId);
    verifiedFormData.append('categoryId', sanitizedCategoryId);
    verifiedFormData.append('levelId', sanitizedLevelId);
    verifiedFormData.append('description', sanitizedDescription);
    verifiedFormData.append('rules', sanitizedRules);
    verifiedFormData.append('isOpen', String(sanitizedIsOpen));
    if (challengeImage) {
      verifiedFormData.append('challengeImage', challengeImage);
    }

    try {
      const data = await api.updateChallenge(
        Number(challengeId),
        verifiedFormData,
      );
      if (data) {
        navigate(`/challenges/${data.challengeId}`);
      }
    } catch (error) {
      if (error instanceof Error) {
        await handleError(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteChallenge = async () => {
    setIsLoading(true);
    if (!challengeId) {
      await handleError(
        new Error('Aucun ID de défi fourni pour la suppression.'),
      );
      setIsLoading(false);
      return;
    }

    try {
      const data = await api.deleteChallenge(Number(challengeId));
      if (data) {
        toast.success(data.message);
        navigate('/compte/challenges-by-me');
      }
    } catch (error) {
      if (error instanceof Error) {
        await handleError(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Modifier un challenge | Gamer Challenges</title>
        <meta name="description" content="Modifier votre défi" />
        <meta
          property="og:title"
          content="Modifier un défi | Gamer Challenges"
        />
        <meta property="og:description" content="Modifier votre défi" />
      </Helmet>
      <section className="update-challenge-page">
        <h1 className="update-challenge-page__title">modifier un challenge</h1>
        <h2>{formChallengeData.name}</h2>
        {!challenDataIsLoading ? (
          <article className="update-challenge-page__content">
            <form
              onSubmit={handleUpdatedChallenge}
              className="update-challenge-page__form form"
            >
              <div className="update-challenge-page__form__input-container">
                <div className="update-challenge-page__form__game-infos">
                  <div className="form__entry">
                    {currentChallenge?.challengeImage && (
                      <img
                        className="update-challenge-page__image"
                        src={
                          currentChallenge.challengeImage.toString() as string
                        }
                        alt={`illustration du défi ${formChallengeData.name}`}
                        srcSet={`${
                          currentChallenge.challengeImage.toString() as string
                        } 240w`}
                        width="240"
                        height="240"
                        loading="lazy"
                      />
                    )}

                    <label className="form--label" htmlFor="name">
                      nom du challenge
                    </label>
                    <input
                      id="name"
                      name="name"
                      title="Nom du challenge"
                      placeholder="God of war no Hit"
                      className="input input--border"
                      type="text"
                      value={formChallengeData.name}
                      onChange={(e) =>
                        setFormChallengeData({
                          ...formChallengeData,
                          name: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="form__entry">
                    <label className="form--label" htmlFor="gameId">
                      nom du jeu
                    </label>
                    <select
                      id="gameId"
                      name="gameId"
                      title="Nom du jeu"
                      className="input input--border select"
                      value={formChallengeData.gameId}
                      onChange={(e) =>
                        setFormChallengeData({
                          ...formChallengeData,
                          gameId: e.target.value,
                        })
                      }
                    >
                      <option
                        className="select__option select__option--disabled label"
                        value="Jeux disponibles"
                        disabled
                      >
                        Jeux disponibles
                      </option>
                      {games && games.length > 0 ? (
                        games.map((game) => (
                          <option
                            className="select__option"
                            key={game.id}
                            value={game.id}
                          >
                            {game.name}
                          </option>
                        ))
                      ) : (
                        <option className="select__option" value="">
                          Aucun jeu disponible
                        </option>
                      )}
                    </select>
                  </div>

                  <div className="form__entry">
                    <label className="form--label" htmlFor="categoryId">
                      catégorie
                    </label>
                    <select
                      id="categoryId"
                      name="categoryId"
                      title="Catégorie du challenge"
                      className="input input--border select"
                      value={formChallengeData.categoryId}
                      onChange={(e) =>
                        setFormChallengeData({
                          ...formChallengeData,
                          categoryId: e.target.value,
                        })
                      }
                    >
                      <option
                        className="select__option select__option--disabled label"
                        value="Catégories disponibles"
                        disabled
                      >
                        Catégories disponibles
                      </option>
                      {categories && categories.length > 0 ? (
                        categories.map((category) => (
                          <option
                            className="select__option"
                            key={category.id}
                            value={category.id}
                          >
                            {category.name}
                          </option>
                        ))
                      ) : (
                        <option className="select__option" value="">
                          Aucune catégorie disponible
                        </option>
                      )}
                    </select>
                  </div>

                  <div className="form__entry">
                    <label className="form--label" htmlFor="levelId">
                      niveau
                    </label>
                    <select
                      id="levelId"
                      name="levelId"
                      title="Niveau du challenge"
                      className="input input--border select"
                      value={formChallengeData.levelId}
                      onChange={(e) =>
                        setFormChallengeData({
                          ...formChallengeData,
                          levelId: e.target.value,
                        })
                      }
                    >
                      <option
                        className="select__option select__option--disabled label"
                        value="Niveaux disponibles"
                        disabled
                      >
                        Difficultés disponibles
                      </option>
                      {levels && levels.length > 0 ? (
                        levels.map((level) => (
                          <option
                            className="select__option"
                            key={level.id}
                            value={level.id}
                          >
                            {level.name}
                          </option>
                        ))
                      ) : (
                        <option className="select__option" value="">
                          Aucun niveau disponible
                        </option>
                      )}
                    </select>
                  </div>

                  <div className="form__entry">
                    <label className="form--label" htmlFor="challengeImage">
                      {fileChallengeImage
                        ? 'modifier image du challenge ?'
                        : 'image du challenge'}
                    </label>
                    <input
                      id="challengeImage"
                      name="challengeImage"
                      placeholder="********"
                      className="input input--file"
                      type="file"
                      accept="image/png, image/jpeg, image/webp"
                      onChange={(event) => {
                        const file = event.target.files?.[0] || null;
                        setFileChallengeImage(file);
                      }}
                    />
                  </div>

                  <div className="form__entry form--checkbox">
                    <label className="form--label" htmlFor="isOpen">
                      Ouvrir le challenge ?
                    </label>
                    <input
                      id="isOpen"
                      name="isOpen"
                      title="Challenge état ouvert ou fermé"
                      className="input--border input--checkbox"
                      type="checkbox"
                      checked={formChallengeData.isOpen}
                      onChange={(e) =>
                        setFormChallengeData({
                          ...formChallengeData,
                          isOpen: e.target.checked,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="update-challenge-page__form__challenge-infos">
                  <div className="form__entry">
                    <label className="form--label" htmlFor="description">
                      description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      title="Description du challenge"
                      placeholder="Décrivez votre challenge"
                      className="textarea textarea--border"
                      value={formChallengeData.description}
                      onChange={(e) =>
                        setFormChallengeData({
                          ...formChallengeData,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form__entry">
                    <label className="form--label" htmlFor="rules">
                      règles
                    </label>
                    <textarea
                      id="rules"
                      name="rules"
                      title="Règles du challenge"
                      placeholder="Indiquez les règles du challenge"
                      className="textarea textarea--border"
                      value={formChallengeData.rules}
                      onChange={(e) =>
                        setFormChallengeData({
                          ...formChallengeData,
                          rules: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="update-challenge-page__form__button-container">
                {!isLoading ? (
                  <>
                    <button
                      type="button"
                      className="button button--blue-border"
                      title="Annuler la création du challenge"
                      aria-label="Annuler la création du challenge"
                      onClick={() => {
                        navigate(-1);
                      }}
                    >
                      annuler
                    </button>
                    <button
                      type="submit"
                      className="button button--success-border"
                      title="Créer le challenge"
                      aria-label="Créer le challenge"
                    >
                      modifier le challenge
                    </button>
                    <button
                      type="button"
                      className="button button--alert-border"
                      title="Créer le challenge"
                      aria-label="Créer le challenge"
                      onClick={handleDeleteChallenge}
                    >
                      supprimer le challenge
                    </button>
                  </>
                ) : (
                  <Loader />
                )}
              </div>
            </form>
          </article>
        ) : (
          <Loader />
        )}
      </section>
    </>
  );
}
