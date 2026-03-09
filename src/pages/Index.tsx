import { Link } from "react-router-dom";
import { Truck, ShieldCheck, MessageCircle, Star, Mail, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { products, reviews } from "@/lib/mockData";
import ProductCard from "@/components/ProductCard";
import { useState } from "react";

const Index = () => {
  const [email, setEmail] = useState("");
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary to-background" />
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: "radial-gradient(circle at 20% 50%, hsl(var(--neon-glow) / 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 50%, hsl(var(--neon-glow) / 0.1) 0%, transparent 50%)"
        }} />
        <div className="relative container text-center py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Bem-vindo à{" "}
              <span className="text-primary neon-text">LOJA XYTRON</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Estilo, qualidade e preço justo. Tudo que você precisa em um só lugar.
            </p>
            <Link
              to="/produtos"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-8 py-3.5 rounded-lg text-lg hover:opacity-90 transition-opacity neon-glow"
            >
              Ver Produtos
              <ChevronRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Categories marquee */}
      <div className="border-y border-border bg-card overflow-hidden py-3">
        <div className="animate-marquee whitespace-nowrap flex gap-8">
          {["CAMISETAS", "ELETRÔNICOS", "MOLETONS", "ACESSÓRIOS", "BERMUDAS", "CALÇAS", "CAMISETAS", "ELETRÔNICOS", "MOLETONS", "ACESSÓRIOS", "BERMUDAS", "CALÇAS"].map((cat, i) => (
            <span key={i} className="text-sm font-display font-medium text-muted-foreground">
              {cat} <span className="text-primary mx-2">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <section className="container py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-display text-2xl sm:text-3xl font-bold">
            Produtos em <span className="text-primary">Destaque</span>
          </h2>
          <Link to="/produtos" className="text-sm text-primary hover:underline font-medium">
            Ver todos →
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredProducts.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Truck, title: "Frete para todo Brasil", desc: "Entrega rápida e segura via Correios para qualquer lugar do país." },
            { icon: ShieldCheck, title: "Compra 100% Segura", desc: "Seus dados protegidos com a mesma segurança dos maiores bancos." },
            { icon: MessageCircle, title: "Atendimento via WhatsApp", desc: "Suporte rápido e humanizado. Estamos aqui para te ajudar!" },
          ].map((benefit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-xl p-6 text-center hover:border-primary/30 transition-colors"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <benefit.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display font-semibold mb-2">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground">{benefit.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-card border-y border-border py-16">
        <div className="container">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-center mb-10">
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
        </div>
      </section>

      {/* Newsletter */}
      <section className="container py-16">
        <div className="glass rounded-2xl p-8 sm:p-12 text-center max-w-2xl mx-auto neon-border">
          <Mail className="w-10 h-10 text-primary mx-auto mb-4" />
          <h2 className="font-display text-2xl font-bold mb-2">
            Receba ofertas e promoções exclusivas
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            Cadastre seu e-mail e fique por dentro das novidades da XYTRON.
          </p>
          <form
            onSubmit={(e) => { e.preventDefault(); setEmail(""); }}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Seu melhor e-mail"
              required
              className="flex-1 bg-secondary border border-border rounded-lg px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="submit"
              className="bg-primary text-primary-foreground font-semibold px-6 py-2.5 rounded-lg hover:opacity-90 transition-opacity"
            >
              Cadastrar
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Index;
