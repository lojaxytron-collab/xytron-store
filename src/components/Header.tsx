import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, Menu, X, Search, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useCart } from "@/lib/cartStore";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "@/components/ThemeToggle";
import logoImg from "@/assets/logo-xytron.png";
import { categories } from "@/lib/mockData";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCategory, setSearchCategory] = useState("Todas as categorias");
  const [catDropdownOpen, setCatDropdownOpen] = useState(false);
  const [prodDropdownOpen, setProdDropdownOpen] = useState(false);
  const { toggleCart, itemCount } = useCart();
  const count = itemCount();
  const navigate = useNavigate();
  const catRef = useRef<HTMLDivElement>(null);
  const prodRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (catRef.current && !catRef.current.contains(e.target as Node)) setCatDropdownOpen(false);
      if (prodRef.current && !prodRef.current.contains(e.target as Node)) setProdDropdownOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const cat = searchCategory === "Todas as categorias" ? "Todos" : searchCategory;
    navigate(`/produtos?busca=${encodeURIComponent(searchQuery)}&categoria=${encodeURIComponent(cat)}`);
    setSearchQuery("");
  };

  const navLinks = [
    { label: "Início", to: "/" },
    { label: "Sobre", to: "/sobre" },
    { label: "Contato", to: "/contato" },
    { label: "Rastreio", to: "/rastreio" },
  ];

  const productCategories = categories.filter(c => c !== "Todos");

  return (
    <>
      {/* Promo bar */}
      <div className="bg-primary text-primary-foreground text-center py-2 text-xs sm:text-sm font-medium tracking-wide">
        🔥 Promoção do MÊS!! | Receba em até 10 dias! + 30% OFF
      </div>

      <header className="sticky top-0 z-50 bg-background border-b border-border">
        {/* Top row: Logo + Search + Cart */}
        <div className="container flex items-center justify-between gap-4 h-20">
          <Link to="/" className="flex items-center gap-2 font-display text-xl sm:text-2xl font-bold tracking-tight shrink-0">
            <img
              src={logoImg}
              alt="Logo LOJA XYTRON"
              className="w-10 h-10 rounded-full animate-spin-slow object-cover"
              style={{ background: "transparent" }}
            />
            <span className="hidden sm:inline">
              <span className="text-foreground">LOJA </span>
              <span className="text-primary neon-text">XYTRON</span>
            </span>
          </Link>

          {/* Search bar - desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-2xl items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Pesquisar..."
              className="flex-1 bg-secondary border border-border rounded-l-lg px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <div ref={catRef} className="relative">
              <button
                type="button"
                onClick={() => setCatDropdownOpen(!catDropdownOpen)}
                className="flex items-center gap-1 bg-secondary border-y border-border px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground whitespace-nowrap"
              >
                {searchCategory}
                <ChevronDown className="w-4 h-4" />
              </button>
              {catDropdownOpen && (
                <div className="absolute top-full right-0 mt-1 bg-card border border-border rounded-lg shadow-xl z-50 min-w-[180px]">
                  <button
                    type="button"
                    onClick={() => { setSearchCategory("Todas as categorias"); setCatDropdownOpen(false); }}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-secondary transition-colors"
                  >
                    Todas as categorias
                  </button>
                  {productCategories.map(cat => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => { setSearchCategory(cat); setCatDropdownOpen(false); }}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-secondary transition-colors"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              type="submit"
              className="bg-primary text-primary-foreground p-2.5 rounded-r-lg hover:opacity-90 transition-opacity"
            >
              <Search className="w-5 h-5" />
            </button>
          </form>

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

        {/* Nav row - desktop */}
        <nav className="hidden md:block border-t border-border">
          <div className="container flex items-center gap-8 h-12">
            {navLinks.slice(0, 1).map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}

            {/* Produtos dropdown */}
            <div ref={prodRef} className="relative">
              <button
                onClick={() => setProdDropdownOpen(!prodDropdownOpen)}
                className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                Produtos
                <ChevronDown className="w-3 h-3" />
              </button>
              {prodDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 bg-card border border-border rounded-lg shadow-xl z-50 min-w-[200px]">
                  <Link
                    to="/produtos"
                    onClick={() => setProdDropdownOpen(false)}
                    className="block px-4 py-2 text-sm hover:bg-secondary transition-colors font-medium"
                  >
                    Todos os Produtos
                  </Link>
                  {productCategories.map(cat => (
                    <Link
                      key={cat}
                      to={`/produtos?categoria=${encodeURIComponent(cat)}`}
                      onClick={() => setProdDropdownOpen(false)}
                      className="block px-4 py-2 text-sm hover:bg-secondary transition-colors"
                    >
                      {cat}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {navLinks.slice(1).map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>

        {/* Mobile search */}
        <div className="md:hidden px-4 pb-3">
          <form onSubmit={handleSearch} className="flex">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Pesquisar..."
              className="flex-1 bg-secondary border border-border rounded-l-lg px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none"
            />
            <button type="submit" className="bg-primary text-primary-foreground p-2 rounded-r-lg">
              <Search className="w-4 h-4" />
            </button>
          </form>
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
              <div className="container py-4 flex flex-col gap-3">
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
                <div className="border-t border-border pt-3">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2 font-display">Produtos</p>
                  {productCategories.map(cat => (
                    <Link
                      key={cat}
                      to={`/produtos?categoria=${encodeURIComponent(cat)}`}
                      onClick={() => setMenuOpen(false)}
                      className="block text-sm text-muted-foreground hover:text-primary transition-colors py-1.5"
                    >
                      {cat}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Header;
