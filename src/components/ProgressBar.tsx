import progressBar020 from '@/assets/svg/progressBar/0-20.svg';
import progressBar2140 from '@/assets/svg/progressBar/21-40.svg';
import progressBar4160 from '@/assets/svg/progressBar/41-60.svg';
import progressBar6180 from '@/assets/svg/progressBar/61-80.svg';
import progressBar81100 from '@/assets/svg/progressBar/81-100.svg';

interface ProgressBarProps {
  rating: number;
}

export default function ProgressBar({ rating }: ProgressBarProps) {
  const progress = Number(rating);

  const progressImages = [
    { max: 20, image: progressBar020 },
    { max: 40, image: progressBar2140 },
    { max: 60, image: progressBar4160 },
    { max: 80, image: progressBar6180 },
    { max: 100, image: progressBar81100 },
  ];

  const progressBarImage = progressImages.find(
    (progressImage) => progress <= progressImage.max,
  );

  return (
    <div className="progress-bar">
      <img
        className="progress-bar__image-mobile"
        src={progressBarImage?.image}
        alt="Progression du défi"
        loading="lazy"
      />
      <img
        className="progress-bar__image-desktop"
        src={progressBarImage?.image}
        alt="Progression du défi"
        loading="lazy"
        style={{ width: '151px', height: '47px' }}
      />
    </div>
  );
}
