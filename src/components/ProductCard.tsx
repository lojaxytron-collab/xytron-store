import { Link } from "react-router-dom";
import { Product } from "@/lib/mockData";
import { useCart } from "@/lib/cartStore";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const { addItem } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="group bg-card rounded-lg border border-border overflow-hidden hover:border-primary/50 transition-all duration-300">
      
      <Link to={`/produto/${product.id}`} className="block relative aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy" />
        
        {product.badge &&
        <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded">
            Economize {product.badge.replace(" OFF", "")}
          </span>
        }
      </Link>

      <div className="p-4">
        <Link to={`/produto/${product.id}`}>
          <h3 className="font-display font-semibold text-sm mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-2 mb-1">
          {product.originalPrice &&
          <span className="text-muted-foreground text-sm line-through">
              R$ {product.originalPrice.toFixed(2).replace(".", ",")}
            </span>
          }
          <span className="font-bold text-lg bg-secondary text-success">
            R$ {product.price.toFixed(2).replace(".", ",")}
          </span>
        </div>

        <p className="text-xs text-muted-foreground mb-4">
          ou em 12x de R$ {(product.price / 12).toFixed(2).replace(".", ",")}
        </p>

        <button
          onClick={() => addItem(product, product.sizes[0])}
          className="w-full text-primary-foreground text-sm font-semibold py-2.5 rounded hover:opacity-90 transition-opacity bg-success">
          
          Comprar agora
        </button>
      </div>
    </motion.div>);

};

export default ProductCard;