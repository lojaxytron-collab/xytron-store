import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useTheme } from "@/lib/themeStore";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import Index from "./pages/Index";
import Produtos from "./pages/Produtos";
import ProdutoDetalhe from "./pages/ProdutoDetalhe";
import Checkout from "./pages/Checkout";
import Sobre from "./pages/Sobre";
import Contato from "./pages/Contato";
import PaymentSuccess from "./pages/PaymentSuccess";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

import PoliticaReembolso from "./pages/PoliticaReembolso";
import PoliticaPrivacidade from "./pages/PoliticaPrivacidade";
import TermosDeUso from "./pages/TermosDeUso";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const { theme } = useTheme();

  return (
    <div data-theme={theme}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Admin routes (no header/footer) */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminDashboard />} />

              {/* Store routes */}
              <Route
                path="*"
                element={
                  <>
                    <Header />
                    <CartDrawer />
                    <main className="min-h-screen">
                      <Routes>
                        <Route path="/" element={<Index />} />
                        <Route path="/produtos" element={<Produtos />} />
                        <Route path="/produto/:id" element={<ProdutoDetalhe />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/sobre" element={<Sobre />} />
                        <Route path="/contato" element={<Contato />} />
                        <Route path="/payment-success" element={<PaymentSuccess />} />
                        <Route path="/politica-reembolso" element={<PoliticaReembolso />} />
                        <Route path="/politica-privacidade" element={<PoliticaPrivacidade />} />
                        <Route path="/termos-de-uso" element={<TermosDeUso />} />
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </main>
                    <Footer />
                  </>
                }
              />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </div>
  );
};

export default App;
