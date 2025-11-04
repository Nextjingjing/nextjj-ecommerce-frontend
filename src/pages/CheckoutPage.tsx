import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSearchParams } from "react-router-dom";
import CheckoutForm from "../components/CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const CheckoutPage: React.FC = () => {
  const [params] = useSearchParams();
  const clientSecret = params.get("clientSecret");

  if (!clientSecret) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-gray-600">
        <p className="text-lg">❌ ไม่พบ client secret</p>
        <p className="text-sm text-gray-500 mt-2">
          กรุณาเริ่มการชำระเงินจากหน้าคำสั่งซื้อใหม่อีกครั้ง
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-6 rounded-2xl shadow-lg">
        <h1 className="text-xl font-semibold text-center mb-4 text-gray-800">
          ชำระเงินด้วยบัตร
        </h1>

        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      </div>
    </div>
  );
};

export default CheckoutPage;
