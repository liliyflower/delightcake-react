// One-off script to push the local cake catalog into Firestore.
//
// Usage:
//   1. Fill in .env.local with your Firebase config (see .env.example).
//   2. node scripts/seedCakes.mjs
//
// This is optional — the site works fine reading from src/data/cakes.js if
// you never run this. Use it once you're ready to manage cakes from the
// Firebase console / your own admin tool instead of editing source code.

import { config } from "dotenv";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { cakes } from "../src/data/cakes.js";

config({ path: ".env.local" });

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
};

if (!firebaseConfig.projectId) {
  console.error("Missing Firebase env vars. Copy .env.example to .env.local and fill it in first.");
  process.exit(1);
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const run = async () => {
  for (const cake of cakes) {
    const { id, ...data } = cake;
    await setDoc(doc(db, "cakes", id), data);
    console.log(`Seeded ${id} — ${data.name}`);
  }
  console.log(`\nDone. Seeded ${cakes.length} cakes into Firestore.`);
  process.exit(0);
};

run().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
