"use client";

import { loadStripe } from "@stripe/stripe-js";

export default function CheckoutButton() {
  const handleClick = async () => {
    const res = await fetch("/api/create-checkout-session", { method: "POST" });
    const { id } = await res.json();

    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
    );

    await stripe?.redirectToCheckout({ sessionId: id });
  };

  return (
    <button className="px-6 py-3 rounded-xl bg-blue-600 text-white">
      Payer 19,99 €
    </button>
  );
}
