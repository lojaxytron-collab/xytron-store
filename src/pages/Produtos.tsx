import { useState, useMemo } from "react";
import { products, categories } from "@/lib/mockData";
import ProductCard from "@/components/ProductCard";
import { SlidersHorizontal, X } from "lucide-react";

const Produtos = () => {
  const [category, setCategory] = useState("Todos");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (category !== "Todos" && p.category !== category) return false;
      if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
      return true;
    });
  }, [category, priceRange]);

  return (
    <div className="min-h-screen">
      <div className="container py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display text-3xl font-bold">
            Nossos <span className="text-primary">Produtos</span>
          </h1>
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="md:hidden flex items-center gap-2 text-sm text-muted-foreground"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filtros
          </button>
        </div>

        <div className="flex gap-8">
          {/* Filters sidebar */}
          <aside className={`${filtersOpen ? "block" : "hidden"} md:block w-full md:w-56 shrink-0 fixed md:static inset-0 z-40 bg-background md:bg-transparent p-6 md:p-0`}>
            <div className="flex items-center justify-between md:hidden mb-4">
              <span className="font-display font-semibold">Filtros</span>
              <button onClick={() => setFiltersOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mb-6">
              <h3 className="text-xs uppercase tracking-wider text-muted-foreground mb-3 font-display">Categoria</h3>
              <div className="flex flex-col gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => { setCategory(cat); setFiltersOpen(false); }}
                    className={`text-left text-sm px-3 py-2 rounded-lg transition-colors ${
                      category === cat
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-secondary"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs uppercase tracking-wider text-muted-foreground mb-3 font-display">Preço</h3>
              <div className="space-y-2">
                {[
                  { label: "Até R$ 150", range: [0, 150] as [number, number] },
                  { label: "R$ 150 - R$ 300", range: [150, 300] as [number, number] },
                  { label: "Acima de R$ 300", range: [300, 500] as [number, number] },
                  { label: "Todos os preços", range: [0, 500] as [number, number] },
                ].map((opt) => (
                  <button
                    key={opt.label}
                    onClick={() => { setPriceRange(opt.range); setFiltersOpen(false); }}
                    className={`text-left text-sm w-full px-3 py-2 rounded-lg transition-colors ${
                      priceRange[0] === opt.range[0] && priceRange[1] === opt.range[1]
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-secondary"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Product grid */}
          <div className="flex-1">
            {filtered.length === 0 ? (
              <p className="text-center text-muted-foreground py-16">Nenhum produto encontrado.</p>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Produtos;
