import { Link } from "react-router-dom";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cartStore";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "@/components/ThemeToggle";
import logoImg from "@/assets/logo-xytron.png";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { toggleCart, itemCount } = useCart();
  const count = itemCount();

  const navLinks = [
    { label: "Início", to: "/" },
    { label: "Produtos", to: "/produtos" },
    { label: "Sobre", to: "/sobre" },
    { label: "Contato", to: "/contato" },
    { label: "Rastreio", to: "/rastreio" },
  ];

  return (
    <>
      {/* Promo bar */}
      <div className="bg-primary text-primary-foreground text-center py-2 text-xs sm:text-sm font-medium tracking-wide">
        🔥 PROMOÇÃO DO MÊS — Até 30% OFF + Frete para todo Brasil!
      </div>

      <header className="sticky top-0 z-50 glass border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 font-display text-xl sm:text-2xl font-bold tracking-tight">
            <img
              src={logoImg}
              alt="Logo LOJA XYTRON"
              className="w-10 h-10 rounded-full animate-spin-slow object-cover"
              style={{ background: "transparent" }}
            />
            <span>
              <span className="text-foreground">LOJA </span>
              <span className="text-primary neon-text">XYTRON</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={toggleCart}
              className="relative p-2 hover:text-primary transition-colors"
              aria-label="Carrinho"
            >
              <ShoppingBag className="w-5 h-5" />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {count}
                </span>
              )}
            </button>

            <button
              className="md:hidden p-2"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-border overflow-hidden"
            >
              <div className="container py-4 flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMenuOpen(false)}
                    className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Header;
