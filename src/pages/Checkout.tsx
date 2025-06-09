
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OrderSummary from "@/components/OrderSummary";
import { FoodItem } from "@/components/FoodCard";

type CartItem = {
  item: FoodItem;
  quantity: number;
};

const Checkout = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [deliveryMethod, setDeliveryMethod] = useState("delivery");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    // Load cart items from localStorage
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart from localStorage", e);
      }
    }
  }, []);

  const updateQuantity = (itemId: number, newQuantity: number) => {
    const updatedCart = cartItems.map(cartItem => 
      cartItem.item.id === itemId ? { ...cartItem, quantity: newQuantity } : cartItem
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeItem = (itemId: number) => {
    const updatedCart = cartItems.filter(cartItem => cartItem.item.id !== itemId);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast({
      title: "Đã xóa sản phẩm khỏi giỏ hàng",
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      toast({
        title: "Giỏ hàng trống",
        description: "Vui lòng thêm món ăn vào giỏ hàng",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Đặt hàng thành công!",
      description: "Đơn hàng của bạn đã được tiếp nhận",
    });
    
    // Clear cart
    setCartItems([]);
    localStorage.removeItem("cart");
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-primary/10 py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Thanh toán</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hoàn tất đơn hàng của bạn
            </p>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold mb-4">Giỏ hàng của bạn đang trống</h2>
              <p className="text-gray-600 mb-6">Hãy thêm món ăn vào giỏ hàng của bạn</p>
              <Link to="/menu">
                <Button className="bg-primary hover:bg-primary/90">
                  Xem thực đơn
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold mb-4">Phương thức giao hàng</h2>
                    <RadioGroup 
                      defaultValue="delivery" 
                      value={deliveryMethod}
                      onValueChange={setDeliveryMethod}
                      className="space-y-3"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="delivery" id="delivery" />
                        <Label htmlFor="delivery" className="font-medium">Giao hàng tận nơi</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="pickup" id="pickup" />
                        <Label htmlFor="pickup" className="font-medium">Đến lấy tại nhà hàng</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold mb-4">
                      {deliveryMethod === "delivery" ? "Thông tin giao hàng" : "Thông tin người đặt"}
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <Label htmlFor="name">Họ tên</Label>
                        <Input id="name" placeholder="Nhập họ tên của bạn" required />
                      </div>
                      <div>
                        <Label htmlFor="phone">Số điện thoại</Label>
                        <Input id="phone" placeholder="Nhập số điện thoại" required />
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="Nhập email của bạn" />
                    </div>
                    
                    {deliveryMethod === "delivery" && (
                      <div className="mb-4">
                        <Label htmlFor="address">Địa chỉ giao hàng</Label>
                        <Textarea id="address" placeholder="Nhập địa chỉ giao hàng chi tiết" required />
                      </div>
                    )}
                    
                    {deliveryMethod === "pickup" && (
                      <div className="mb-4 p-4 bg-gray-50 rounded-md">
                        <h3 className="font-semibold mb-2">Địa chỉ nhà hàng:</h3>
                        <p>123 Đường Lê Lợi, Quận 1, TP. Hồ Chí Minh</p>
                        <p className="text-sm text-gray-600 mt-2">
                          Vui lòng đến đúng giờ để nhận đơn hàng của bạn.
                        </p>
                      </div>
                    )}
                    
                    <div>
                      <Label htmlFor="notes">Ghi chú</Label>
                      <Textarea id="notes" placeholder="Ghi chú đặc biệt cho đơn hàng" />
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold mb-4">Phương thức thanh toán</h2>
                    <RadioGroup defaultValue="cash" className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="cash" id="cash" />
                        <Label htmlFor="cash" className="font-medium">Tiền mặt khi nhận hàng</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="bank" id="bank" />
                        <Label htmlFor="bank" className="font-medium">Chuyển khoản ngân hàng</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card" className="font-medium">Thẻ tín dụng/Ghi nợ</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary/90 text-lg py-6"
                    disabled={isLoading}
                  >
                    {isLoading ? "Đang xử lý..." : "Đặt hàng"}
                  </Button>
                </form>
              </div>
              
              <div>
                <OrderSummary 
                  cartItems={cartItems}
                  onUpdateQuantity={updateQuantity}
                  onRemoveItem={removeItem}
                />
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Checkout;
