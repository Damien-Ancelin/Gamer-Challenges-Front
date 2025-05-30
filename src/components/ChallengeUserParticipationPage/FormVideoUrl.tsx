import DOMPurify from 'dompurify';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { api } from '../../services/api';
import Loader from '../../ui/Loader';
import { useErrorHandler } from '../ErrorHandlerComponent';

interface FormVideoUrlProps {
  setIsValidated: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpenForm: React.Dispatch<React.SetStateAction<boolean>>;
  setParticipationUpdated: React.Dispatch<React.SetStateAction<boolean>>;
  participation_id: number;
}

export default function FormVideoUrl({
  setIsValidated,
  setIsOpenForm,
  setParticipationUpdated,
  participation_id,
}: FormVideoUrlProps) {
  // Hooks
  const handleError = useErrorHandler();

  // State
  const [videoLink, setVideoLink] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const participationId = participation_id || 0;
    const formData = new FormData(event.currentTarget);
    const videoLink = formData.get('video_link');

    if (typeof videoLink !== 'string') {
      await handleError(
        new Error(
          'Validation des données échouées. Veuillez vérifier vos entrées.',
        ),
      );
      setIsLoading(false);
      return;
    }

    // Regex pattern to match YouTube video URLs
    const youtubeUrlPattern =
      /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w\-]{11}$/;
    if (!youtubeUrlPattern.test(videoLink)) {
      await handleError(
        new Error('Veuillez entrer un lien vidéo YouTube valide.'),
      );
      setIsLoading(false);
      return;
    }

    const sanitizedVideoLink = DOMPurify.sanitize(videoLink);

    try {
      const data = await api.updateUserParticipation(
        participationId,
        sanitizedVideoLink,
      );
      if (data) {
        setIsValidated(data.participation.isValidated);
        setParticipationUpdated(true);
        setIsOpenForm(false);
        setVideoLink('');
        toast.success('Votre vidéo a été soumise avec succès !');
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
      {isLoading && <Loader />}
      {!isLoading && (
        <form onSubmit={handleSubmit} className="form">
          <label className="form--label" htmlFor="video_link">
            Entrez l'url de votre vidéo
          </label>
          <input
            id="video_link"
            name="video_link"
            placeholder="https://www.youtube.com/watch?v=..."
            className="input input--border input--video"
            type="url"
            value={videoLink}
            onChange={(e) => {
              setVideoLink(e.target.value);
            }}
            required
            aria-required="true"
          />
          <div className="form--button-container">
            <div className="form--button-container__inner">
              <button type="submit" className="button button--blue-border">
                envoyer
              </button>
              <button
                type="button"
                className="button button--orange-border"
                onClick={() => setVideoLink('')}
              >
                vider le champ
              </button>
            </div>
            <button
              type="button"
              className="button button--alert-border"
              onClick={() => setIsOpenForm(false)}
            >
              annuler
            </button>
          </div>
        </form>
      )}
    </>
  );
}
