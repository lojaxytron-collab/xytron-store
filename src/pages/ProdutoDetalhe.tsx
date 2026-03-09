import { useParams, Link } from "react-router-dom";
import { products } from "@/lib/mockData";
import { useCart } from "@/lib/cartStore";
import { useState } from "react";
import { ChevronLeft, Truck, ShieldCheck, Minus, Plus } from "lucide-react";
import { motion } from "framer-motion";

const ProdutoDetalhe = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState("");
  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <div className="container py-20 text-center">
        <p className="text-muted-foreground">Produto não encontrado.</p>
        <Link to="/produtos" className="text-primary hover:underline mt-4 inline-block">Voltar para produtos</Link>
      </div>
    );
  }

  const handleAdd = () => {
    if (!selectedSize) return;
    for (let i = 0; i < qty; i++) {
      addItem(product, selectedSize);
    }
  };

  return (
    <div className="container py-8">
      <Link to="/produtos" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6">
        <ChevronLeft className="w-4 h-4" /> Voltar para produtos
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="aspect-square rounded-xl overflow-hidden bg-card border border-border"
        >
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </motion.div>

        {/* Details */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col"
        >
          {product.badge && (
            <span className="self-start bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded mb-3">
              {product.badge}
            </span>
          )}

          <h1 className="font-display text-2xl sm:text-3xl font-bold mb-4">{product.name}</h1>

          <div className="flex items-center gap-3 mb-2">
            <span className="text-primary text-3xl font-bold">
              R$ {product.price.toFixed(2).replace(".", ",")}
            </span>
            {product.originalPrice && (
              <span className="text-muted-foreground line-through text-lg">
                R$ {product.originalPrice.toFixed(2).replace(".", ",")}
              </span>
            )}
          </div>

          <p className="text-sm text-muted-foreground mb-6">
            ou 12x de R$ {(product.price / 12).toFixed(2).replace(".", ",")} sem juros
          </p>

          {/* Size */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold mb-3 font-display">Tamanho</h3>
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
            {!selectedSize && (
              <p className="text-xs text-muted-foreground mt-2">Selecione um tamanho</p>
            )}
          </div>

          {/* Quantity */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold mb-3 font-display">Quantidade</h3>
            <div className="flex items-center gap-3">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-2 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors">
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center font-semibold">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="p-2 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors">
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Add to cart */}
          <button
            onClick={handleAdd}
            disabled={!selectedSize}
            className="w-full bg-primary text-primary-foreground font-bold py-3.5 rounded-lg text-lg hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed neon-glow mb-6"
          >
            Adicionar ao Carrinho
          </button>

          {/* Description */}
          <div className="border-t border-border pt-6 mb-6">
            <h3 className="font-display font-semibold mb-3">Descrição</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>
          </div>

          {/* Delivery info */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <Truck className="w-5 h-5 text-primary shrink-0" />
              <div>
                <p className="font-medium">Frete para todo Brasil</p>
                <p className="text-muted-foreground text-xs">Prazo médio: 5-10 dias úteis após confirmação</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
              <div>
                <p className="font-medium">Compra 100% Segura</p>
                <p className="text-muted-foreground text-xs">Pagamento via Pix, Cartão ou Boleto</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProdutoDetalhe;
