import { Link } from "react-router-dom";
import { Truck, ShieldCheck, MessageCircle, HeadphonesIcon, Star, ChevronRight, ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";
import { products, categoryImages, reviews } from "@/lib/mockData";
import ProductCard from "@/components/ProductCard";
import { useState, useEffect } from "react";
import heroBanner from "@/assets/hero-banner.jpeg";

const heroSlides = [
  {
    title: "ENVIAMOS PARA TODO BRASIL",
    subtitle: "Os melhores produtos de primeira linha",
    bg: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&h=600&fit=crop",
  },
  {
    title: "ATÉ 30% OFF EM TUDO",
    subtitle: "Promoção por tempo limitado — aproveite!",
    bg: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1600&h=600&fit=crop",
  },
];

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

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
            <div className="absolute inset-0 bg-black/60" />
            <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
              <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-4 leading-tight">
                {slide.title}
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl">
                {slide.subtitle}
              </p>
            </div>
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

      {/* Category Images Row */}
      <section className="container py-10">
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
          {categoryImages.map((cat) => (
            <Link
              key={cat.slug}
              to={`/produtos?categoria=${encodeURIComponent(cat.slug)}`}
              className="group flex flex-col items-center gap-2"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-border group-hover:border-primary transition-colors">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <span className="text-xs sm:text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">
                {cat.name}
              </span>
            </Link>
          ))}
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

      {/* Reviews */}
      <section className="container py-12">
        <h2 className="font-display text-2xl font-bold text-center mb-8">
          O que nossos <span className="text-primary">clientes</span> dizem
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {reviews.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-xl p-5"
            >
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: review.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground mb-3">"{review.text}"</p>
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold">{review.name}</span>
                <span className="text-muted-foreground">{review.date}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;
