import { Link } from "react-router-dom";
import { MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-display text-xl font-bold mb-4">
              <span className="text-foreground">LOJA </span>
              <span className="text-primary neon-text">XYTRON</span>
            </h3>
            <p className="text-sm text-muted-foreground">
              Estilo, qualidade e preço justo. Moda streetwear para quem não segue tendências — cria as suas.
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
            <p className="text-sm text-muted-foreground mb-4">Seg. a Sex. — 10h às 17h</p>
            <a
              href="https://wa.me/5500000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-success text-foreground text-sm font-medium px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} LOJA XYTRON. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
