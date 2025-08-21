interface BorderClass {
  max: number;
  border: string;
}

// Set an array of border classes with their maximum rating values
  // Each border corresponds to a CSS class
const borderClasses: BorderClass[] = [
  { max: 20, border: 'blue-border' },
  { max: 40, border: 'purple-border' },
  { max: 60, border: 'pink-border' },
  { max: 80, border: 'yellow-border' },
  { max: 100, border: 'orange-border' },
];

export function getBorderClassByRating(rating: number): string {
  const borderClass = borderClasses.find((border) => rating <= border.max);
  // return borderClass which contains the border class for the rating
  // If no class is found, default to 'blue-border'
  return borderClass ? borderClass.border : 'blue-border';
}
