// elgamal-signature.js

import { modPow, modInverse, gcd } from "./helpers.js";

/* =========================
   ELGAMAL PARAMETERS
========================= */
const p = 467n;       // prime modulus
const g = 2n;         // generator
const x = 127n;       // private key
const y = modPow(g, x, p); // public key

/* =========================
   SIGN
========================= */
function elgamalSign(messageHash) {
  const h = BigInt(messageHash);

  let k;
  do {
    k = BigInt(Math.floor(Math.random() * Number(p - 2n)) + 1);
  } while (gcd(k, p - 1n) !== 1n);

  const r = modPow(g, k, p);
  const kInv = modInverse(k, p - 1n);

  const s = (kInv * (h - x * r)) % (p - 1n);

  return {
    r,
    s: (s + (p - 1n)) % (p - 1n),
  };
}

/* =========================
   VERIFY
========================= */
function elgamalVerify(messageHash, signature) {
  const h = BigInt(messageHash);
  const { r, s } = signature;

  const left = modPow(g, h, p);
  const right =
    (modPow(y, r, p) * modPow(r, s, p)) % p;

  return left === right;
}

/* =========================
   DEMO
========================= */
const messageHash = 123n; // pretend hash

const signature = elgamalSign(messageHash);
console.log("ElGamal Signature:", signature);

const isValid = elgamalVerify(messageHash, signature);
console.log("Valid Signature?", isValid);

