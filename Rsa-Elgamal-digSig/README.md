# A Structured Guide Using RSA And ElGamal Extention To Digital Signatures.

This repository is a **hands-on guide to digital signatures**, implemented in **clean, runnable JavaScript**.

You will learn:

* What digital signatures are
* How RSA signatures work in real systems
* How ElGamal signatures work mathematically
* How verification guarantees authenticity & integrity

This project is **educational-first**, but still **realistic and correct**.


## 📁 Project Structure

```text
digital-signatures-js/
│
├── rsa-signature.js        # RSA digital signature using Node.js crypto
├── elgamal-signature.js    # ElGamal digital signature (educational)
├── helpers.js              # Modular arithmetic helpers
└── README.md               # This guide
```

Each file is intentionally small and focused.

---

## ⚙️ Prerequisites

* Basic JavaScript knowledge
* Some familiarity with:

  * Hash functions
  * Modular arithmetic (helpful, not required)

### System Requirements

```bash
Node.js >= 16
```

Check your version:

```bash
node -v
```

---

# 🧠 Part 1 — What Is a Digital Signature?

A **digital signature** provides three guarantees:

1. **Authentication** – who signed the message?
2. **Integrity** – was the message altered?
3. **Non-repudiation** – the signer cannot deny signing

### Core Idea

> Encryption uses the **public key to encrypt**
> Digital signatures use the **private key to sign**

Verification is always done with the **public key**.

---

# 🔑 Part 2 — RSA Digital Signature (Real-World)

📄 **File:** `rsa-signature.js`

This is how **digital signatures are actually implemented in practice**.

Node.js handles:

* Secure hashing (SHA-256)
* Secure padding (RSA-PSS)
* Large integer arithmetic

You focus on **correct usage**, not fragile math.

---

## 🔐 RSA Signing Flow

1. Hash the message
2. Sign the hash using the **private key**
3. Send `(message, signature)` to the verifier

---

## ✅ RSA Verification Flow

1. Hash the received message
2. Verify the signature using the **public key**
3. Compare results

If they match → signature is valid.

---

## ▶️ Run the RSA Example

```bash
node rsa-signature.js
```

### Expected Output

```text
RSA Signature: 8f3c9d...
Valid Signature? true
```

---

## 🧠 What to Observe

* You never sign raw messages
* You never expose the private key
* Verification succeeds **only** if the message is unchanged

---

# 🧮 Part 3 — Mathematical Foundations (Helpers)

📄 **File:** `helpers.js`

Before understanding ElGamal signatures, we need math tools.

This file contains:

* Modular exponentiation
* Modular inverse
* Greatest common divisor (GCD)

These are **core cryptographic primitives**.

---

## Why This File Matters

Modern crypto libraries hide this math.

Here, you **see it explicitly**, so nothing feels magical.

---

# ✍️ Part 4 — ElGamal Digital Signature (Educational)

📄 **File:** `elgamal-signature.js`

⚠️ **Important Warning**

This implementation is:

* ❌ NOT production-safe
* ✅ Mathematically correct
* ✅ Perfect for learning

ElGamal signatures are the **foundation of DSA and ECDSA**.

---

## 🔑 ElGamal Key Setup

* Public values: `p`, `g`, `y`
* Private key: `x`
* Security depends on **discrete logarithms**

---

## ✍️ ElGamal Signing Process

1. Hash the message → `h`
2. Choose random `k` such that `gcd(k, p−1) = 1`
3. Compute:

   * `r = g^k mod p`
   * `s = k⁻¹(h − x·r) mod (p−1)`
4. Signature is `(r, s)`

---

## ✅ ElGamal Verification Rule

The signature is valid **if and only if**:

[
g^h \equiv y^r \cdot r^s \pmod p
]

This equation proves:

* The signer knew the private key
* The message hash was not modified

---

## ▶️ Run the ElGamal Example

```bash
node elgamal-signature.js
```

### Expected Output

```text
ElGamal Signature: { r: 123n, s: 45n }
Valid Signature? true
```

---

## 🚨 Critical Security Insight

> Reusing the same `k` **leaks the private key**

This is why:

* ElGamal
* DSA
* ECDSA

**must generate a fresh random nonce every time**

Many real-world hacks happened because of this mistake.

---

# 📊 Part 5 — RSA vs ElGamal (Conceptual Comparison)

| Feature        | RSA                   | ElGamal            |
| -------------- | --------------------- | ------------------ |
| Signature Form | Single integer        | Pair `(r, s)`      |
| Random Nonce   | ❌                     | ✅                  |
| Math Basis     | Integer factorization | Discrete logarithm |
| Production Use | ✅                     | ❌                  |
| Leads To       | RSA-PSS               | DSA / ECDSA        |

---

# 🎯 What You Should Understand After This Repo

By the end, you should clearly understand:

* Why signatures ≠ encryption
* Why hashing is mandatory
* Why private keys sign and public keys verify
* How ElGamal signatures work internally
* Why ECDSA exists

---



## 📜 License

MIT — free to learn, share, and modify.


