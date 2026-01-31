// helpers.js

export function modPow(base, exp, mod) {
  let result = 1n;
  base = base % mod;

  while (exp > 0n) {
    if (exp % 2n === 1n) result = (result * base) % mod;
    exp >>= 1n;
    base = (base * base) % mod;
  }
  return result;
}

export function modInverse(a, m) {
  let [t, newT] = [0n, 1n];
  let [r, newR] = [m, a];

  while (newR !== 0n) {
    const q = r / newR;
    [t, newT] = [newT, t - q * newT];
    [r, newR] = [newR, r - q * newR];
  }

  if (r !== 1n) {
    throw new Error("Inverse does not exist");
  }

  if (t < 0n) t += m;
  return t;
}

export function gcd(a, b) {
  while (b !== 0n) {
    [a, b] = [b, a % b];
  }
  return a;
}

