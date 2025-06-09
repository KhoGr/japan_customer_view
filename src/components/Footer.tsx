
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-japanese-sumi/95 text-japanese-washi relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-gradient-to-br from-japanese-sakura/10 to-japanese-matcha/10"></div>
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 animate-sakura-float">🌸</div>
        <div className="absolute top-20 right-20 animate-float-delay-1">🎋</div>
        <div className="absolute bottom-32 left-32 animate-float-delay-2">🏮</div>
        <div className="absolute bottom-20 right-40 animate-float-slow">🌙</div>
        <div className="absolute top-40 left-1/2 animate-bounce-gentle">⛩️</div>
        <div className="absolute top-1/2 right-1/4 animate-sakura-float">🍃</div>
      </div>
      
      {/* Multiple floating cats with different animations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-8 right-8 text-4xl animate-float-character opacity-80">🐱</div>
        <div className="absolute top-1/3 left-8 text-3xl animate-float-delay-1 opacity-60">🐾</div>
        <div className="absolute bottom-1/3 right-16 text-2xl animate-bounce-gentle opacity-70">😺</div>
        <div className="absolute top-2/3 left-1/3 text-3xl animate-sakura-float opacity-50">🐈</div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <div className="flex items-center space-x-3 mb-6">
              <span className="text-3xl animate-magical-glow">🌸</span>
              <div>
                <h3 className="japanese-title text-2xl font-bold text-japanese-sakura">桜レストラン</h3>
                <p className="font-japanese text-sm text-japanese-washi/90">Sakura Restaurant</p>
              </div>
            </div>
            <p className="japanese-text leading-relaxed text-japanese-washi/95">
              伝統的な日本の味と心を込めたおもてなしで、<br />
              お客様に最高の体験をお届けいたします。
            </p>
            <div className="japanese-card bg-japanese-washi/10 p-4 border border-japanese-sakura/30 backdrop-blur-sm hover:bg-japanese-washi/20 transition-all">
              <h4 className="font-semibold text-japanese-sakura mb-2 font-japanese flex items-center gap-1">
                📍 所在地
                <span className="animate-pulse">✨</span>
              </h4>
              <p className="japanese-text text-sm text-japanese-washi/90">
                123 Hai Bà Trưng Street<br />
                District 1, Ho Chi Minh City
              </p>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="japanese-title text-xl font-bold text-japanese-sakura mb-6 flex items-center gap-2">
              営業時間
              <span className="animate-bounce-gentle">🕐</span>
            </h3>
            <div className="space-y-3">
              <div className="japanese-card bg-japanese-washi/10 p-4 border border-japanese-matcha/30 backdrop-blur-sm hover:scale-102 transition-transform">
                <p className="japanese-text text-japanese-washi/95">
                  <span className="text-japanese-matcha font-semibold">平日:</span> 11:00 - 22:00
                </p>
              </div>
              <div className="japanese-card bg-japanese-washi/10 p-4 border border-japanese-matcha/30 backdrop-blur-sm hover:scale-102 transition-transform">
                <p className="japanese-text text-japanese-washi/95">
                  <span className="text-japanese-matcha font-semibold">週末:</span> 10:00 - 23:00
                </p>
              </div>
            </div>
            <div className="mt-6 space-y-3">
              <h4 className="font-semibold text-japanese-sakura font-japanese flex items-center gap-1">
                📞 お問い合わせ
                <span className="animate-pulse">💫</span>
              </h4>
              <p className="japanese-text text-japanese-washi/95">電話: (84) 123-456-789</p>
              <p className="japanese-text text-japanese-washi/95">メール: info@sakura.com</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="japanese-title text-xl font-bold text-japanese-sakura mb-6 flex items-center gap-2">
              メニュー
              <span className="animate-wiggle">🍱</span>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="japanese-text text-japanese-washi/90 hover:text-japanese-sakura transition-colors duration-300 flex items-center group">
                  <span className="mr-2 group-hover:animate-wiggle transition-transform">🏮</span>
                  ホーム
                </Link>
              </li>
              <li>
                <Link to="/menu" className="japanese-text text-japanese-washi/90 hover:text-japanese-sakura transition-colors duration-300 flex items-center group">
                  <span className="mr-2 group-hover:animate-wiggle transition-transform">🍱</span>
                  お料理メニュー
                </Link>
              </li>
              <li>
                <Link to="/reservation" className="japanese-text text-japanese-washi/90 hover:text-japanese-sakura transition-colors duration-300 flex items-center group">
                  <span className="mr-2 group-hover:animate-wiggle transition-transform">📅</span>
                  席のご予約
                </Link>
              </li>
              <li>
                <Link to="/coupons" className="japanese-text text-japanese-washi/90 hover:text-japanese-sakura transition-colors duration-300 flex items-center group">
                  <span className="mr-2 group-hover:animate-wiggle transition-transform">🎌</span>
                  キャンペーン
                </Link>
              </li>
              <li>
                <Link to="/vip" className="japanese-text text-japanese-washi/90 hover:text-japanese-sakura transition-colors duration-300 flex items-center group">
                  <span className="mr-2 group-hover:animate-wiggle transition-transform">👑</span>
                  VIP会員
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-japanese-sakura/30">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="japanese-text text-japanese-washi/80">
              &copy; {new Date().getFullYear()} 桜レストラン (Sakura Restaurant). All rights reserved.
            </p>
            <div className="flex items-center space-x-4">
              <span className="japanese-text text-japanese-washi/80">Follow us:</span>
              <div className="flex space-x-3">
                <span className="text-xl hover:animate-bounce cursor-pointer transition-transform hover:scale-110">📘</span>
                <span className="text-xl hover:animate-bounce cursor-pointer transition-transform hover:scale-110">📷</span>
                <span className="text-xl hover:animate-bounce cursor-pointer transition-transform hover:scale-110">🐦</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
