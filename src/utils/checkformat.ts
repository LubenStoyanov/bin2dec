export const checkFormat = (string: string) => {
  if (string.length === 0) return "Input required.";
  if (string.length > 8) return "Input of maximal 8 digits required.";

  if (!/^\d+$/.test(string)) return "Digits required.";

  for (let i = 0; i < string.length; i++) {
    if (parseInt(string[i]) !== 0 && parseInt(string[i]) !== 1) {
      return "0 and 1 as digits required.";
    }
  }

  return null;
};
