import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { useEffect } from "react";
import { useCart } from "@/lib/cartStore";

const PaymentSuccess = () => {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="container py-20 text-center max-w-lg mx-auto">
      <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
      <h1 className="font-display text-3xl font-bold mb-4">
        Pagamento <span className="text-primary">Confirmado!</span>
      </h1>
      <p className="text-muted-foreground mb-8">
        Obrigado pela sua compra! Você receberá um e-mail de confirmação em breve.
      </p>
      <Link
        to="/produtos"
        className="inline-block bg-primary text-primary-foreground font-bold py-3 px-8 rounded-lg hover:opacity-90 transition-opacity"
      >
        Continuar Comprando
      </Link>
    </div>
  );
};

export default PaymentSuccess;
