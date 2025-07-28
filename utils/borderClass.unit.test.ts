import { describe, expect, it } from 'vitest';
import { getBorderClassByRating } from './borderClass';

const validTestCases = [
  { rating: 10, expected: 'blue-border' },
  { rating: 30, expected: 'purple-border' },
  { rating: 50, expected: 'pink-border' },
  { rating: 70, expected: 'yellow-border' },
  { rating: 90, expected: 'orange-border' },
];

const invalidTestCases = [
  { rating: -10, expected: 'blue-border' }, // Negative rating
  { rating: 0, expected: 'blue-border' }, // Zero rating
  { rating: 110, expected: 'blue-border' }, // Above maximum rating
  { rating: 'invalid', expected: 'blue-border' }, // Non-numeric input
  { rating: null, expected: 'blue-border' }, // Null input
  { rating: undefined, expected: 'blue-border' }, // Undefined input
  { rating: {}, expected: 'blue-border' }, // Object input
  { rating: [], expected: 'blue-border' }, // Array input
  { rating: '50', expected: 'pink-border' }, // String input that is numeric
  { rating: 'fifty', expected: 'blue-border' }, // String input
];

describe('borderClass unit test', () => {
  for(const testCase of validTestCases) {
    it(`should return correct border class for rating ${testCase.rating}`, () => {
      const result = getBorderClassByRating(testCase.rating);
      expect(result).toBe(testCase.expected);
    });
  }
  for(const testCase of invalidTestCases) {
    it(`should handle invalid rating ${testCase.rating}`, () => {
      // @ts-expect-error
      const result = getBorderClassByRating(testCase.rating);
      expect(result).toBe(testCase.expected);
    });
  }
});