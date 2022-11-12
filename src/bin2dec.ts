import invariant from "tiny-invariant";
import type { ActionData } from "./App";
export default function converter(string: ActionData) {
  if (!string?.binaryNumber) return 0;
  let decimal = 0;
  let exponent = 0;
  for (let i = string?.binaryNumber.length - 1; i >= 0; i--) {
    let position = Number(string?.binaryNumber[i]);
    decimal += position * 2 ** exponent;
    exponent++;
  }
  return decimal;
}
