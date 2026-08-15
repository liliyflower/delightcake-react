import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Account() {
  const { user, signOut, updateDisplayName } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.displayName || "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  const onSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    try {
      await updateDisplayName(name.trim());
      setSaved(true);
    } finally {
      setSaving(false);
    }
  };

  const onSignOut = async () => {
    setSigningOut(true);
    await signOut();
    navigate("/");
  };

  const initials = (user?.displayName || user?.email || "?").trim().charAt(0).toUpperCase();
  const joined = user?.metadata?.creationTime
    ? new Date(user.metadata.creationTime).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })
    : null;

  return (
    <div className="max-w-2xl mx-auto px-4 py-14">
      <div className="flex items-center gap-4 mb-10">
        <div className="w-16 h-16 rounded-full bg-rose-500 text-white flex items-center justify-center text-2xl font-display font-bold shrink-0">
          {initials}
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold text-ink">
            {user?.displayName || "Your Account"}
          </h1>
          <p className="text-ink-soft text-sm">{user?.email}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-rose-100 p-6 mb-6">
        <h2 className="font-display font-bold text-lg text-ink mb-4">Profile</h2>
        <form onSubmit={onSave} className="space-y-4">
          <div>
            <label htmlFor="displayName" className="block text-sm font-semibold text-ink mb-1">Display name</label>
            <input
              id="displayName"
              value={name}
              onChange={(e) => { setName(e.target.value); setSaved(false); }}
              placeholder="Add your name"
              className="w-full border border-rose-200 p-2.5 rounded-lg focus:border-rose-500"
            />
          </div>
          <div>
            <span className="block text-sm font-semibold text-ink mb-1">Email</span>
            <p className="text-ink-soft">{user?.email}</p>
          </div>
          {joined && (
            <div>
              <span className="block text-sm font-semibold text-ink mb-1">Member since</span>
              <p className="text-ink-soft">{joined}</p>
            </div>
          )}

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={saving}
              className="bg-rose-500 hover:bg-rose-600 disabled:opacity-60 text-white font-semibold px-5 py-2.5 rounded-full transition"
            >
              {saving ? "Saving…" : "Save changes"}
            </button>
            {saved && <span className="text-sm text-rose-600 font-medium">Saved!</span>}
          </div>
        </form>
      </div>

      <button
        onClick={onSignOut}
        disabled={signingOut}
        className="w-full bg-white border-2 border-rose-500 text-rose-600 hover:bg-rose-50 disabled:opacity-60 font-semibold px-6 py-3 rounded-full transition"
      >
        {signingOut ? "Signing out…" : "Sign Out"}
      </button>
    </div>
  );
}
