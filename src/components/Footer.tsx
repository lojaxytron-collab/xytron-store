import { Link } from "react-router-dom";
import { Truck, HeadphonesIcon, Star, ShieldCheck, MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      {/* Benefits bar */}
      <div className="border-b border-border">
        <div className="container py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
          { icon: Truck, title: "Frete grátis para todo o Brasil", desc: "Entrega garantida e segurada pelos Correios." },
          { icon: HeadphonesIcon, title: "Suporte ao Cliente", desc: "Atendimento Seg. a Sex. 10h às 17h" },
          { icon: Star, title: "Cliente Satisfeito", desc: "Prazo de envio 2 a 5 dias. Entrega em 1 semana." },
          { icon: ShieldCheck, title: "Compra segura", desc: "Segurança de dados SSL." }].
          map((b, i) =>
          <div key={i} className="flex items-start gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                <b.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-display font-semibold text-sm">{b.title}</h4>
                <p className="text-xs text-muted-foreground">{b.desc}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-display text-xl font-bold mb-4">
              <span className="text-foreground">LOJA </span>
              <span className="text-primary neon-text">XYTRON</span>
            </h3>
            <p className="text-sm text-muted-foreground">
              Estilo, qualidade e preço justo. Tudo que você precisa em um só lugar.
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4 text-sm uppercase tracking-wider">Navegação</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-primary transition-colors">Início</Link></li>
              <li><Link to="/produtos" className="hover:text-primary transition-colors">Produtos</Link></li>
              <li><Link to="/sobre" className="hover:text-primary transition-colors">Sobre Nós</Link></li>
              <li><Link to="/contato" className="hover:text-primary transition-colors">Contato</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4 text-sm uppercase tracking-wider">Políticas</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/politica-reembolso" className="hover:text-primary transition-colors">Política de Reembolso</Link></li>
              <li><Link to="/politica-privacidade" className="hover:text-primary transition-colors">Política de Privacidade</Link></li>
              <li><Link to="/termos-de-uso" className="hover:text-primary transition-colors">Termos de Uso</Link></li>
              <li><Link to="/rastreio" className="hover:text-primary transition-colors">Rastrear Pedido</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4 text-sm uppercase tracking-wider">Atendimento</h4>
            <p className="text-sm text-muted-foreground mb-4">Seg. a Seg. — 10h às 23h</p>
            <a
              href="https://wa.me/5515997421264"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-success text-foreground text-sm font-medium px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">
              
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} LOJA XYTRON. Todos os direitos reservados.
        </div>
      </div>
    </footer>);

};

export default Footer;