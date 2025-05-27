interface StatusLabelProps {
  status: boolean;
}

export default function StatusLabel({ status }: StatusLabelProps) {
  const labelClass = !status
    ? 'label status-label--closed'
    : 'label status-label--open';

  return <span className={labelClass}>{!status ? 'fermé' : 'ouvert'}</span>;
}
