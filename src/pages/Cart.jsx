import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { items, updateQty, removeItem, subtotal, count } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <h1 className="font-display text-3xl font-bold text-ink mb-3">Your cart is empty</h1>
        <p className="text-ink-soft mb-6">Looks like you haven't picked a cake yet.</p>
        <Link
          to="/menu"
          className="inline-block bg-rose-500 hover:bg-rose-600 text-white px-6 py-3 rounded-full font-semibold transition"
        >
          Browse the Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="font-display text-3xl font-bold text-ink mb-8">
        Your Cart <span className="text-ink-soft font-normal text-lg">({count} item{count === 1 ? "" : "s"})</span>
      </h1>

      <div className="space-y-4 mb-8">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 bg-white rounded-2xl border border-rose-100 p-4"
          >
            <img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg object-cover shrink-0" />
            <div className="flex-1 min-w-0">
              <h3 className="font-display font-semibold text-ink truncate">{item.name}</h3>
              <p className="text-rose-600 font-bold">${item.price}</p>
            </div>
            <div className="flex items-center border border-rose-200 rounded-full overflow-hidden shrink-0">
              <button
                onClick={() => updateQty(item.id, item.qty - 1)}
                className="w-8 h-8 hover:bg-rose-50"
                aria-label={`Decrease quantity of ${item.name}`}
              >
                −
              </button>
              <span className="w-8 text-center text-sm font-semibold">{item.qty}</span>
              <button
                onClick={() => updateQty(item.id, item.qty + 1)}
                className="w-8 h-8 hover:bg-rose-50"
                aria-label={`Increase quantity of ${item.name}`}
              >
                +
              </button>
            </div>
            <p className="w-16 text-right font-semibold text-ink shrink-0">${(item.price * item.qty).toFixed(2)}</p>
            <button
              onClick={() => removeItem(item.id)}
              aria-label={`Remove ${item.name} from cart`}
              className="text-ink-soft hover:text-rose-600 shrink-0 text-lg"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-rose-100 p-6 flex items-center justify-between">
        <div>
          <p className="text-ink-soft text-sm">Subtotal</p>
          <p className="font-display text-2xl font-bold text-ink">${subtotal.toFixed(2)}</p>
        </div>
        <Link
          to="/checkout"
          className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-3 rounded-full font-semibold transition"
        >
          Checkout
        </Link>
      </div>
    </div>
  );
}
