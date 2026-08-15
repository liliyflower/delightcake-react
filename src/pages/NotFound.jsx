import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-28 text-center">
      <p className="font-script text-3xl text-rose-500 mb-2">Oops!</p>
      <h1 className="font-display text-3xl font-bold text-ink mb-4">This page fell off the tray</h1>
      <p className="text-ink-soft mb-6">We couldn't find the page you were looking for.</p>
      <Link to="/" className="inline-block bg-rose-500 hover:bg-rose-600 text-white px-6 py-3 rounded-full font-semibold transition">
        Back to Home
      </Link>
    </div>
  );
}
