export function genHexString(length: number) {
  let output = "";
  for (let i = 0; i < length; i++) {
    output += Math.floor(Math.random() * 16).toString(16);
  }
  return output;
}
