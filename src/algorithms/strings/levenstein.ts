export function levenshtein(a: string, b: string) {
  const distance: number[][] = [];
  let i;
  let j;
  for (i = 0; i <= a.length; i++) {
    distance[i] = [];
    distance[i][0] = i;
  }
  for (j = 0; j <= b.length; j++) {
    distance[0][j] = j;
  }
  for (i = 1; i <= a.length; i++) {
    for (j = 1; j <= b.length; j++) {
      distance[i][j] =
        Math.min(
          distance[i - 1][j - 1],
          distance[i - 1][j],
          distance[i][j - 1],
        ) + (a[i - 1] === b[j - 1] ? 0 : 1);
    }
  }
  return distance[a.length][b.length];
}
