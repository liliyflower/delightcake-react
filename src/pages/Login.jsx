import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { isFirebaseConfigured } from "../lib/firebase";

export default function Login() {
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/account";

  const [mode, setMode] = useState("signin"); 
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      if (mode === "signup") {
        await signUp(form.name, form.email, form.password);
      } else {
        await signIn(form.email, form.password);
      }
      navigate(from, { replace: true });
    } catch (err) {
      setError(friendlyError(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="text-center mb-8">
        <p className="font-script text-2xl text-rose-500">
          {mode === "signin" ? "Welcome Back" : "Join Us"}
        </p>
        <h1 className="font-display text-3xl font-bold text-ink">
          {mode === "signin" ? "Sign In" : "Create Account"}
        </h1>
      </div>

      {!isFirebaseConfigured && (
        <p className="text-xs text-gold-500 bg-white border border-rose-100 rounded-lg p-3 mb-6 text-center">
          Firebase isn't configured yet, so sign-in won't work. See the README to connect a Firebase project.
        </p>
      )}

      <form onSubmit={onSubmit} className="space-y-4">
        {mode === "signup" && (
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-ink mb-1">Name</label>
            <input id="name" name="name" value={form.name} onChange={onChange}
              className="w-full border border-rose-200 p-2.5 rounded-lg focus:border-rose-500" />
          </div>
        )}
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-ink mb-1">Email</label>
          <input id="email" type="email" name="email" required value={form.email} onChange={onChange}
            className="w-full border border-rose-200 p-2.5 rounded-lg focus:border-rose-500" />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-semibold text-ink mb-1">Password</label>
          <input id="password" type="password" name="password" required minLength={6} value={form.password} onChange={onChange}
            className="w-full border border-rose-200 p-2.5 rounded-lg focus:border-rose-500" />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-rose-500 hover:bg-rose-600 disabled:opacity-60 text-white font-semibold px-5 py-3 rounded-full transition"
        >
          {submitting
            ? "Please wait…"
            : mode === "signin" ? "Sign In" : "Create Account"}
        </button>
      </form>

      <p className="text-center text-sm text-ink-soft mt-6">
        {mode === "signin" ? (
          <>
            Don't have an account?{" "}
            <button onClick={() => { setMode("signup"); setError(""); }} className="text-rose-600 font-semibold hover:underline">
              Sign up
            </button>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <button onClick={() => { setMode("signin"); setError(""); }} className="text-rose-600 font-semibold hover:underline">
              Sign in
            </button>
          </>
        )}
      </p>

      <p className="text-center text-xs text-ink-soft/70 mt-4">
        <Link to="/" className="hover:text-rose-600">Back to home</Link>
      </p>
    </div>
  );
}

function friendlyError(err) {
  const code = err?.code || "";
  if (code.includes("email-already-in-use")) return "That email is already registered — try signing in instead.";
  if (code.includes("invalid-credential") || code.includes("wrong-password") || code.includes("user-not-found"))
    return "Incorrect email or password.";
  if (code.includes("weak-password")) return "Password should be at least 6 characters.";
  if (code.includes("invalid-email")) return "Please enter a valid email address.";
  return err?.message || "Something went wrong. Please try again.";
}
