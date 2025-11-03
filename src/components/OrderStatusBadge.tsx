import React from "react";

interface Props {
  status: string;
}

const OrderStatusBadge: React.FC<Props> = ({ status }) => {
  const isPaid = status === "PAID";
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${
        isPaid ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
      }`}
    >
      {isPaid ? "ชำระเงินแล้ว" : "รอดำเนินการ"}
    </span>
  );
};

export default OrderStatusBadge;
