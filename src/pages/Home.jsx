import { Link } from "react-router-dom";
import { categories } from "../data/cakes";

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section
        className="relative h-140 md:h-130 w-full bg-cover bg-center flex items-center justify-center text-white"
        style={{ backgroundImage: "url('/images/bghero1.jpg')" }}
      >
        <div className="absolute inset-0 bg-linear-to-b from-black/50 via-black/40 to-black/60" />
        <div className="relative text-center px-6 max-w-2xl">
          <p className="font-script text-3xl text-rose-200 mb-2">Welcome to</p>
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-4 text-balance">
            Bite into Happiness
          </h1>
          <p className="text-lg md:text-2xl mb-8 text-rose-50">Savor the Sweetness</p>
          <Link
            to="/menu"
            className="inline-block bg-rose-500 hover:bg-rose-600 text-white px-8 py-3 rounded-full font-semibold transition shadow-lg"
          >
            Explore the Menu
          </Link>
        </div>
      </section>
      <div className="scallop-divider" style={{ "--scallop-color": "var(--color-cream)" }} />

      {/* Category showcase */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <div className="text-center mb-10">
          <p className="font-script text-2xl text-rose-500">Our Bakes</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-ink">Choose Your Favorite</h2>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {categories.map((c) => (
            <Link
              key={c.slug}
              to={`/menu/${c.slug}`}
              className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow overflow-hidden border border-rose-100"
            >
              <div className="aspect-4/3 overflow-hidden">
                <img
                  src={c.cover}
                  alt={c.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <h3 className="font-display font-bold text-xl text-ink group-hover:text-rose-600 transition">
                  {c.name}
                </h3>
                <p className="text-sm text-ink-soft mt-1">{c.tagline}</p>
                <span className="inline-block mt-3 text-rose-500 font-semibold text-sm">
                  View cakes →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Special Offer */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div
          className="relative h-72 md:h-96 rounded-2xl overflow-hidden bg-cover bg-center"
          style={{ backgroundImage: "url('/images/IMG_3979.jpg')" }}
        >
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
            <div>
              <h2 className="text-white text-3xl md:text-5xl font-display font-bold">Special Offer</h2>
              <p className="text-white text-lg md:text-2xl mt-3">
                Get <span className="text-gold-400 font-bold">50%</span> off your first custom order
              </p>
              <Link
                to="/menu"
                className="inline-block mt-6 bg-rose-500 hover:bg-rose-600 text-white px-6 py-3 rounded-full transition font-semibold"
              >
                Order Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
