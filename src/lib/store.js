import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "./firebase";
import { cakes as staticCakes } from "../data/cakes";

export async function fetchCakes() {
  if (!isFirebaseConfigured) return staticCakes;

  try {
    const snap = await getDocs(collection(db, "cakes"));
    if (snap.empty) return staticCakes;
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (err) {
    console.error("[DelightCake] Failed to load cakes from Firestore:", err);
    return staticCakes;
  }
}

export async function submitOrder(order) {
  if (!isFirebaseConfigured) {
    console.info("[DelightCake] Offline mode — order not persisted:", order);
    return null;
  }
  try {
    const ref = await addDoc(collection(db, "orders"), {
      ...order,
      status: "new",
      createdAt: serverTimestamp(),
    });
    return ref.id;
  } catch (err) {
    console.error("[DelightCake] Failed to save order:", err);
    return null;
  }
}

export async function submitContactMessage(message) {
  if (!isFirebaseConfigured) {
    console.info("[DelightCake] Offline mode — message not persisted:", message);
    return null;
  }
  try {
    const ref = await addDoc(collection(db, "messages"), {
      ...message,
      createdAt: serverTimestamp(),
    });
    return ref.id;
  } catch (err) {
    console.error("[DelightCake] Failed to save message:", err);
    return null;
  }
}
