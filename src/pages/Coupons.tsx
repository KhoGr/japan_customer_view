
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CouponCard from "@/components/CouponCard";

// Mock data for coupons
const coupons = [
  {
    id: "coup1",
    title: "Giảm 10% cho đơn hàng đầu tiên",
    code: "WELCOME10",
    discount: "10% tổng hóa đơn",
    expiry: "31/12/2025",
    description: "Áp dụng cho khách hàng lần đầu đặt món tại nhà hàng Délice",
    isNew: true,
  },
  {
    id: "coup2",
    title: "Giảm 50k cho đơn từ 300k",
    code: "DELICE50",
    discount: "50.000đ",
    expiry: "30/06/2025",
    description: "Áp dụng cho đơn hàng từ 300.000đ trở lên",
  },
  {
    id: "coup3",
    title: "Miễn phí giao hàng",
    code: "FREESHIP",
    discount: "Phí giao hàng",
    expiry: "31/07/2025",
    description: "Miễn phí giao hàng cho đơn hàng bất kỳ",
  },
  {
    id: "coup4",
    title: "Giảm 20% cho nhóm từ 4 người",
    code: "GROUP20",
    discount: "20% tổng hóa đơn",
    expiry: "31/08/2025",
    description: "Áp dụng khi đặt bàn cho nhóm từ 4 người trở lên",
    isLimited: true,
  },
  {
    id: "coup5",
    title: "Combo giảm giá cuối tuần",
    code: "WEEKEND25",
    discount: "25% cho món tráng miệng",
    expiry: "30/09/2025",
    description: "Giảm 25% cho tất cả các món tráng miệng khi đặt vào cuối tuần",
    isNew: true,
  },
  {
    id: "coup6",
    title: "Sinh nhật vui vẻ",
    code: "BIRTHDAY",
    discount: "Món tráng miệng miễn phí",
    expiry: "31/12/2025",
    description: "Tặng 1 món tráng miệng khi đặt bàn vào ngày sinh nhật của bạn",
  },
];

const Coupons = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-primary/10 py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Mã giảm giá</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Khám phá các mã giảm giá độc quyền và tiết kiệm khi đặt món tại Délice
            </p>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="bg-white p-6 rounded-lg shadow-md mb-10">
            <h2 className="text-xl font-semibold mb-4">Cách sử dụng mã giảm giá</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
                <h3 className="font-medium mb-2">Chọn mã giảm giá</h3>
                <p className="text-gray-600 text-sm">Sao chép mã giảm giá mà bạn muốn sử dụng</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
                <h3 className="font-medium mb-2">Đặt món hoặc đặt bàn</h3>
                <p className="text-gray-600 text-sm">Chọn món ăn hoặc đặt bàn theo nhu cầu của bạn</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
                <h3 className="font-medium mb-2">Áp dụng mã giảm giá</h3>
                <p className="text-gray-600 text-sm">Dán mã vào ô mã giảm giá khi thanh toán</p>
              </div>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold mb-6">Mã giảm giá hiện có</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coupons.map((coupon) => (
              <CouponCard
                key={coupon.id}
                id={coupon.id}
                title={coupon.title}
                code={coupon.code}
                discount={coupon.discount}
                expiry={coupon.expiry}
                description={coupon.description}
                isNew={coupon.isNew}
                isLimited={coupon.isLimited}
              />
            ))}
          </div>
          
          <div className="mt-12 bg-primary/10 p-8 rounded-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Đăng ký nhận thông báo</h2>
            <p className="text-gray-600 mb-6 max-w-xl mx-auto">
              Đăng ký để nhận thông báo về các chương trình khuyến mãi đặc biệt và mã giảm giá độc quyền
            </p>
            <div className="flex max-w-md mx-auto">
              <input
                type="email"
                placeholder="Email của bạn"
                className="flex-grow rounded-l-md border-r-0 focus-visible:ring-1 focus-visible:ring-primary"
              />
              <button className="bg-primary text-white px-4 py-2 rounded-r-md hover:bg-primary/90">
                Đăng ký
              </button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Coupons;
