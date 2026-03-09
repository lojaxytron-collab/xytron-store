import { useParams, Link } from "react-router-dom";
import { products } from "@/lib/mockData";
import { useCart } from "@/lib/cartStore";
import { useState, useEffect } from "react";
import { ChevronLeft, Truck, ShieldCheck, Clock, Package, CreditCard } from "lucide-react";
import { motion } from "framer-motion";
import ProductCard from "@/components/ProductCard";

const ProdutoDetalhe = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState("");
  const [mainImage, setMainImage] = useState(0);
  const [countdown, setCountdown] = useState({ h: 0, m: 0, s: 0 });

  // Countdown timer
  useEffect(() => {
    const calcCountdown = () => {
      const now = new Date();
      const end = new Date();
      end.setHours(23, 59, 59, 999);
      const diff = end.getTime() - now.getTime();
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setCountdown({ h, m, s });
    };
    calcCountdown();
    const timer = setInterval(calcCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!product) {
    return (
      <div className="container py-20 text-center">
        <p className="text-muted-foreground">Produto não encontrado.</p>
        <Link to="/produtos" className="text-primary hover:underline mt-4 inline-block">Voltar para produtos</Link>
      </div>
    );
  }

  const allImages = product.images || [product.image];
  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  const handleAdd = () => {
    if (!selectedSize) return;
    addItem(product, selectedSize);
  };

  return (
    <div className="container py-8">
      <Link to="/produtos" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6">
        <ChevronLeft className="w-4 h-4" /> Voltar para produtos
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Images */}
        <div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="aspect-square rounded-xl overflow-hidden bg-card border border-border mb-3"
          >
            <img
              src={allImages[mainImage]}
              alt={product.name}
              className="w-full h-full object-cover cursor-crosshair hover:scale-110 transition-transform duration-300"
            />
          </motion.div>
          {/* Thumbnails */}
          {allImages.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {allImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setMainImage(i)}
                  className={`w-16 h-16 rounded-lg overflow-hidden border-2 shrink-0 transition-colors ${
                    i === mainImage ? "border-primary" : "border-border"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
          <p className="text-xs text-muted-foreground mt-1">Role o mouse sob a imagem para aproximar</p>
        </div>

        {/* Details */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col">
          <h1 className="font-display text-2xl sm:text-3xl font-bold mb-3">{product.name}</h1>

          <div className="border-b border-border pb-4 mb-4">
            {product.tag && (
              <p className="text-sm font-semibold text-primary mb-2">{product.tag}</p>
            )}
          </div>

          {/* Size selector */}
          <div className="mb-4">
            <h3 className="text-sm font-semibold mb-2 font-display">Tamanho: <span className="text-muted-foreground font-normal">{selectedSize || "Selecione uma opção"}</span></h3>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 text-sm rounded-lg border transition-all ${
                    selectedSize === size
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border hover:border-primary/50 text-muted-foreground"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Variant dropdown */}
          <div className="mb-4">
            <label className="text-sm font-semibold font-display block mb-2">Variante</label>
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="w-full bg-secondary border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Selecione uma opção</option>
              {product.sizes.map((size) => (
                <option key={size} value={size}>
                  {size} - R$ {product.price.toFixed(2).replace(".", ",")}
                </option>
              ))}
            </select>
          </div>

          {/* Price */}
          <div className="mb-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Preço:</p>
            <div className="flex items-center gap-3">
              {product.originalPrice && (
                <span className="text-muted-foreground line-through text-lg">
                  R$ {product.originalPrice.toFixed(2).replace(".", ",")}
                </span>
              )}
              <span className="text-primary text-3xl font-bold">
                R$ {product.price.toFixed(2).replace(".", ",")}
              </span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              em até 12x de <strong>R$ {(product.price / 12).toFixed(2).replace(".", ",")}</strong>
            </p>
            {discount > 0 && (
              <span className="inline-block mt-2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded">
                Economize {discount}%
              </span>
            )}
          </div>

          {/* Add to cart */}
          <button
            onClick={handleAdd}
            disabled={!selectedSize}
            className="w-full bg-primary text-primary-foreground font-bold py-3.5 rounded-lg text-lg hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed neon-glow mb-4"
          >
            {selectedSize ? "Comprar agora" : "Selecione um tamanho"}
          </button>

          {/* Delivery info */}
          <div className="bg-secondary rounded-xl p-4 space-y-3 mb-4">
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-primary shrink-0" />
              <span>
                Comprando dentro das próximas{" "}
                <strong className="text-primary">
                  {countdown.h}h {countdown.m}min
                </strong>
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Truck className="w-4 h-4 text-primary shrink-0" />
              <span>Prazo médio é de 1 semana após a confirmação do envio.</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Package className="w-4 h-4 text-primary shrink-0" />
              <span>Código de rastreio liberado em até 2 dias após confirmação do envio</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold text-primary">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Produtos a pronta entrega!</span>
            </div>
          </div>

          {/* Payment methods */}
          <div className="mb-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2 font-display">Nós Aceitamos</p>
            <div className="flex items-center gap-2 flex-wrap">
              {["Visa", "Mastercard", "Elo", "Pix"].map(m => (
                <span key={m} className="bg-secondary border border-border px-3 py-1.5 rounded text-xs font-medium">
                  {m}
                </span>
              ))}
            </div>
          </div>

          <p className="text-sm text-muted-foreground">
            Vendido e entregue por <strong className="text-foreground">LOJA XYTRON</strong>.
          </p>

          {/* Description */}
          <div className="border-t border-border pt-6 mt-6">
            <h3 className="font-display font-semibold mb-3">Descrição</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>
          </div>
        </motion.div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-16">
          <h2 className="font-display text-xl font-bold mb-6">Produtos Relacionados</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedProducts.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProdutoDetalhe;
