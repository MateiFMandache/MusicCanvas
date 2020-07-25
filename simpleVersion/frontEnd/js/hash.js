// A simple hash function is implemented. This hash doesn't need to be
// cryptographically secure, as it's main purpose is to give a unique
// identifier to each track json file.

function hash(string) {
  // choose a fairly large multiplier and very large modulus such that
  // multiplier * modulus < 2^53-1, the max safe integer.
  const modulus = 2 ** 44
  const multiplier = 313
  let value = 1
  // algorithm: multiply start value by multiplier, then
  // add on next character's code value. Finally, divide by modulus.
  let stringLength = string.length;
  for (let i = 0; i < stringLength; i++) {
    value = (value * multiplier + string.charCodeAt(i)) % modulus
  }
  return value.toString(16);
}
