import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";

const CheckoutForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setMessage(null);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin + "/payment-success",
      },
      redirect: "if_required",
    });

    if (error) {
      setMessage(error.message ?? "เกิดข้อผิดพลาดในการชำระเงิน");
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      setMessage("✅ ชำระเงินสำเร็จแล้ว!");
      setTimeout(() => {
        navigate("/orders");
      }, 1500)
    } else {
      setMessage("สถานะการชำระเงิน: " + paymentIntent?.status);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />

      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition disabled:opacity-50"
      >
        {loading ? "กำลังชำระเงิน..." : "ยืนยันการชำระเงิน"}
      </button>

      {message && (
        <p className="text-center text-sm text-gray-700 mt-3">{message}</p>
      )}
    </form>
  );
};

export default CheckoutForm;
