import { Link } from "react-router-dom";
import { Truck, ShieldCheck, HeadphonesIcon, Star, ChevronRight, ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";
import { products, categoryImages } from "@/lib/mockData";
import { useRef } from "react";
import ProductCard from "@/components/ProductCard";
import { useState, useEffect } from "react";
import heroBanner from "@/assets/hero-banner.jpeg";
import heroBanner2 from "@/assets/hero-banner-2.jpeg";

const heroSlides = [
  { bg: heroBanner },
  { bg: heroBanner2 },
];

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const catScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((s) => (s + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const productsByCategory = [
    { title: "Camisetas", cat: "Camisetas" },
    { title: "Calças", cat: "Calças" },
    { title: "Moletons", cat: "Moletons" },
    { title: "Eletrônicos", cat: "Eletrônicos" },
    { title: "Acessórios", cat: "Acessórios" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Slider */}
      <section className="relative h-[50vh] sm:h-[60vh] overflow-hidden">
        {heroSlides.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-700 ${i === currentSlide ? "opacity-100" : "opacity-0"}`}
          >
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${slide.bg})` }} />
          </div>
        ))}
        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`w-3 h-3 rounded-full transition-colors ${i === currentSlide ? "bg-primary" : "bg-foreground/30"}`}
            />
          ))}
        </div>
        {/* Arrows */}
        <button
          onClick={() => setCurrentSlide((s) => (s - 1 + heroSlides.length) % heroSlides.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 rounded-full text-foreground hover:bg-primary transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => setCurrentSlide((s) => (s + 1) % heroSlides.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 rounded-full text-foreground hover:bg-primary transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </section>

      {/* Category Images Row - Scrollable */}
      <section className="container py-10">
        <div className="relative group/scroll">
          <button
            onClick={() => catScrollRef.current?.scrollBy({ left: -200, behavior: 'smooth' })}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-1.5 bg-background/80 border border-border rounded-full shadow-md opacity-0 group-hover/scroll:opacity-100 transition-opacity hover:bg-primary hover:text-primary-foreground"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div
            ref={catScrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth px-2 py-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {categoryImages.map((cat) => (
              <Link
                key={cat.slug}
                to={`/produtos?categoria=${encodeURIComponent(cat.slug)}`}
                className="group flex flex-col items-center gap-2 shrink-0"
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-border group-hover:border-primary transition-colors">
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <span className="text-xs sm:text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors whitespace-nowrap">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
          <button
            onClick={() => catScrollRef.current?.scrollBy({ left: 200, behavior: 'smooth' })}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-1.5 bg-background/80 border border-border rounded-full shadow-md opacity-0 group-hover/scroll:opacity-100 transition-opacity hover:bg-primary hover:text-primary-foreground"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Product sections by category */}
      {productsByCategory.map(({ title, cat }) => {
        const catProducts = products.filter(p => p.category === cat);
        if (catProducts.length === 0) return null;
        return (
          <section key={cat} className="container py-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl sm:text-2xl font-bold">
                {title}
              </h2>
              <Link
                to={`/produtos?categoria=${encodeURIComponent(cat)}`}
                className="text-sm text-primary hover:underline font-medium"
              >
                Ver todos →
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {catProducts.slice(0, 4).map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          </section>
        );
      })}

      {/* Benefits Bar */}
      <section className="bg-card border-y border-border py-10">
        <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Truck, title: "Frete grátis para todo o Brasil", desc: "Receba seu pedido no conforto da sua casa com entrega garantida e segurada." },
            { icon: HeadphonesIcon, title: "Suporte ao Cliente", desc: "Atendimento Seg. a Sex. 10h às 17h" },
            { icon: Star, title: "Cliente Satisfeito", desc: "Prazo de envio 2 a 5 dias. Prazo de entrega de 1 semana." },
            { icon: ShieldCheck, title: "Compra segura", desc: "Utilizamos a mesma segurança de dados dos maiores bancos (SSL)." },
          ].map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-start gap-4 p-4"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                <b.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-sm mb-1">{b.title}</h3>
                <p className="text-xs text-muted-foreground">{b.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Index;
