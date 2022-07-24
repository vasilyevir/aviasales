export function getActualTime(timeStamp: Date, type: string) {
  const actualTime = new Date(timeStamp)
    .toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' })
    .split(' ')[0];
  if (type === 'flightTime') {
    return actualTime.split(':').join('ч ') + 'м';
  }
  return actualTime;
}

export function numWord(value: number, words: Array<string>): string {
  value = Math.abs(value) % 100;
  let num = value % 10;

  if (value > 10 && value < 20) return words[2];

  if (num > 1 && num < 5) return words[1];

  if (num == 1) return words[0];

  return words[2];
}
