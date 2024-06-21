export const extractPhotoId = (input: string): number => {
  // Split the string by spaces and get the last item
  const parts = input.trim().split(/\s+/);
  const lastPart = parts[parts.length - 1];

  // Try to parse the last part as a number
  const number = parseInt(lastPart, 10);

  // Check if the parsed result is a valid number
  // if so, return the number - 1 (zero-indexed), else return 0
  return isNaN(number) ? 0 : number - 1;
}
