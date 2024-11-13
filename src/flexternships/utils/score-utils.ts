/**
 * Utility to get label based on (x/5) scores
 * @param score - The score value as type number
 * @returns The label as string
 */
export function getScoreLabel(score: number): string {
  if (score >= 0 && score < 1) return 'Poor';
  else if (score >= 1 && score < 2) return 'Below Average';
  else if (score >= 2 && score < 3) return 'Average';
  else if (score >= 3 && score < 4) return 'Above Average';
  else return 'Excellent';
}
