
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { FoodItem } from "./FoodCard";

type CartItem = {
  item: FoodItem;
  quantity: number;
};

type OrderSummaryProps = {
  cartItems: CartItem[];
  onUpdateQuantity: (itemId: number, newQuantity: number) => void;
  onRemoveItem: (itemId: number) => void;
};

const OrderSummary = ({ cartItems, onUpdateQuantity, onRemoveItem }: OrderSummaryProps) => {
  const [couponCode, setCouponCode] = useState("");
  const [selectedCoupon, setSelectedCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const { toast } = useToast();

  // Mock coupon codes
  const validCoupons = [
    { code: "WELCOME10", discount: 0.1, description: "Giảm 10% tổng đơn hàng" },
    { code: "SPECIAL20", discount: 0.2, description: "Giảm 20% tổng đơn hàng" },
    { code: "FREESHIP", discount: 30000, description: "Miễn phí vận chuyển" },
  ];

  const subtotal = cartItems.reduce(
    (sum, cartItem) => sum + cartItem.item.price * cartItem.quantity,
    0
  );
  
  const deliveryFee = subtotal > 300000 ? 0 : 30000;
  const total = subtotal + deliveryFee - discount;

  useEffect(() => {
    // Reset discount when cart changes
    if (selectedCoupon || couponCode) {
      const couponToApply = selectedCoupon || couponCode;
      const coupon = validCoupons.find(
        (c) => c.code.toLowerCase() === couponToApply.toLowerCase()
      );
      
      if (coupon) {
        const discountAmount = typeof coupon.discount === "number" && coupon.discount <= 1
          ? Math.round(subtotal * coupon.discount)
          : coupon.discount;
        
        setDiscount(discountAmount);
      }
    }
  }, [cartItems, selectedCoupon, couponCode, subtotal]);

  const applyCoupon = () => {
    const coupon = validCoupons.find(
      (c) => c.code.toLowerCase() === couponCode.toLowerCase()
    );
    
    if (coupon) {
      const discountAmount = typeof coupon.discount === "number" && coupon.discount <= 1
        ? Math.round(subtotal * coupon.discount)
        : coupon.discount;
      
      setDiscount(discountAmount);
      setSelectedCoupon(coupon.code);
      toast({
        title: "Áp dụng mã giảm giá thành công!",
        description: `Bạn đã được giảm ${discountAmount.toLocaleString()} ₫`,
      });
    } else {
      toast({
        title: "Mã giảm giá không hợp lệ",
        description: "Vui lòng kiểm tra lại mã giảm giá",
        variant: "destructive",
      });
    }
  };

  const handleSelectCoupon = (value: string) => {
    setSelectedCoupon(value);
    setCouponCode(value);
    
    const coupon = validCoupons.find(c => c.code === value);
    if (coupon) {
      const discountAmount = typeof coupon.discount === "number" && coupon.discount <= 1
        ? Math.round(subtotal * coupon.discount)
        : coupon.discount;
      
      setDiscount(discountAmount);
      toast({
        title: "Áp dụng mã giảm giá thành công!",
        description: `Bạn đã được giảm ${discountAmount.toLocaleString()} ₫`,
      });
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Đơn hàng của bạn</h2>
      
      {cartItems.length === 0 ? (
        <div className="text-center py-6">
          <p className="text-gray-500">Giỏ hàng của bạn đang trống</p>
          <Button 
            variant="outline" 
            className="mt-4" 
            onClick={() => window.location.href = '/menu'}
          >
            Xem thực đơn
          </Button>
        </div>
      ) : (
        <>
          <div className="divide-y">
            {cartItems.map((cartItem) => (
              <div key={cartItem.item.id} className="py-4 flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    src={cartItem.item.image}
                    alt={cartItem.item.name}
                    className="w-16 h-16 object-cover rounded mr-4"
                  />
                  <div>
                    <h3 className="font-medium">{cartItem.item.name}</h3>
                    <p className="text-sm text-gray-500">
                      {cartItem.item.price.toLocaleString()} ₫ x {cartItem.quantity}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex border rounded mr-3">
                    <button
                      className="px-2 py-1 border-r hover:bg-gray-100"
                      onClick={() => {
                        if (cartItem.quantity > 1) {
                          onUpdateQuantity(cartItem.item.id, cartItem.quantity - 1);
                        } else {
                          onRemoveItem(cartItem.item.id);
                        }
                      }}
                    >
                      -
                    </button>
                    <span className="px-3 py-1">{cartItem.quantity}</span>
                    <button
                      className="px-2 py-1 border-l hover:bg-gray-100"
                      onClick={() => onUpdateQuantity(cartItem.item.id, cartItem.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => onRemoveItem(cartItem.item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Xóa
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 mb-4">
            <label className="block text-sm font-medium mb-2">Chọn mã giảm giá</label>
            <Select value={selectedCoupon} onValueChange={handleSelectCoupon}>
              <SelectTrigger className="mb-2">
                <SelectValue placeholder="Chọn mã giảm giá" />
              </SelectTrigger>
              <SelectContent>
                {validCoupons.map((coupon) => (
                  <SelectItem key={coupon.code} value={coupon.code}>
                    {coupon.code} - {coupon.description}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <div className="flex items-center">
              <Input
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Nhập mã giảm giá khác"
                className="mr-2"
              />
              <Button 
                onClick={applyCoupon}
                variant="outline" 
                className="whitespace-nowrap"
              >
                Áp dụng
              </Button>
            </div>
            <div className="text-xs text-gray-500 mt-2">
              Thử các mã: WELCOME10, SPECIAL20, FREESHIP
            </div>
          </div>
          
          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between">
              <span>Tạm tính:</span>
              <span>{subtotal.toLocaleString()} ₫</span>
            </div>
            <div className="flex justify-between">
              <span>Phí vận chuyển:</span>
              <span>{deliveryFee === 0 ? "Miễn phí" : `${deliveryFee.toLocaleString()} ₫`}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-primary">
                <span>Giảm giá:</span>
                <span>-{discount.toLocaleString()} ₫</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-lg pt-2 border-t">
              <span>Tổng cộng:</span>
              <span>{total.toLocaleString()} ₫</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderSummary;
