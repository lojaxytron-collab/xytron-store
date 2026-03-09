import { useState } from "react";
import { Search, Package } from "lucide-react";

const Rastreio = () => {
  const [code, setCode] = useState("");

  return (
    <div className="container py-12 max-w-xl text-center">
      <Package className="w-12 h-12 text-primary mx-auto mb-4" />
      <h1 className="font-display text-3xl font-bold mb-2">
        Rastrear <span className="text-primary">Pedido</span>
      </h1>
      <p className="text-sm text-muted-foreground mb-8">
        Insira o código de rastreio enviado por e-mail após a confirmação do envio.
      </p>

      <form
        onSubmit={(e) => { e.preventDefault(); }}
        className="flex gap-3"
      >
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Ex: BR123456789XX"
          className="flex-1 bg-secondary border border-border rounded-lg px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button type="submit" className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
          <Search className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

export default Rastreio;
