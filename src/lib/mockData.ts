export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  sizes: string[];
  description: string;
  badge?: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: 'Camiseta Oversized "Neon Edge"',
    price: 149.90,
    originalPrice: 199.90,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop",
    category: "Camisetas",
    sizes: ["P", "M", "G", "GG"],
    description: "Camiseta oversized premium com acabamento de primeira linha. Tecido 100% algodão penteado, caimento solto e confortável.",
    badge: "30% OFF",
  },
  {
    id: "2",
    name: 'Calça Cargo "Street Flow"',
    price: 229.90,
    originalPrice: 329.90,
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&h=600&fit=crop",
    category: "Calças",
    sizes: ["38", "40", "42", "44"],
    description: "Calça cargo com bolsos laterais, tecido resistente e confortável. Perfeita para o dia a dia com estilo streetwear.",
    badge: "30% OFF",
  },
  {
    id: "3",
    name: 'Moletom "Dark Matter"',
    price: 279.90,
    originalPrice: 399.90,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=600&fit=crop",
    category: "Moletons",
    sizes: ["P", "M", "G", "GG"],
    description: "Moletom canguru em algodão fleece premium. Capuz ajustável e bolso frontal. Interior peluciado para máximo conforto.",
    badge: "30% OFF",
  },
  {
    id: "4",
    name: 'Jaqueta Corta-Vento "Cyber"',
    price: 349.90,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=600&fit=crop",
    category: "Jaquetas",
    sizes: ["P", "M", "G", "GG"],
    description: "Jaqueta corta-vento impermeável com design futurista. Leve, compacta e ideal para qualquer clima.",
  },
  {
    id: "5",
    name: 'Bermuda "Urban Core"',
    price: 159.90,
    originalPrice: 199.90,
    image: "https://images.unsplash.com/photo-1565084888279-aca607ecce0c?w=600&h=600&fit=crop",
    category: "Bermudas",
    sizes: ["38", "40", "42", "44"],
    description: "Bermuda streetwear com tecido tech e acabamento premium. Elástico na cintura para maior conforto.",
    badge: "20% OFF",
  },
  {
    id: "6",
    name: 'Camiseta "Minimal Black"',
    price: 119.90,
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&h=600&fit=crop",
    category: "Camisetas",
    sizes: ["P", "M", "G", "GG"],
    description: "Camiseta básica premium em algodão pima. Corte regular, gola reforçada e durabilidade excepcional.",
  },
  {
    id: "7",
    name: 'Boné Snapback "XYTRON"',
    price: 89.90,
    image: "https://images.unsplash.com/photo-1588850561407-ed78c334e67a?w=600&h=600&fit=crop",
    category: "Acessórios",
    sizes: ["Único"],
    description: "Boné snapback com logo bordado XYTRON. Aba reta, ajuste traseiro e tecido de alta qualidade.",
  },
  {
    id: "8",
    name: 'Moletom Zip "Phantom"',
    price: 299.90,
    originalPrice: 419.90,
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&h=600&fit=crop",
    category: "Moletons",
    sizes: ["P", "M", "G", "GG"],
    description: "Moletom com zíper full e capuz. Tecido premium com toque macio e caimento perfeito.",
    badge: "28% OFF",
  },
];

export const categories = ["Todos", "Camisetas", "Calças", "Moletons", "Jaquetas", "Bermudas", "Acessórios"];

export const reviews = [
  {
    id: 1,
    name: "Lucas M.",
    rating: 5,
    text: "Qualidade incrível! O moletom chegou super rápido e o tecido é muito bom. Recomendo demais!",
    date: "2 dias atrás",
  },
  {
    id: 2,
    name: "Ana Paula S.",
    rating: 5,
    text: "Melhor loja de streetwear que já comprei. A camiseta oversized ficou perfeita, caimento show!",
    date: "5 dias atrás",
  },
  {
    id: 3,
    name: "Rafael C.",
    rating: 4,
    text: "Produto de qualidade e entrega dentro do prazo. A calça cargo é muito estilosa, adorei!",
    date: "1 semana atrás",
  },
  {
    id: 4,
    name: "Mariana L.",
    rating: 5,
    text: "Comprei 3 peças e todas vieram impecáveis. O atendimento via WhatsApp foi sensacional!",
    date: "2 semanas atrás",
  },
];
