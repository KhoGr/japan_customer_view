import { useEffect, useState, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import ErrorPopup from "@/components/error/ErrorPopup";
import chatbotResponseApi from "@/api/chatbotResponseApi";
import { ChatbotResponse } from "@/types/chatbotResponse";
import { useLoading } from "@/context/LoadingContext";
import AuthChecker from "@/components/ui/AuthChecker";
import GuestRoute from "@/components/ui/GuestRoute"; // ✅ THÊM DÒNG NÀY
import ChatBot from "@/pages/chatbot/ChatBot";

// ⏳ Lazy load pages
const Index = lazy(() => import("@/pages/Index"));
const Menu = lazy(() => import("@/pages/Menu"));
const Reservation = lazy(() => import("@/pages/Reservation"));
const Checkout = lazy(() => import("@/pages/Checkout"));
const Coupons = lazy(() => import("@/pages/voucher/Coupons"));
const FoodDetail = lazy(() => import("@/pages/FoodDetail"));
const Orders = lazy(() => import("@/pages/Orders"));
const VipProgram = lazy(() => import("@/pages/vip/VipProgram"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const GoogleSuccess = lazy(() => import("@/pages/auth/GoogleSuccess"));
const Register = lazy(() => import("@/pages/auth/Register"));
const Login = lazy(() => import("@/pages/auth/Login"));

const AppRoutes = () => {
  const { error, setError } = useLoading();
  const [responses, setResponses] = useState<ChatbotResponse[]>([]);

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const res = await chatbotResponseApi.getAll();
        setResponses(res.data);
      } catch (err) {
        setError("Không thể tải dữ liệu chatbot.");
      }
    };

    fetchResponses();
  }, [setError]);

  return (
    <>
      <ErrorPopup isOpen={!!error} onClose={() => setError(null)} message={error || ""} />

      <Suspense fallback={<div>Đang tải trang...</div>}>
        <Routes>
          {/* ❌ Guest-only routes */}
          <Route
            path="/account/login"
            element={
              <GuestRoute>
                <Login />
              </GuestRoute>
            }
          />
          <Route
            path="/account/register"
            element={
              <GuestRoute>
                <Register />
              </GuestRoute>
            }
          />
          <Route path="/google-success" element={<GoogleSuccess />} />

          {/* ✅ Authenticated routes */}
          <Route
            path="/"
            element={
              <AuthChecker>
                <Index />
              </AuthChecker>
            }
          />
          <Route
            path="/menu"
            element={
              <AuthChecker>
                <Menu />
              </AuthChecker>
            }
          />
          <Route
            path="/reservation"
            element={
              <AuthChecker>
                <Reservation />
              </AuthChecker>
            }
          />
          <Route
            path="/checkout"
            element={
              <AuthChecker>
                <Checkout />
              </AuthChecker>
            }
          />
          <Route
            path="/coupons"
            element={
              <AuthChecker>
                <Coupons />
              </AuthChecker>
            }
          />
          <Route
            path="/food/:id"
            element={
              <AuthChecker>
                <FoodDetail />
              </AuthChecker>
            }
          />
          <Route
            path="/orders"
            element={
              <AuthChecker>
                <Orders />
              </AuthChecker>
            }
          />
          <Route
            path="/vip"
            element={
              <AuthChecker>
                <VipProgram />
              </AuthChecker>
            }
          />
          <Route
            path="*"
            element={
              <AuthChecker>
                <NotFound />
              </AuthChecker>
            }
          />
        </Routes>
      </Suspense>

      <ChatBot responses={responses} />
    </>
  );
};

export default AppRoutes;
