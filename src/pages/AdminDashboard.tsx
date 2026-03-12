import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import {
  Package, LogOut, Loader2, Eye, Truck, CheckCircle, XCircle, Clock,
  RefreshCw, Search
} from "lucide-react";

interface Order {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  payment_method: string;
  payment_status: string;
  stripe_session_id: string | null;
  total_amount: number;
  items: any[];
  notes: string;
  shipping_address: string;
  tracking_code: string;
  status: string;
  created_at: string;
  updated_at: string;
}

const statusColors: Record<string, string> = {
  pending: "bg-yellow-500/20 text-yellow-400",
  confirmed: "bg-blue-500/20 text-blue-400",
  shipped: "bg-purple-500/20 text-purple-400",
  delivered: "bg-green-500/20 text-green-400",
  cancelled: "bg-red-500/20 text-red-400",
};

const statusLabels: Record<string, string> = {
  pending: "Pendente",
  confirmed: "Confirmado",
  shipped: "Enviado",
  delivered: "Entregue",
  cancelled: "Cancelado",
};

const AdminDashboard = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const navigate = useNavigate();

  const fetchOrders = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching orders:", error);
      // If RLS blocks, user is not admin
      navigate("/admin/login");
      return;
    }
    setOrders((data as Order[]) || []);
    setLoading(false);
  };

  useEffect(() => {
    // Check auth
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        navigate("/admin/login");
        return;
      }
      fetchOrders();
    });
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    await supabase
      .from("orders")
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq("id", orderId);
    fetchOrders();
    if (selectedOrder?.id === orderId) {
      setSelectedOrder((prev) => prev ? { ...prev, status: newStatus } : null);
    }
  };

  const updateTrackingCode = async (orderId: string, code: string) => {
    await supabase
      .from("orders")
      .update({ tracking_code: code, updated_at: new Date().toISOString() })
      .eq("id", orderId);
    fetchOrders();
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customer_name.toLowerCase().includes(search.toLowerCase()) ||
      order.customer_email.toLowerCase().includes(search.toLowerCase()) ||
      order.id.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === "pending").length,
    confirmed: orders.filter((o) => o.status === "confirmed").length,
    shipped: orders.filter((o) => o.status === "shipped").length,
    delivered: orders.filter((o) => o.status === "delivered").length,
    revenue: orders
      .filter((o) => o.status !== "cancelled")
      .reduce((sum, o) => sum + Number(o.total_amount), 0),
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <Package className="w-6 h-6 text-primary" />
            <h1 className="font-display text-xl font-bold">Painel Admin — XYTRON</h1>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <LogOut className="w-4 h-4" />
            Sair
          </button>
        </div>
      </div>

      <div className="container py-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { label: "Total", value: stats.total, icon: Package },
            { label: "Pendentes", value: stats.pending, icon: Clock },
            { label: "Confirmados", value: stats.confirmed, icon: CheckCircle },
            { label: "Enviados", value: stats.shipped, icon: Truck },
            { label: "Entregues", value: stats.delivered, icon: CheckCircle },
            { label: "Receita", value: `R$ ${stats.revenue.toFixed(2).replace(".", ",")}`, icon: Package },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Icon className="w-4 h-4" />
                <span className="text-xs uppercase tracking-wider">{label}</span>
              </div>
              <p className="text-lg font-bold">{value}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por nome, email ou ID..."
              className="w-full bg-secondary border border-border rounded-lg pl-10 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-secondary border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">Todos os status</option>
            <option value="pending">Pendente</option>
            <option value="confirmed">Confirmado</option>
            <option value="shipped">Enviado</option>
            <option value="delivered">Entregue</option>
            <option value="cancelled">Cancelado</option>
          </select>
          <button onClick={fetchOrders} className="flex items-center gap-2 bg-secondary border border-border rounded-lg px-4 py-2.5 text-sm hover:bg-primary hover:text-primary-foreground transition-colors">
            <RefreshCw className="w-4 h-4" />
            Atualizar
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Nenhum pedido encontrado.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="bg-card border border-border rounded-xl p-4 hover:border-primary/30 transition-colors cursor-pointer"
                onClick={() => setSelectedOrder(selectedOrder?.id === order.id ? null : order)}
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground font-mono">#{order.id.slice(0, 8)}</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[order.status] || statusColors.pending}`}>
                        {statusLabels[order.status] || order.status}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-xs bg-secondary">
                        {order.payment_method === "pix" ? "Pix" : "Cartão"}
                      </span>
                    </div>
                    <p className="text-sm font-medium">
                      {order.customer_name || order.customer_email || "Cliente anônimo"}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-primary font-bold">
                      R$ {Number(order.total_amount).toFixed(2).replace(".", ",")}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(order.created_at).toLocaleDateString("pt-BR")}
                    </span>
                    <Eye className="w-4 h-4 text-muted-foreground" />
                  </div>
                </div>

                {/* Expanded details */}
                {selectedOrder?.id === order.id && (
                  <div className="mt-4 pt-4 border-t border-border space-y-4 animate-in fade-in slide-in-from-top-2 duration-200" onClick={(e) => e.stopPropagation()}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <p className="text-xs uppercase tracking-wider text-muted-foreground font-display">Cliente</p>
                        <p className="text-sm">{order.customer_name || "—"}</p>
                        <p className="text-sm text-muted-foreground">{order.customer_email || "—"}</p>
                        <p className="text-sm text-muted-foreground">{order.customer_phone || "—"}</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-xs uppercase tracking-wider text-muted-foreground font-display">Rastreio</p>
                        <div className="flex gap-2">
                          <input
                            defaultValue={order.tracking_code || ""}
                            placeholder="Código de rastreio"
                            className="flex-1 bg-secondary border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                            onBlur={(e) => updateTrackingCode(order.id, e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Items */}
                    <div className="space-y-2">
                      <p className="text-xs uppercase tracking-wider text-muted-foreground font-display">Itens</p>
                      <div className="space-y-1">
                        {(order.items as any[]).map((item: any, i: number) => (
                          <div key={i} className="flex justify-between text-sm bg-secondary/50 rounded-lg p-2">
                            <span>{item.name} (Tam: {item.size}) x{item.quantity}</span>
                            <span className="text-primary font-medium">R$ {(item.price * item.quantity).toFixed(2).replace(".", ",")}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Status actions */}
                    <div className="space-y-2">
                      <p className="text-xs uppercase tracking-wider text-muted-foreground font-display">Alterar Status</p>
                      <div className="flex flex-wrap gap-2">
                        {["pending", "confirmed", "shipped", "delivered", "cancelled"].map((s) => (
                          <button
                            key={s}
                            onClick={() => updateOrderStatus(order.id, s)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                              order.status === s
                                ? "bg-primary text-primary-foreground"
                                : "bg-secondary hover:bg-primary/20"
                            }`}
                          >
                            {statusLabels[s]}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
