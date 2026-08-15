import { createContext, useContext, useEffect, useState, useCallback } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile,
} from "firebase/auth";
import { auth, isFirebaseConfigured } from "../lib/firebase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(isFirebaseConfigured);

  useEffect(() => {
    if (!isFirebaseConfigured) return;
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const signUp = useCallback(async (name, email, password) => {
    if (!isFirebaseConfigured) {
      throw new Error("Sign-in isn't set up yet — see the README for connecting Firebase.");
    }
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    if (name) {
      await updateProfile(cred.user, { displayName: name });
      // Refresh local state so the name shows immediately.
      setUser({ ...cred.user, displayName: name });
    }
    return cred.user;
  }, []);

  const signIn = useCallback(async (email, password) => {
    if (!isFirebaseConfigured) {
      throw new Error("Sign-in isn't set up yet — see the README for connecting Firebase.");
    }
    const cred = await signInWithEmailAndPassword(auth, email, password);
    return cred.user;
  }, []);

  const signOut = useCallback(async () => {
    if (!isFirebaseConfigured) return;
    await firebaseSignOut(auth);
  }, []);

  const updateDisplayName = useCallback(async (name) => {
    if (!isFirebaseConfigured || !auth.currentUser) return;
    await updateProfile(auth.currentUser, { displayName: name });
    setUser({ ...auth.currentUser, displayName: name });
  }, []);

  const value = { user, loading, signUp, signIn, signOut, updateDisplayName };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
