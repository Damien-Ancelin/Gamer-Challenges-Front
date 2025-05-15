import ParticipationCard from '../ParticipationCard';

export default function LastParticipatons() {
  return (
    <section className="last-participations">
      <h2>les dernières participations</h2>
      <section className="last-participations__container">
        <ParticipationCard />
        <ParticipationCard />
        <ParticipationCard />
        <ParticipationCard />
        <ParticipationCard />
        <ParticipationCard />
      </section>
    </section>
  );
}
