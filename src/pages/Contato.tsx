import { MessageCircle, Mail, MapPin } from "lucide-react";

const Contato = () => (
  <div className="container py-12 max-w-3xl">
    <h1 className="font-display text-3xl font-bold mb-6">
      Entre em <span className="text-primary">Contato</span>
    </h1>
    <p className="text-muted-foreground text-sm mb-8">
      Tem alguma dúvida, sugestão ou precisa de ajuda com seu pedido? Fale conosco!
    </p>

    <div className="space-y-6 mb-10">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
          <Mail className="w-5 h-5 text-primary" />
        </div>
        <div>
          <p className="text-sm font-medium">E-mail</p>
          <p className="text-sm text-muted-foreground">contato@lojaxytron.com.br</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
          <MapPin className="w-5 h-5 text-primary" />
        </div>
        <div>
          <p className="text-sm font-medium">Horário de Atendimento</p>
          <p className="text-sm text-muted-foreground">Seg. a Sex. — 10h às 17h</p>
        </div>
      </div>
    </div>

    <a
      href="https://wa.me/5500000000000"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-3 bg-success text-foreground font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity text-lg"
    >
      <MessageCircle className="w-6 h-6" />
      Falar pelo WhatsApp
    </a>
  </div>
);

export default Contato;
