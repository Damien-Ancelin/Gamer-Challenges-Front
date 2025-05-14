interface BorderClass {
  max: number;
  border: string;
}

const borderClasses: BorderClass[] = [
  { max: 20, border: 'blue-border' },
  { max: 40, border: 'purple-border' },
  { max: 60, border: 'pink-border' },
  { max: 80, border: 'yellow-border' },
  { max: 100, border: 'orange-border' },
];

export function getBorderClassByRating(rating: number): string {
  const borderClass = borderClasses.find((border) => rating <= border.max);
  return borderClass ? borderClass.border : 'blue-border';
}
