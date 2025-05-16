import { useState } from 'react';
import FormVideoUrl from './FormVideoUrl';

interface HandleActionsProps {
  isAlreadyValidated: boolean;
  setIsAlreadyValidated: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function HandleActions({
  isAlreadyValidated,
  setIsAlreadyValidated,
}: HandleActionsProps) {
  const [isOpenForm, setIsOpenForm] = useState<boolean>(false);

  return (
    <div className="challenge-user-participation-page__form__container">
      {isOpenForm && (
        <FormVideoUrl
          setIsAlreadyValidated={setIsAlreadyValidated}
          setIsOpenForm={setIsOpenForm}
        />
      )}

      {!isOpenForm && !isAlreadyValidated && (
        <button
          type="button"
          className="button button--blue-border"
          onClick={() => setIsOpenForm(true)}
        >
          envoyer ma participation
        </button>
      )}

      {!isOpenForm && isAlreadyValidated && (
        <button
          type="button"
          className="button button--orange-border"
          onClick={() => setIsOpenForm(true)}
        >
          modifier ma participation
        </button>
      )}

      {!isOpenForm && (
        <button type="button" className="button button--alert-border">
          annuler ma participation
        </button>
      )}
    </div>
  );
}
