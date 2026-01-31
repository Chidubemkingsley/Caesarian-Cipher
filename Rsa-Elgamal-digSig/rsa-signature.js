// rsa-signature.js

import crypto from "crypto";

/* =========================
   KEY GENERATION
========================= */
const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
  modulusLength: 2048,
});

/* =========================
   SIGN
========================= */
function rsaSign(message, privateKey) {
  const signer = crypto.createSign("sha256");
  signer.update(message);
  signer.end();

  return signer.sign(privateKey, "hex");
}

/* =========================
   VERIFY
========================= */
function rsaVerify(message, signature, publicKey) {
  const verifier = crypto.createVerify("sha256");
  verifier.update(message);
  verifier.end();

  return verifier.verify(publicKey, signature, "hex");
}

/* =========================
   DEMO
========================= */
const message = "Hello RSA Digital Signature";

const signature = rsaSign(message, privateKey);
console.log("RSA Signature:", signature);

const isValid = rsaVerify(message, signature, publicKey);
console.log("Valid Signature?", isValid);

