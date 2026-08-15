import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { User, UserRound, ShoppingCart, Menu, X } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/menu", label: "Menu" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { count } = useCart();
  const { user } = useAuth();
  const accountLabel = user ? (user.displayName || "Account") : "Sign In";

  return (
    <header className="sticky top-0 z-50 bg-berry-900 backdrop-blur text-cream shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between py-2.5">
          <NavLink to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
            <img
              src={`${import.meta.env.BASE_URL}images/logorm.jpg`}
              alt="DelightCake logo"
              className="w-10 h-10 rounded-full object-cover shrink-0 ring-2 ring-rose-300/60"
            />
            <span className="font-script text-3xl leading-none text-rose-100">DelightCake</span>
          </NavLink>

          <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-full transition ${
                    isActive
                      ? "bg-rose-500 text-white"
                      : "text-rose-50/90 hover:bg-white/10"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <NavLink
              to="/cart"
              aria-label={`Cart, ${count} item${count === 1 ? "" : "s"}`}
              className={({ isActive }) =>
                `relative ml-2 px-4 py-2 rounded-full border transition ${
                  isActive
                    ? "border-rose-300 bg-white/10"
                    : "border-white/25 hover:border-rose-300 hover:bg-white/10"
                }`
              }
            >
              Cart
              {count > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold-500 text-berry-900 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {count}
                </span>
              )}
            </NavLink>
            <NavLink
              to={user ? "/account" : "/login"}
              className={({ isActive }) =>
                `ml-1 px-4 py-2 rounded-full border transition truncate max-w-[9rem] ${
                  isActive
                    ? "border-rose-300 bg-white/10"
                    : "border-white/25 hover:border-rose-300 hover:bg-white/10"
                }`
              }
            >
              {accountLabel}
            </NavLink>
          </nav>

          <div className="flex items-center gap-3 md:hidden">
            <NavLink to={user ? "/account" : "/login"} aria-label={accountLabel}>
  {user ? (
    <User className="w-5 h-5" strokeWidth={2} />
  ) : (
    <UserRound className="w-5 h-5" strokeWidth={2} />
  )}
</NavLink>
            <NavLink to="/cart" aria-label="Cart" className="relative">
              <span className="text-xl">🛒</span>
              {count > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold-500 text-berry-900 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {count}
                </span>
              )}
            </NavLink>
            <button
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="text-2xl leading-none select-none px-1"
            >
              {open ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {open && (
          <nav className="md:hidden pb-4 flex flex-col gap-1 text-sm font-medium">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-2.5 rounded-lg transition ${
                    isActive ? "bg-rose-500 text-white" : "hover:bg-white/10"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <NavLink
              to={user ? "/account" : "/login"}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `px-4 py-2.5 rounded-lg transition ${
                  isActive ? "bg-rose-500 text-white" : "hover:bg-white/10"
                }`
              }
            >
              {accountLabel}
            </NavLink>
          </nav>
        )}
      </div>
    </header>
  );
}
