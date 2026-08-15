import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { submitOrder } from "../lib/store";
import { isFirebaseConfigured } from "../lib/firebase";

const emptyForm = { name: "", email: "", phone: "", deliveryDate: "", address: "", notes: "" };

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState("idle"); 
  const [orderId, setOrderId] = useState(null);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    const id = await submitOrder({
      customer: form,
      items,
      subtotal,
    });
    if (id || !isFirebaseConfigured) {
      setOrderId(id);
      setStatus("success");
      clearCart();
    } else {
      setStatus("error");
    }
  };

  if (items.length === 0 && status !== "success") {
    return <Navigate to="/cart" replace />;
  }

  if (status === "success") {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <div className="text-5xl mb-4">🎂</div>
        <h1 className="font-display text-3xl font-bold text-ink mb-3">Order received!</h1>
        <p className="text-ink-soft mb-2">
          Thank you, {form.name || "friend"} — we'll reach out at {form.email || "the email you provided"} to confirm the details.
        </p>
        {orderId && <p className="text-xs text-ink-soft/70 mb-6">Reference: {orderId}</p>}
        {!isFirebaseConfigured && (
          <p className="text-xs text-gold-500 mb-6">
            Note: Firebase isn't configured yet, so this order was shown but not saved anywhere.
          </p>
        )}
        <Link to="/menu" className="inline-block bg-rose-500 hover:bg-rose-600 text-white px-6 py-3 rounded-full font-semibold transition">
          Order More Cakes
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 grid md:grid-cols-5 gap-10">
      <form onSubmit={onSubmit} className="md:col-span-3 space-y-4">
        <h1 className="font-display text-3xl font-bold text-ink mb-2">Checkout</h1>

        <div>
          <label className="block text-sm font-semibold text-ink mb-1" htmlFor="name">Full name</label>
          <input id="name" name="name" required value={form.name} onChange={onChange}
            className="w-full border border-rose-200 p-2.5 rounded-lg focus:border-rose-500" />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-ink mb-1" htmlFor="email">Email</label>
            <input id="email" type="email" name="email" required value={form.email} onChange={onChange}
              className="w-full border border-rose-200 p-2.5 rounded-lg focus:border-rose-500" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-ink mb-1" htmlFor="phone">Phone</label>
            <input id="phone" name="phone" required value={form.phone} onChange={onChange}
              className="w-full border border-rose-200 p-2.5 rounded-lg focus:border-rose-500" />
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-ink mb-1" htmlFor="deliveryDate">Delivery date</label>
            <input id="deliveryDate" type="date" name="deliveryDate" required value={form.deliveryDate} onChange={onChange}
              className="w-full border border-rose-200 p-2.5 rounded-lg focus:border-rose-500" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-ink mb-1" htmlFor="address">Delivery address</label>
            <input id="address" name="address" required value={form.address} onChange={onChange}
              className="w-full border border-rose-200 p-2.5 rounded-lg focus:border-rose-500" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-ink mb-1" htmlFor="notes">Custom requests (flavor, message on cake, allergies)</label>
          <textarea id="notes" name="notes" rows={4} value={form.notes} onChange={onChange}
            className="w-full border border-rose-200 p-2.5 rounded-lg focus:border-rose-500" />
        </div>

        {status === "error" && (
          <p className="text-sm text-red-600">
            Something went wrong saving your order. Please try again in a moment.
          </p>
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full bg-rose-500 hover:bg-rose-600 disabled:opacity-60 text-white font-semibold px-6 py-3 rounded-full transition"
        >
          {status === "submitting" ? "Placing order…" : `Place Order — $${subtotal.toFixed(2)}`}
        </button>
      </form>

      <aside className="md:col-span-2">
        <div className="bg-white rounded-2xl border border-rose-100 p-6 sticky top-24">
          <h2 className="font-display font-bold text-lg text-ink mb-4">Order Summary</h2>
          <ul className="space-y-3 mb-4">
            {items.map((i) => (
              <li key={i.id} className="flex justify-between text-sm">
                <span className="text-ink-soft">{i.name} × {i.qty}</span>
                <span className="font-semibold text-ink">${(i.price * i.qty).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="border-t border-rose-100 pt-4 flex justify-between font-display font-bold text-ink">
            <span>Total</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
        </div>
      </aside>
    </div>
  );
}
