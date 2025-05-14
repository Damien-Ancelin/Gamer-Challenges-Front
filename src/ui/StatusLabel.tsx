interface StatusLabelProps {
  status: 'open' | 'closed';
}

export default function StatusLabel({ status }: StatusLabelProps) {
  status === 'closed' ? 'label label--closed' : 'label label--open';
  return (
    <p
      className={
        status === 'closed' ? 'label label--closed' : 'label label--open'
      }
    >
      status === "closed" ? "fermé" : "ouvert";
    </p>
  );
}
