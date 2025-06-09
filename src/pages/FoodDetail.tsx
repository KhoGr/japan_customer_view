
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Star, ShoppingCart, MessageSquare } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FoodItem } from "@/components/FoodCard";

type Review = {
  id: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
};

// Mock data for reviews
const mockReviews = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    rating: 5,
    comment: "Món ăn rất ngon, phục vụ nhanh chóng!",
    date: "2023-05-10"
  },
  {
    id: 2,
    name: "Trần Thị B",
    rating: 4,
    comment: "Hương vị đặc biệt, sẽ quay lại lần sau.",
    date: "2023-05-08"
  },
  {
    id: 3,
    name: "Lê Văn C",
    rating: 5,
    comment: "Xuất sắc, không có gì để chê.",
    date: "2023-05-05"
  }
];

// Mock data for food items
const foodItems = [
  // Appetizers
  {
    id: 1,
    name: "Gỏi cuốn tôm thịt",
    description: "Gỏi cuốn với tôm, thịt heo và rau tươi cùng nước chấm đặc biệt",
    price: 85000,
    image: "https://images.unsplash.com/photo-1553701275-1d6118df773e?q=80&w=2070",
    category: "appetizers",
    fullDescription: "Gỏi cuốn tôm thịt là một món ăn truyền thống của Việt Nam, bao gồm tôm, thịt heo, bún, rau sống và các loại rau thơm khác được cuộn trong bánh tráng. Món ăn này thường được phục vụ kèm với nước chấm đặc biệt làm từ tương đen, đậu phộng nghiền và ớt tươi."
  },
  {
    id: 2,
    name: "Súp hải sản",
    description: "Súp hải sản thơm ngon với tôm, mực và các loại hải sản tươi ngon",
    price: 120000,
    image: "https://images.unsplash.com/photo-1594756202469-9ff9799b2e4e?q=80&w=2035",
    category: "appetizers",
    fullDescription: "Súp hải sản của chúng tôi được chế biến từ những nguyên liệu hải sản tươi ngon nhất, bao gồm tôm, mực, sò điệp và các loại hải sản khác. Món súp này được nấu trong nước dùng đậm đà với rau củ và gia vị đặc biệt, tạo nên hương vị thơm ngon khó cưỡng."
  },
  // ... Thêm các món ăn khác với fullDescription
];

const FoodDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<FoodItem | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [newReview, setNewReview] = useState({ name: "", rating: 5, comment: "" });
  const { toast } = useToast();
  
  useEffect(() => {
    // Trong thực tế, đây là nơi bạn sẽ gọi API để lấy chi tiết món ăn
    const foodItem = foodItems.find(item => item.id === Number(id));
    if (foodItem) {
      setItem(foodItem as FoodItem);
    }
    
    // Load reviews
    setReviews(mockReviews);
  }, [id]);

  const handleAddToCart = () => {
    if (!item) return;
    
    // Lấy giỏ hàng hiện tại từ localStorage
    const savedCart = localStorage.getItem("cart");
    let currentCart = savedCart ? JSON.parse(savedCart) : [];
    
    // Kiểm tra xem món ăn đã có trong giỏ hàng chưa
    const existingItemIndex = currentCart.findIndex((cartItem: any) => cartItem.item.id === item.id);
    
    if (existingItemIndex > -1) {
      currentCart[existingItemIndex].quantity += quantity;
    } else {
      currentCart.push({ item, quantity });
    }
    
    // Lưu giỏ hàng vào localStorage
    localStorage.setItem("cart", JSON.stringify(currentCart));
    
    toast({
      title: "Đã thêm vào giỏ hàng",
      description: `${quantity} x ${item.name}`,
    });
    
    // Reset số lượng
    setQuantity(1);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newReview.name.trim() || !newReview.comment.trim()) {
      toast({
        title: "Vui lòng điền đầy đủ thông tin",
        description: "Tên và nội dung đánh giá không được để trống",
        variant: "destructive",
      });
      return;
    }
    
    const today = new Date().toISOString().split("T")[0];
    const newReviewItem = {
      id: reviews.length + 1,
      ...newReview,
      date: today,
    };
    
    setReviews([newReviewItem, ...reviews]);
    setNewReview({ name: "", rating: 5, comment: "" });
    
    toast({
      title: "Cảm ơn bạn đã đánh giá!",
      description: "Đánh giá của bạn đã được ghi nhận",
    });
  };

  if (!item) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <p>Không tìm thấy món ăn</p>
        </main>
        <Footer />
      </div>
    );
  }

  const averageRating = reviews.length
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    : 0;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="mb-6">
            <Link to="/menu" className="text-primary hover:underline">
              &larr; Quay lại thực đơn
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="rounded-lg overflow-hidden shadow-md">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-[400px] object-cover"
              />
            </div>
            
            <div className="space-y-4">
              <h1 className="text-3xl font-bold">{item.name}</h1>
              
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star}
                    className={`h-5 w-5 ${star <= Math.round(averageRating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                  />
                ))}
                <span className="text-sm text-gray-500">
                  ({reviews.length} đánh giá)
                </span>
              </div>
              
              <div className="text-2xl font-bold text-primary">
                {item.price.toLocaleString()} ₫
              </div>
              
              <p className="text-gray-700">
                {item.fullDescription || item.description}
              </p>
              
              <div className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="flex border rounded mr-2">
                    <button
                      className="px-3 py-2 border-r hover:bg-gray-100"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      -
                    </button>
                    <span className="px-4 py-2">{quantity}</span>
                    <button
                      className="px-3 py-2 border-l hover:bg-gray-100"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <Button 
                    onClick={handleAddToCart}
                    className="bg-primary hover:bg-primary/90 flex items-center gap-2"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    <span>Thêm vào giỏ hàng</span>
                  </Button>
                </div>
              </div>
              
              <div className="pt-6 border-t">
                <h3 className="text-lg font-semibold">Danh mục:</h3>
                <p className="capitalize">{item.category}</p>
              </div>
            </div>
          </div>
          
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <MessageSquare className="h-6 w-6 mr-2" /> Đánh giá và bình luận
            </h2>
            
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <h3 className="text-xl font-semibold mb-4">Đánh giá món ăn này</h3>
              <form onSubmit={handleSubmitReview}>
                <div className="flex flex-wrap gap-4 mb-4">
                  <div className="flex-1 min-w-[250px]">
                    <label htmlFor="name" className="block mb-1">Tên của bạn</label>
                    <Input
                      id="name"
                      value={newReview.name}
                      onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                      placeholder="Nhập tên của bạn"
                      required
                    />
                  </div>
                  
                  <div className="min-w-[250px]">
                    <label className="block mb-1">Đánh giá</label>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star}
                          className={`h-6 w-6 cursor-pointer ${star <= newReview.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                          onClick={() => setNewReview({ ...newReview, rating: star })}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="comment" className="block mb-1">Bình luận của bạn</label>
                  <Textarea
                    id="comment"
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    placeholder="Chia sẻ trải nghiệm của bạn về món ăn này..."
                    rows={4}
                    required
                  />
                </div>
                
                <Button type="submit" className="bg-primary hover:bg-primary/90">
                  Gửi đánh giá
                </Button>
              </form>
            </div>
            
            <div className="space-y-6">
              {reviews.length === 0 ? (
                <p className="text-center text-gray-500 py-8">
                  Chưa có đánh giá nào. Hãy là người đầu tiên đánh giá món ăn này!
                </p>
              ) : (
                reviews.map((review) => (
                  <div key={review.id} className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold">{review.name}</h4>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star 
                              key={star}
                              className={`h-4 w-4 ${star <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FoodDetail;
