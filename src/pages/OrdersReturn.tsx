// pages/OrdersReturn.tsx
import { useSearchParams } from "react-router-dom";

const OrdersReturn = () => {
  const [params] = useSearchParams();
  const responseCode = params.get("vnp_ResponseCode");

  return (
    <div className="text-center py-10">
      {responseCode === "00" ? (
        <h1 className="text-green-600 text-2xl">Thanh toán thành công ✅</h1>
      ) : (
        <h1 className="text-red-600 text-2xl">Thanh toán thất bại ❌</h1>
      )}
    </div>
  );
};

export default OrdersReturn;
