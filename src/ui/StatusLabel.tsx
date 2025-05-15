interface StatusLabelProps {
  status: 'open' | 'closed';
}

export default function StatusLabel({ status }: StatusLabelProps) {
  const labelClass =
    status === 'closed'
      ? 'label status-label--closed'
      : 'label status-label--open';

  return (
    <span className={labelClass}>
      {status === 'closed' ? 'fermé' : 'ouvert'}
    </span>
  );
}
