export default function converter(string: String) {
  if (!string) return "";
  let decimal = 0;
  let exponent = 0;
  for (let i = string.length - 1; i >= 0; i--) {
    let position = Number(string[i]);
    decimal += position * 2 ** exponent;
    exponent++;
  }
  return decimal.toString();
}
