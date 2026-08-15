import { Link } from "react-router-dom";
import { categories } from "../data/cakes";

export default function Menu() {
  return (
    <div>
      <section className="pt-16 pb-12 bg-linear-to-r from-rose-100 to-rose-200 text-center px-4">
        <p className="font-script text-2xl text-rose-600">The Menu</p>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-ink">What Would You Like to Order?</h1>
        <p className="max-w-xl mx-auto text-ink-soft mt-3">
          Pick a category to see designs, sizes, and prices — every cake can also be customized.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-12">
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
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
