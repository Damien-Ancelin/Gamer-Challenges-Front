import { useEffect, useState } from "react";

export default function Loader() {
  const [visiblePaths, setVisiblePaths] = useState<number>(0);

  const colors = ["#3A91FF", "#8A00FF", "#FF2DCB", "#FFAD33", "#FF6A00"];

  useEffect(() => {
    const interval = setInterval(() => {
      setVisiblePaths((prev) => (prev < colors.length ? prev + 1 : 1));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loader">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 77 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-labelledby="loaderTitle"
        className="loader-svg"
      >
        <title id="loaderTitle">Animation de chargement colorée</title>
        {visiblePaths >= 1 && (
          <path d="M25 5H16.1304L7 22H15.8696L25 5Z" fill="#3A91FF" />
        )}
        {visiblePaths >= 2 && (
          <path d="M36 5H27.1304L18 22H26.8696L36 5Z" fill="#8A00FF" />
        )}
        {visiblePaths >= 3 && (
          <path d="M47 5H38.1304L29 22H37.8696L47 5Z" fill="#FF2DCB" />
        )}
        {visiblePaths >= 4 && (
          <path d="M58 5H49.1304L40 22H48.8696L58 5Z" fill="#FFAD33" />
        )}
        {visiblePaths >= 5 && (
          <path d="M69 5H60.1304L51 22H59.8696L69 5Z" fill="#FF6A00" />
        )}
        <path
          d="M76 1H14.1969L1 25H63.7178L76 1Z"
          stroke={`url(#paint0_linear_${visiblePaths})`}
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
                  visiblePaths === index + 1 ? color : "rgba(0, 0, 0, 0.1)"
                }
              />
            </linearGradient>
          ))}
        </defs>
      </svg>
    </div>
  );
}
