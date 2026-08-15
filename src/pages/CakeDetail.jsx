import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getCategory } from "../data/cakes";
import { fetchCakes } from "../lib/store";
import { useCart } from "../context/CartContext";

export default function CakeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [cake, setCake] = useState(undefined); 
  const [qty, setQty] = useState(1);

  useEffect(() => {
    let alive = true;
    fetchCakes().then((all) => {
      if (!alive) return;
      setCake(all.find((c) => c.id === id) ?? null);
    });
    return () => {
      alive = false;
    };
  }, [id]);

  if (cake === undefined) {
    return <div className="max-w-4xl mx-auto px-4 py-24 text-center text-ink-soft">Loading cake…</div>;
  }

  if (cake === null) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <h1 className="font-display text-2xl font-bold text-ink mb-3">We couldn't find that cake</h1>
        <Link to="/menu" className="text-rose-600 font-semibold hover:underline">Back to the menu</Link>
      </div>
    );
  }

  const category = getCategory(cake.category);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <nav className="text-sm text-ink-soft mb-6">
        <Link to="/menu" className="hover:text-rose-600">Menu</Link>
        <span className="mx-2">/</span>
        {category && (
          <>
            <Link to={`/menu/${category.slug}`} className="hover:text-rose-600">{category.name}</Link>
            <span className="mx-2">/</span>
          </>
        )}
        <span>{cake.name}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-10">
        <div className="rounded-2xl overflow-hidden bg-rose-50 border border-rose-100">
          <img src={cake.image} alt={cake.name} className="w-full h-full object-cover" />
        </div>

        <div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-ink mb-2">{cake.name}</h1>
          <p className="text-rose-600 font-bold text-2xl mb-4">${cake.price}</p>
          <p className="text-ink-soft leading-relaxed mb-6">
            Handcrafted to order with fresh ingredients. Message us with your preferred size, flavor
            tweaks, or decoration details after adding this to your cart — every cake can be customized.
          </p>

          <div className="flex items-center gap-4 mb-6">
            <label htmlFor="qty" className="text-sm font-semibold text-ink">Quantity</label>
            <div className="flex items-center border border-rose-200 rounded-full overflow-hidden">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="w-9 h-9 text-lg hover:bg-rose-50"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span id="qty" className="w-10 text-center font-semibold">{qty}</span>
              <button
                type="button"
                onClick={() => setQty((q) => q + 1)}
                className="w-9 h-9 text-lg hover:bg-rose-50"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => addItem(cake, qty)}
              className="flex-1 bg-white border-2 border-rose-500 text-rose-600 hover:bg-rose-50 font-semibold px-6 py-3 rounded-full transition"
            >
              Add to Cart
            </button>
            <button
              onClick={() => {
                addItem(cake, qty);
                navigate("/checkout");
              }}
              className="flex-1 bg-rose-500 hover:bg-rose-600 text-white font-semibold px-6 py-3 rounded-full transition"
            >
              Order Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
