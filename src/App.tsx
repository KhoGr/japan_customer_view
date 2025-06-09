
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NotificationProvider } from "@/context/NotificationContext";
import { VipProvider } from "@/context/VipContext";
import { LoadingProvider, useLoading } from "@/context/LoadingContext";
import Index from "./pages/Index";
import Menu from "./pages/Menu";
import Reservation from "./pages/Reservation";
import Checkout from "./pages/Checkout";
import Coupons from "./pages/Coupons";
import FoodDetail from "./pages/FoodDetail";
import NotFound from "./pages/NotFound";
import ChatBot from "./components/ChatBot";
import Orders from "./pages/Orders";
import VipProgram from "./pages/VipProgram";
import ErrorPopup from "./components/ErrorPopup";

const queryClient = new QueryClient();

const AppContent = () => {
  const { error, setError } = useLoading();

  return (
    <>
      <ErrorPopup 
        isOpen={!!error} 
        onClose={() => setError(null)} 
        message={error || ""} 
      />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/coupons" element={<Coupons />} />
        <Route path="/food/:id" element={<FoodDetail />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/vip" element={<VipProgram />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ChatBot />
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LoadingProvider>
      <NotificationProvider>
        <VipProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <AppContent />
            </BrowserRouter>
          </TooltipProvider>
        </VipProvider>
      </NotificationProvider>
    </LoadingProvider>
  </QueryClientProvider>
);

export default App;
