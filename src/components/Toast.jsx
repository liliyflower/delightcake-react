import { useCart } from "../context/CartContext";

export default function Toast() {
  const { toast } = useCart();
  return (
    <div
      aria-live="polite"
      className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[60] pointer-events-none"
    >
      {toast && (
        <div className="pointer-events-auto bg-berry-900 text-white text-sm font-medium px-5 py-3 rounded-full shadow-xl">
          {toast}
        </div>
      )}
    </div>
  );
}
