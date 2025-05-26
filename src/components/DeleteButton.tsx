interface DeleteButtonProps {
  isActivatedDelete: boolean;
  setIsActivatedDelete: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DeleteButton({
  isActivatedDelete,
  setIsActivatedDelete,
}: DeleteButtonProps) {
  return (
    <>
      {!isActivatedDelete && (
        <button
          type="button"
          className="button button--blue-border onClick"
          onClick={() => setIsActivatedDelete(true)}
        >
          supprimer mon compte
        </button>
      )}

      {isActivatedDelete && (
        <button type="button" className="button button--alert-border onClick">
          action irréversible
        </button>
      )}
    </>
  );
}
