import { useState } from 'react';

interface FormVideoUrlProps {
  setIsAlreadyValidated: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpenForm: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function FormVideoUrl({
  setIsAlreadyValidated,
  setIsOpenForm,
}: FormVideoUrlProps) {
  const [videoLink, setVideoLink] = useState<string>('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const video_link = formData.get('video_link');
    setIsAlreadyValidated(true);
    setIsOpenForm(false);
    setVideoLink('');
    console.log('Video link submitted:', video_link);
  };

  return (
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
  );
}
