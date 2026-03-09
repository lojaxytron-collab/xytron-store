import { useCart } from "@/lib/cartStore";
import { Link } from "react-router-dom";
import { Trash2, CreditCard, QrCode, MessageCircle } from "lucide-react";
import { useState } from "react";

const PIX_KEY = "15997421264";
const WHATSAPP_URL = `https://wa.me/55${PIX_KEY}?text=${encodeURIComponent("Olá! Segue o comprovante de pagamento do meu pedido na LOJA XYTRON.")}`;

const Checkout = () => {
  const { items, removeItem, total, clearCart } = useCart();
  const [coupon, setCoupon] = useState("");

  if (items.length === 0) {
    return (
      <div className="container py-20 text-center">
        <p className="text-muted-foreground mb-4">Seu carrinho está vazio.</p>
        <Link to="/produtos" className="text-primary hover:underline font-medium">Ver produtos</Link>
      </div>
    );
  }

  return (
    <div className="container py-8 max-w-4xl">
      <h1 className="font-display text-3xl font-bold mb-8">Finalizar <span className="text-primary">Compra</span></h1>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Cart items */}
        <div className="lg:col-span-3 space-y-4">
          {items.map((item) => (
            <div key={`${item.product.id}-${item.size}`} className="flex gap-4 p-4 rounded-xl bg-card border border-border">
              <img src={item.product.image} alt={item.product.name} className="w-20 h-20 object-cover rounded-lg" />
              <div className="flex-1">
                <h3 className="font-medium text-sm">{item.product.name}</h3>
                <p className="text-xs text-muted-foreground">Tam: {item.size} | Qtd: {item.quantity}</p>
                <p className="text-primary font-bold mt-1">R$ {(item.product.price * item.quantity).toFixed(2).replace(".", ",")}</p>
              </div>
              <button onClick={() => removeItem(item.product.id, item.size)} className="text-muted-foreground hover:text-destructive">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-2">
          <div className="glass rounded-xl p-6 space-y-4 sticky top-24">
            <h2 className="font-display font-semibold text-lg">Resumo</h2>

            <div className="flex gap-2">
              <input
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                placeholder="Cupom de desconto"
                className="flex-1 bg-secondary border border-border rounded-lg px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="bg-secondary text-foreground text-sm px-4 py-2 rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors">
                Aplicar
              </button>
            </div>

            <div className="border-t border-border pt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>R$ {total().toFixed(2).replace(".", ",")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Frete</span>
                <span className="text-success font-medium">Grátis</span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-2 border-t border-border">
                <span>Total</span>
                <span className="text-primary">R$ {total().toFixed(2).replace(".", ",")}</span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <h3 className="text-xs uppercase tracking-wider text-muted-foreground font-display">Formas de Pagamento</h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { icon: QrCode, label: "Pix" },
                  { icon: CreditCard, label: "Cartão" },
                ].map(({ icon: Icon, label }) => (
                  <button key={label} className="flex flex-col items-center gap-1 p-3 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors text-xs">
                    <Icon className="w-5 h-5" />
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Pix Key */}
            <div className="bg-secondary rounded-lg p-4 space-y-2">
              <p className="text-xs uppercase tracking-wider text-muted-foreground font-display">Chave Pix (Telefone)</p>
              <p className="text-lg font-bold font-display text-primary select-all">{PIX_KEY}</p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-medium text-success hover:underline mt-2"
              >
                <MessageCircle className="w-5 h-5" />
                Enviar comprovante de pagamento
              </a>
            </div>

            <button className="w-full bg-primary text-primary-foreground font-bold py-3 rounded-lg hover:opacity-90 transition-opacity neon-glow">
              Confirmar Pedido
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
