interface DeleteAccountButtonProps {
  setIsActivatedDelete: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function InitialButton({
  setIsActivatedDelete,
}: DeleteAccountButtonProps) {
  return (
    <button
      type="button"
      className="button button--blue-border"
      title="Supprimer votre compte"
      aria-label="Supprimer mon compte"
      onClick={() => setIsActivatedDelete(true)}
    >
      supprimer mon compte
    </button>
  );
}
