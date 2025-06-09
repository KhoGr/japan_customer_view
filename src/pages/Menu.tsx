import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FoodCard from "@/components/FoodCard";
import { useToast } from "@/components/ui/use-toast";

// Mock data for food categories and items
const categories = [
  { id: "appetizers", name: "Khai vị" },
  { id: "main", name: "Món chính" },
  { id: "seafood", name: "Hải sản" },
  { id: "desserts", name: "Tráng miệng" },
  { id: "drinks", name: "Đồ uống" }
];

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
  {
    id: 3,
    name: "Salad Ceasar",
    description: "Rau xà lách, bánh mì nướng, trứng, phô mai Parmesan và sốt Ceasar",
    price: 95000,
    image: "https://images.unsplash.com/photo-1512852939750-1305098529bf?q=80&w=2070",
    category: "appetizers",
    fullDescription: "Salad Caesar của chúng tôi được làm từ rau xà lách romaine tươi ngon, bánh mì nướng giòn, trứng luộc, phô mai Parmesan thượng hạng và sốt Caesar đặc biệt. Món salad này là sự kết hợp hoàn hảo giữa độ giòn và hương vị thơm ngon, tạo nên một khởi đầu tuyệt vời cho bữa ăn của bạn."
  },
  
  // Main courses
  {
    id: 4,
    name: "Bò Bít Tết Kiểu Pháp",
    description: "Thịt bò thượng hạng áp chảo trên nền sốt nấm",
    price: 350000,
    image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=2070",
    category: "main",
    fullDescription: "Bò bít tết kiểu Pháp của chúng tôi được chế biến từ thịt bò Úc thượng hạng, áp ch��o vừa đủ độ tái theo yêu cầu. Món ăn được phục vụ kèm với sốt nấm đậm đà, khoai tây nghiền mịn và rau củ theo mùa, tạo nên hương vị phong phú và cân bằng."
  },
  {
    id: 5,
    name: "Sườn cừu nướng rosemary",
    description: "Sườn cừu New Zealand nướng với hương thảo và khoai tây đút lò",
    price: 420000,
    image: "https://images.unsplash.com/photo-1608039690563-56c3e9cf754d?q=80&w=1974",
    category: "main"
  },
  {
    id: 6,
    name: "Pasta Carbonara",
    description: "Mì Ý với sốt kem, thịt xông khói và phô mai Parmesan",
    price: 180000,
    image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=2071",
    category: "main"
  },
  {
    id: 7,
    name: "Pizza Hải Sản",
    description: "Đế giòn với hải sản tươi ngon, phô mai Mozzarella",
    price: 220000,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070",
    category: "main"
  },
  
  // Seafood
  {
    id: 8,
    name: "Cá Hồi Nướng Sốt Cam",
    description: "Cá hồi Na Uy nướng với sốt cam tươi",
    price: 280000,
    image: "https://images.unsplash.com/photo-1485921325833-c519f76c4927?q=80&w=2070",
    category: "seafood"
  },
  {
    id: 9,
    name: "Tôm Hùm Nướng Bơ Tỏi",
    description: "Tôm hùm tươi sống nướng với bơ tỏi và rau thơm",
    price: 650000,
    image: "https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?q=80&w=2070",
    category: "seafood"
  },
  {
    id: 10,
    name: "Mực Chiên Giòn",
    description: "Mực tươi tẩm bột chiên giòn phục vụ kèm sốt mayonnaise",
    price: 180000,
    image: "https://images.unsplash.com/photo-1604909052743-94e838986d24?q=80&w=2080",
    category: "seafood"
  },
  
  // Desserts
  {
    id: 11,
    name: "Bánh Chocolate Lava",
    description: "Bánh chocolate với lớp nhân chảy bên trong, phục vụ kèm kem vani",
    price: 95000,
    image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?q=80&w=2070",
    category: "desserts"
  },
  {
    id: 12,
    name: "Tiramisu",
    description: "Bánh tiramisu truyền thống với cà phê đậm đà và phô mai mascarpone",
    price: 85000,
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=1974",
    category: "desserts"
  },
  {
    id: 13,
    name: "Kem Trái Cây Tươi",
    description: "Kem tự làm với trái cây theo mùa và bánh quy giòn",
    price: 65000,
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=2127",
    category: "desserts"
  },
  
  // Drinks
  {
    id: 14,
    name: "Rượu Vang Đỏ",
    description: "Rượu vang đỏ Pháp thượng hạng, phục vụ theo ly",
    price: 180000,
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=2070",
    category: "drinks"
  },
  {
    id: 15,
    name: "Cocktail Mojito",
    description: "Cocktail truyền thống với rum, đường, chanh và bạc hà",
    price: 120000,
    image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?q=80&w=1965",
    category: "drinks"
  },
  {
    id: 16,
    name: "Nước Ép Trái Cây Tươi",
    description: "Nước ép từ các loại trái cây tươi theo mùa",
    price: 65000,
    image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?q=80&w=1974",
    category: "drinks"
  }
];

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState("appetizers");
  const [cartItems, setCartItems] = useState<{item: any, quantity: number}[]>([]);
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
  
  const filteredItems = foodItems.filter(item => item.category === selectedCategory);
  
  const handleAddToCart = (item: any, quantity: number) => {
    const existingItemIndex = cartItems.findIndex(cartItem => cartItem.item.id === item.id);
    
    if (existingItemIndex > -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity += quantity;
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { item, quantity }]);
    }
    
    // Save to localStorage
    const updatedCart = existingItemIndex > -1 
      ? cartItems.map(cartItem => 
          cartItem.item.id === item.id 
            ? { ...cartItem, quantity: cartItem.quantity + quantity } 
            : cartItem
        )
      : [...cartItems, { item, quantity }];
    
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    
    // Dispatch custom event để Navbar có thể cập nhật số lượng
    window.dispatchEvent(new Event('cartUpdated'));
    
    toast({
      title: "Đã thêm vào giỏ hàng",
      description: `${quantity} x ${item.name}`,
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-primary/10 py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Thực đơn</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Khám phá thực đơn phong phú của chúng tôi với các món ăn được chế biến từ nguyên liệu tươi ngon nhất
            </p>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Tabs defaultValue="appetizers" value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="mb-8 flex overflow-x-auto pb-2 justify-start">
              {categories.map(category => (
                <TabsTrigger 
                  key={category.id} 
                  value={category.id}
                  className="px-4 py-2 focus:bg-primary focus:text-white"
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {categories.map(category => (
              <TabsContent key={category.id} value={category.id} className="pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredItems.map(item => (
                    <FoodCard 
                      key={item.id} 
                      item={item} 
                      onAddToCart={handleAddToCart}
                    />
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Menu;
