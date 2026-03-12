import { useCart } from "@/lib/cartStore";
import { Link } from "react-router-dom";
import { Trash2, CreditCard, QrCode, MessageCircle, Mail, Phone, Copy, Check, Loader2 } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const WHATSAPP_URL = "https://wa.me/5515997421264?text=Confirmar%20Pedido%20%F0%9F%93%A6%E2%98%91";

const PIX_KEYS = [
  { type: "E-mail", value: "lojaxytron@gmail.com", icon: Mail },
  { type: "Telefone", value: "15997421264", icon: Phone },
];

const Checkout = () => {
  const { items, removeItem, total, clearCart } = useCart();
  const [coupon, setCoupon] = useState("");
  const [showPix, setShowPix] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCopyKey = (value: string) => {
    navigator.clipboard.writeText(value);
    setCopiedKey(value);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleStripeCheckout = async (paymentMethod: "card" | "pix") => {
    setIsProcessing(true);
    try {
      const cartItems = items.map((item) => ({
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        size: item.size,
        image: item.product.image,
      }));

      const { data, error } = await supabase.functions.invoke("create-payment", {
        body: { items: cartItems, paymentMethod },
      });

      if (error) throw error;
      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error("Stripe checkout error:", err);
      alert("Erro ao processar pagamento. Tente novamente.");
    } finally {
      setIsProcessing(false);
    }
  };

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
              <h3 className="text-xs uppercase tracking-wider text-muted-foreground font-display">Nós Aceitamos</h3>
              <div className="flex flex-wrap gap-2">
                {["Visa", "Mastercard", "Elo", "Pix"].map((m) => (
                  <span key={m} className="bg-secondary border border-border px-3 py-1.5 rounded text-xs font-medium">
                    {m}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <h3 className="text-xs uppercase tracking-wider text-muted-foreground font-display">Formas de Pagamento</h3>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setShowPix(true)}
                  className={`flex flex-col items-center gap-1 p-3 rounded-lg transition-colors text-xs ${showPix ? 'bg-primary text-primary-foreground' : 'bg-secondary hover:bg-primary hover:text-primary-foreground'}`}
                >
                  <QrCode className="w-5 h-5" />
                  Pix
                </button>
                <button
                  onClick={() => setShowPix(false)}
                  className={`flex flex-col items-center gap-1 p-3 rounded-lg transition-colors text-xs ${!showPix ? 'bg-primary text-primary-foreground' : 'bg-secondary hover:bg-primary hover:text-primary-foreground'}`}
                >
                  <CreditCard className="w-5 h-5" />
                  Cartão
                </button>
              </div>
            </div>

            {/* Card payment via Stripe */}
            {!showPix && (
              <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="bg-secondary rounded-lg p-4 space-y-3">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground font-display">Pagar com Cartão</p>
                  <p className="text-sm text-muted-foreground">
                    Pagamento seguro via Stripe. Aceita Visa, Mastercard, Elo e mais.
                  </p>
                  <button
                    onClick={() => handleStripeCheckout("card")}
                    disabled={isProcessing}
                    className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold py-3 px-5 rounded-lg hover:opacity-90 transition-opacity text-sm disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Processando...
                      </>
                    ) : (
                      <>
                        <CreditCard className="w-5 h-5" />
                        Pagar R$ {total().toFixed(2).replace(".", ",")}
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Pix payment via Stripe */}
            {showPix && (
              <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="bg-secondary rounded-lg p-4 space-y-3">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground font-display">Pagar com Pix</p>
                  <p className="text-sm text-muted-foreground">
                    Pague via Pix com QR Code gerado automaticamente pelo Stripe.
                  </p>
                  <button
                    onClick={() => handleStripeCheckout("pix")}
                    disabled={isProcessing}
                    className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold py-3 px-5 rounded-lg hover:opacity-90 transition-opacity text-sm disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Gerando QR Code...
                      </>
                    ) : (
                      <>
                        <QrCode className="w-5 h-5" />
                        Pagar R$ {total().toFixed(2).replace(".", ",")} via Pix
                      </>
                    )}
                  </button>
                </div>

                {/* Manual Pix keys as fallback */}
                <div className="bg-secondary rounded-lg p-4 space-y-3">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground font-display">Ou use nossas chaves Pix</p>
                  {PIX_KEYS.map(({ type, value, icon: Icon }) => (
                    <div key={value} className="flex items-center gap-3 bg-background/50 rounded-lg p-3 border border-border">
                      <Icon className="w-4 h-4 text-primary shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{type}</p>
                        <p className="text-sm font-bold text-primary select-all truncate">{value}</p>
                      </div>
                      <button
                        onClick={() => handleCopyKey(value)}
                        className="shrink-0 p-1.5 rounded-md hover:bg-secondary transition-colors"
                        title="Copiar chave"
                      >
                        {copiedKey === value ? (
                          <Check className="w-4 h-4 text-success" />
                        ) : (
                          <Copy className="w-4 h-4 text-muted-foreground" />
                        )}
                      </button>
                    </div>
                  ))}
                </div>

                <div className="bg-secondary rounded-lg p-4 text-center space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Envie o comprovante em nosso WhatsApp e vamos confirmar o pedido 🚀
                  </p>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => { e.preventDefault(); window.open(WHATSAPP_URL, '_blank'); }}
                    className="inline-flex items-center gap-2 bg-[hsl(142,70%,40%)] text-primary-foreground font-bold py-2.5 px-5 rounded-lg hover:opacity-90 transition-opacity text-sm"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Enviar comprovante via WhatsApp
                  </a>
                </div>
              </div>
            )}

            <p className="text-xs text-center text-muted-foreground">
              Vendido e entregue por <strong>LOJA XYTRON</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
