import { useEffect, useState } from 'react';

interface ConfirmButtonProps {
  setIsConfirmed: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ConfirmButton({ setIsConfirmed }: ConfirmButtonProps) {
  const [isDisabled, setIsDisabled] = useState(false);
  const [counter, setCounter] = useState(3);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (isDisabled && counter > 0) {
      timer = setTimeout(() => {
        setCounter((prev) => prev - 1);
      }, 1000);
    } else if (counter === 0) {
      setIsDisabled(false);
      setIsConfirmed(true);
      setCounter(3); // Reset counter for next use
    }

    return () => clearTimeout(timer); // Cleanup timeout
  }, [isDisabled, counter, setIsConfirmed]);

  const handleInitialDeleteClick = () => {
    setIsDisabled(true);
  };

  return (
    <button
      type="button"
      className={
        !isDisabled
          ? 'button button--orange-border'
          : 'button button--alert-border'
      }
      title="Cette action est irréversible, vous ne pourrez pas récupérer votre compte."
      aria-label="Confirmer la suppression de votre compte"
      disabled={isDisabled}
      onClick={() => handleInitialDeleteClick()}
    >
      {isDisabled
        ? `action irréversible... ${counter}`
        : 'supprimer mon compte ?'}
    </button>
  );
}
