
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section - Traditional Japanese Style */}
      <div className="relative h-[600px] bg-zen-pattern bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-b from-japanese-sumi/70 via-japanese-sumi/50 to-japanese-sumi/70">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent"></div>
        </div>
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center text-white p-8 japanese-card bg-black/30 backdrop-blur-sm">
            <div className="mb-6 animate-float">
              <span className="text-6xl md:text-8xl">🌸</span>
            </div>
            <h1 className="japanese-title text-4xl md:text-7xl font-bold mb-4 text-white animate-fade-slide">
              桜レストラン
            </h1>
            <h2 className="text-2xl md:text-3xl mb-2 font-japanese-serif text-japanese-sakura">
              Sakura Restaurant
            </h2>
            <p className="text-lg md:text-xl mb-8 japanese-text text-japanese-washi max-w-2xl mx-auto leading-relaxed">
              伝統的な日本の味と心を込めて<br />
              職人の技が光る本格和食をお楽しみください
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/menu">
                <Button className="zen-button px-8 py-4 text-lg font-japanese">
                  🍱 メニューを見る
                </Button>
              </Link>
              <Link to="/reservation">
                <Button className="bg-transparent text-white border-2 border-white hover:bg-white hover:text-japanese-sumi px-8 py-4 text-lg font-japanese transition-all duration-300">
                  🏮 席を予約する
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="py-20 washi-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="japanese-title text-4xl font-bold mb-4">私たちのサービス</h2>
            <p className="japanese-text text-japanese-stone text-lg max-w-3xl mx-auto">
              本格的な日本料理と伝統的なおもてなしの心でお客様をお迎えいたします
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="japanese-card p-8 text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-japanese-vermillion rounded-full flex items-center justify-center mx-auto mb-6 group-hover:animate-float">
                <span className="text-3xl">🍱</span>
              </div>
              <h3 className="japanese-title text-2xl font-semibold mb-4">本格和食</h3>
              <p className="japanese-text text-japanese-stone mb-6 leading-relaxed">
                新鮮な食材と伝統的な調理法で作る<br />
                寿司、ラーメン、天ぷらなど本格的な日本料理
              </p>
              <Link to="/menu">
                <Button variant="link" className="text-primary font-japanese hover:text-japanese-vermillion">
                  メニューを見る →
                </Button>
              </Link>
            </div>
            
            <div className="japanese-card p-8 text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-accent to-japanese-matcha rounded-full flex items-center justify-center mx-auto mb-6 group-hover:animate-float">
                <span className="text-3xl">🏮</span>
              </div>
              <h3 className="japanese-title text-2xl font-semibold mb-4">和の空間</h3>
              <p className="japanese-text text-japanese-stone mb-6 leading-relaxed">
                畳と障子に囲まれた伝統的な和室で<br />
                静寂と美しさを感じながらお食事を
              </p>
              <Link to="/reservation">
                <Button variant="link" className="text-primary font-japanese hover:text-japanese-vermillion">
                  予約する →
                </Button>
              </Link>
            </div>
            
            <div className="japanese-card p-8 text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-secondary to-japanese-gold rounded-full flex items-center justify-center mx-auto mb-6 group-hover:animate-float">
                <span className="text-3xl">🎌</span>
              </div>
              <h3 className="japanese-title text-2xl font-semibold mb-4">特別な優待</h3>
              <p className="japanese-text text-japanese-stone mb-6 leading-relaxed">
                季節の特別メニューや<br />
                会員様限定の特典をご用意
              </p>
              <Link to="/coupons">
                <Button variant="link" className="text-primary font-japanese hover:text-japanese-vermillion">
                  キャンペーンを見る →
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Popular Dishes Section */}
      <div className="py-20 bg-gradient-to-b from-japanese-washi to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="japanese-title text-4xl font-bold mb-4">人気のお料理</h2>
            <p className="japanese-text text-japanese-stone text-lg max-w-3xl mx-auto leading-relaxed">
              職人が心を込めて作る、当店自慢の逸品をご紹介いたします<br />
              新鮮な食材と伝統の技法で仕上げた本格的な日本の味をお楽しみください
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            {popularDishes.map((dish, index) => (
              <div key={dish.id} className="japanese-card overflow-hidden group" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="relative overflow-hidden">
                  <img 
                    src={dish.image} 
                    alt={dish.name} 
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-japanese-sumi/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <h3 className="japanese-title font-semibold text-xl mb-2">{dish.name}</h3>
                  <p className="japanese-text text-japanese-stone text-sm mb-4 leading-relaxed">{dish.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-primary font-bold text-lg font-japanese">{dish.price.toLocaleString()}₫</span>
                    <Link to="/menu">
                      <Button size="sm" className="zen-button font-japanese">
                        注文する
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/menu">
              <Button className="zen-button px-8 py-3 text-lg font-japanese">
                全メニューを見る
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Testimonial Section */}
      <div className="py-20 bg-japanese-sumi text-japanese-washi relative overflow-hidden">
        <div className="absolute inset-0 bg-bamboo-pattern bg-cover bg-center opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="japanese-title text-4xl font-bold mb-4 text-japanese-sakura">お客様の声</h2>
            <p className="japanese-text text-japanese-washi/80 text-lg">
              多くのお客様に愛され続ける理由をご紹介します
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="japanese-card bg-japanese-washi/10 backdrop-blur-sm p-6 border border-japanese-sakura/20">
                <div className="flex items-center mb-6">
                  <div className="mr-4">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-japanese-sakura"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-japanese-sakura font-japanese text-lg">{testimonial.name}</h4>
                    <div className="flex text-secondary mt-1">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className={`w-5 h-5 ${
                            i < testimonial.rating ? "text-secondary" : "text-japanese-stone"
                          }`}
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="japanese-text text-japanese-washi/90 leading-relaxed italic">
                  "{testimonial.comment}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

// Updated Japanese dishes data
const popularDishes = [
  {
    id: 1,
    name: "特上寿司盛り合わせ",
    description: "職人が厳選した新鮮なネタを使用した、当店自慢の特上寿司セット",
    price: 450000,
    image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?q=80&w=2070"
  },
  {
    id: 2,
    name: "豚骨ラーメン",
    description: "18時間煮込んだ濃厚豚骨スープと自家製麺の本格博多ラーメン",
    price: 180000,
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=2070"
  },
  {
    id: 3,
    name: "天ぷら盛り合わせ",
    description: "季節の野菜と新鮮な海老を軽やかな衣で揚げた伝統の天ぷら",
    price: 220000,
    image: "https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?q=80&w=2070"
  },
  {
    id: 4,
    name: "ちらし丼",
    description: "新鮮な刺身と季節の野菜を酢飯にのせた彩り豊かな海鮮丼",
    price: 280000,
    image: "https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=2070"
  }
];

const testimonials = [
  {
    name: "田中 太郎",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    rating: 5,
    comment: "本当に日本にいるような感覚になります。料理も雰囲気も完璧で、スタッフの方々のおもてなしも素晴らしいです。"
  },
  {
    name: "佐藤 花子",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    rating: 5,
    comment: "豚骨ラーメンの味は本場そのもの！和の空間でゆっくりと食事ができて、心も癒されました。"
  },
  {
    name: "鈴木 一郎",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    rating: 4,
    comment: "天ぷらの軽やかな食感と新鮮な素材の味が絶品です。職人さんの技術の高さを感じました。"
  }
];

export default Index;
