import { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "delightcake_cart_v1";

function readInitialCart() {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(readInitialCart);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(t);
  }, [toast]);

  const addItem = useCallback((cake, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === cake.id);
      if (existing) {
        return prev.map((i) =>
          i.id === cake.id ? { ...i, qty: i.qty + qty } : i
        );
      }
      return [...prev, { id: cake.id, name: cake.name, price: cake.price, image: cake.image, category: cake.category, qty }];
    });
    setToast(`${cake.name} added to cart`);
  }, []);

  const removeItem = useCallback((id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const updateQty = useCallback((id, qty) => {
    setItems((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: Math.max(1, qty) } : i))
        .filter((i) => i.qty > 0)
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totals = useMemo(() => {
    const count = items.reduce((sum, i) => sum + i.qty, 0);
    const subtotal = items.reduce((sum, i) => sum + i.qty * i.price, 0);
    return { count, subtotal };
  }, [items]);

  const value = {
    items,
    addItem,
    removeItem,
    updateQty,
    clearCart,
    toast,
    ...totals,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
