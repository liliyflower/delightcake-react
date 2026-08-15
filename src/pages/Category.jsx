import { useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { getCategory } from "../data/cakes";
import { fetchCakes } from "../lib/store";
import CakeCard from "../components/CakeCard";

export default function Category() {
  const { slug } = useParams();
  const category = getCategory(slug);
  const [cakes, setCakes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    fetchCakes().then((all) => {
      if (!alive) return;
      setCakes(all.filter((c) => c.category === slug));
      setLoading(false);
    });
    return () => {
      alive = false;
    };
  }, [slug]);

  if (!category) return <Navigate to="/menu" replace />;

  return (
    <div>
      <section className="pt-16 pb-12 bg-linear-to-r from-rose-100 to-rose-200 text-center px-4">
        <nav className="text-sm text-ink-soft mb-2">
          <Link to="/menu" className="hover:text-rose-600">Menu</Link>
          <span className="mx-2">/</span>
          <span>{category.name}</span>
        </nav>
        <h1 className="font-display text-4xl font-bold mb-3 text-ink">{category.name}</h1>
        <p className="max-w-2xl mx-auto text-ink-soft">{category.tagline}</p>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-12">
        {loading ? (
          <div className="grid md:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-rose-100 overflow-hidden animate-pulse">
                <div className="aspect-square bg-rose-100" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-rose-100 rounded w-3/4" />
                  <div className="h-4 bg-rose-100 rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        ) : cakes.length === 0 ? (
          <p className="text-center text-ink-soft">No cakes found in this category yet.</p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {cakes.map((cake) => (
              <CakeCard key={cake.id} cake={cake} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
