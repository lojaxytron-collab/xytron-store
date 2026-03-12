import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface CartItem {
  name: string;
  price: number;
  quantity: number;
  size: string;
  image?: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { items, paymentMethod, customerName, customerEmail, customerPhone } = await req.json() as {
      items: CartItem[];
      paymentMethod?: string;
      customerName?: string;
      customerEmail?: string;
      customerPhone?: string;
    };

    if (!items || items.length === 0) {
      throw new Error("Carrinho vazio");
    }

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2025-08-27.basil",
    });

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const line_items = items.map((item) => ({
      price_data: {
        currency: "brl",
        product_data: {
          name: item.name,
          description: `Tamanho: ${item.size}`,
          ...(item.image ? { images: [item.image] } : {}),
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    const isPix = paymentMethod === "pix";

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      payment_method_types: isPix ? ["pix"] : ["card"],
      success_url: `${req.headers.get("origin")}/payment-success`,
      cancel_url: `${req.headers.get("origin")}/checkout`,
    });

    // Save order to database
    await supabaseAdmin.from("orders").insert({
      customer_name: customerName || "",
      customer_email: customerEmail || session.customer_email || "",
      customer_phone: customerPhone || "",
      payment_method: isPix ? "pix" : "card",
      payment_status: "pending",
      stripe_session_id: session.id,
      total_amount: totalAmount,
      items: items,
      status: "pending",
    });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
