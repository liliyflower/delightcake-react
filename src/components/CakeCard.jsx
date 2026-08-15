import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function CakeCard({ cake }) {
  const { addItem } = useCart();

  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow overflow-hidden border border-rose-100">
      <Link to={`/cake/${cake.id}`} className="block overflow-hidden">
        <div className="aspect-square overflow-hidden bg-rose-50">
          <img
            src={cake.image}
            alt={cake.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      </Link>
      <div className="p-4">
        <Link to={`/cake/${cake.id}`}>
          <h3 className="font-display font-semibold text-lg text-ink leading-snug hover:text-rose-600 transition">
            {cake.name}
          </h3>
        </Link>
        <div className="flex items-center justify-between mt-3">
          <span className="text-rose-600 font-bold text-lg">${cake.price}</span>
          <button
            onClick={() => addItem(cake, 1)}
            className="text-sm font-semibold bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-full transition"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
