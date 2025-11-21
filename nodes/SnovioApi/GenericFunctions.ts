export const splitString = (input: string | undefined): string[] | undefined => {
  if (!input) return undefined;
  const arr =  input.trim().split(/[,|]/g);
  return arr.length ? arr : undefined;
}
