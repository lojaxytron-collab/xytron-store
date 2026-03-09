import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cartStore";
import { Link } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const CartDrawer = () => {
  const { items, isOpen, setOpen, removeItem, updateQuantity, total, clearCart } = useCart();

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent side="right" className="w-full sm:max-w-md bg-card flex flex-col">
        <SheetHeader>
          <SheetTitle className="font-display flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-primary" />
            Seu Carrinho
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <ShoppingBag className="w-12 h-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-sm">Seu carrinho está vazio</p>
            <button
              onClick={() => setOpen(false)}
              className="mt-4 text-primary text-sm font-medium hover:underline"
            >
              Continuar comprando
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto space-y-4 py-4">
              {items.map((item) => (
                <div
                  key={`${item.product.id}-${item.size}`}
                  className="flex gap-3 p-3 rounded-lg bg-secondary/50"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.product.name}</p>
                    <p className="text-xs text-muted-foreground">Tam: {item.size}</p>
                    <p className="text-sm font-bold text-primary mt-1">
                      R$ {(item.product.price * item.quantity).toFixed(2).replace(".", ",")}
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <button
                      onClick={() => removeItem(item.product.id, item.size)}
                      className="text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                        className="p-1 rounded bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                        className="p-1 rounded bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-display font-semibold">Total:</span>
                <span className="text-xl font-bold text-primary">
                  R$ {total().toFixed(2).replace(".", ",")}
                </span>
              </div>
              <Link
                to="/checkout"
                onClick={() => setOpen(false)}
                className="block w-full bg-primary text-primary-foreground text-center font-semibold py-3 rounded-lg hover:opacity-90 transition-opacity neon-glow"
              >
                Finalizar Compra
              </Link>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
