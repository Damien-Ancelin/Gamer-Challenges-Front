import { useState } from 'react';

export default function RatingBar() {
  const colors = ['#3A91FF', '#8A00FF', '#FF2DCB', '#FFAD33', '#FF6A00'];
  const [rating, setRating] = useState<number>(1);

  const handleRatingMoins = () => {
    setRating((prevRating) => {
      const newRating = prevRating - 1;
      return newRating < 1 ? 5 : newRating; // Reset to 5 if it goes below 1
    });
  };

  const handleRatingPlus = () => {
    setRating((prevRating) => {
      const newRating = prevRating + 1;
      return newRating > 5 ? 1 : newRating; // Reset to 1 if it exceeds 5
    });
  };

  return (
    <div className="rating-bar">
      <div className="rating-bar__content">
        <button
          className="btn btn--blue"
          type="button"
          onClick={handleRatingMoins}
        >
          -
        </button>
        <div className="rating-bar__svg-container">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 77 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-labelledby="rating-bar title"
            className="rating-bar__svg"
          >
            <title id="rating-barTitle">Animation de chargement colorée</title>
            {rating >= 1 && (
              <path d="M25 5H16.1304L7 22H15.8696L25 5Z" fill="#3A91FF" />
            )}
            {rating >= 2 && (
              <path d="M36 5H27.1304L18 22H26.8696L36 5Z" fill="#8A00FF" />
            )}
            {rating >= 3 && (
              <path d="M47 5H38.1304L29 22H37.8696L47 5Z" fill="#FF2DCB" />
            )}
            {rating >= 4 && (
              <path d="M58 5H49.1304L40 22H48.8696L58 5Z" fill="#FFAD33" />
            )}
            {rating >= 5 && (
              <path d="M69 5H60.1304L51 22H59.8696L69 5Z" fill="#FF6A00" />
            )}
            <path
              d="M76 1H14.1969L1 25H63.7178L76 1Z"
              stroke={`url(#paint0_linear_${rating})`}
              style={{ opacity: 1 }}
            />
            <defs>
              {colors.map((color, index) => (
                <linearGradient
                  key={color}
                  id={`paint0_linear_${index + 1}`}
                  x1="1"
                  y1="13"
                  x2="76"
                  y2="13"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="rgba(0, 0, 0, 0)" stopOpacity="0" />
                  <stop
                    offset="1"
                    stopColor={
                      rating === index + 1 ? color : 'rgba(0, 0, 0, 0.1)'
                    }
                  />
                </linearGradient>
              ))}
            </defs>
          </svg>
        </div>
        <button
          className="btn btn--orange"
          type="button"
          onClick={handleRatingPlus}
        >
          +
        </button>
      </div>
    </div>
  );
}
