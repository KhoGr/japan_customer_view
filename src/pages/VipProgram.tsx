
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import VipStatusCard from '@/components/VipStatusCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Crown, Gift, Truck, Calendar, Users } from 'lucide-react';

const VipProgram = () => {
  const tiers = [
    {
      name: 'Bronze',
      icon: '🥉',
      threshold: '0đ',
      color: 'text-orange-600 bg-orange-100',
      benefits: [
        'Tích điểm cho mỗi đơn hàng',
        'Miễn phí ship từ 500,000đ',
        'Thông báo khuyến mãi đặc biệt'
      ]
    },
    {
      name: 'Silver', 
      icon: '🥈',
      threshold: '1,000,000đ',
      color: 'text-gray-600 bg-gray-100',
      benefits: [
        'Giảm 5% tất cả đơn hàng',
        'Miễn phí ship từ 300,000đ',
        'Ưu tiên đặt bàn',
        'Sinh nhật tặng voucher 100k'
      ]
    },
    {
      name: 'Gold',
      icon: '🥇', 
      threshold: '3,000,000đ',
      color: 'text-yellow-600 bg-yellow-100',
      benefits: [
        'Giảm 10% tất cả đơn hàng',
        'Miễn phí ship từ 200,000đ',
        'Món tráng miệng miễn phí',
        'Đặt bàn khu vực VIP',
        'Tham gia event đặc biệt'
      ]
    },
    {
      name: 'Platinum',
      icon: '💎',
      threshold: '7,000,000đ', 
      color: 'text-purple-600 bg-purple-100',
      benefits: [
        'Giảm 15% tất cả đơn hàng',
        'Miễn phí ship toàn bộ',
        'Món khai vị + tráng miệng miễn phí',
        'Phòng riêng VIP',
        'Hỗ trợ 24/7',
        'Early access menu mới'
      ]
    },
    {
      name: 'Diamond',
      icon: '👑',
      threshold: '15,000,000đ',
      color: 'text-blue-600 bg-blue-100', 
      benefits: [
        'Giảm 20% tất cả đơn hàng',
        'Miễn phí ship toàn bộ',
        'Set menu đặc biệt hàng tháng',
        'Butler service',
        'Event độc quyền',
        'Tư vấn menu cá nhân',
        'Quà tặng sinh nhật đặc biệt'
      ]
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-gradient-to-r from-primary/20 to-purple-100 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Crown className="h-16 w-16 mx-auto mb-4 text-primary" />
            <h1 className="text-4xl font-bold mb-4">Chương trình VIP Délice</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tích điểm với mỗi đơn hàng và nhận được những ưu đãi đặc biệt. 
              Càng mua nhiều, hạng VIP càng cao và ưu đãi càng hấp dẫn!
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* VIP Status */}
            <div className="lg:col-span-1">
              <VipStatusCard />
            </div>

            {/* How it works */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Gift className="h-5 w-5" />
                    Cách thức hoạt động
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
                      <h3 className="font-medium mb-2">Đặt hàng & Tích điểm</h3>
                      <p className="text-gray-600 text-sm">1 điểm cho mỗi 1,000đ chi tiêu</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
                      <h3 className="font-medium mb-2">Lên hạng VIP</h3>
                      <p className="text-gray-600 text-sm">Tổng chi tiêu càng cao, hạng VIP càng cao</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
                      <h3 className="font-medium mb-2">Nhận ưu đãi</h3>
                      <p className="text-gray-600 text-sm">Hưởng giảm giá và dịch vụ đặc biệt</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* VIP Tiers */}
          <div className="mt-12">
            <h2 className="text-3xl font-bold text-center mb-8">Các hạng VIP</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {tiers.map((tier, index) => (
                <Card key={tier.name} className={`relative ${index >= 3 ? 'border-2 border-primary' : ''}`}>
                  {index >= 3 && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-primary text-white">Cao cấp</Badge>
                    </div>
                  )}
                  <CardHeader className="text-center pb-3">
                    <div className="text-4xl mb-2">{tier.icon}</div>
                    <Badge className={`text-lg py-2 px-4 ${tier.color}`}>
                      {tier.name}
                    </Badge>
                    <p className="text-sm text-gray-600 mt-2">Từ {tier.threshold}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {tier.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-start gap-2 text-sm">
                          <Star className="h-3 w-3 text-yellow-500 flex-shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-16">
            <Card>
              <CardHeader>
                <CardTitle>Câu hỏi thường gặp</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-medium mb-2">Làm sao để tích điểm?</h4>
                  <p className="text-gray-600 text-sm">Bạn sẽ nhận được 1 điểm cho mỗi 1,000đ chi tiêu khi đặt món hoặc đặt bàn tại Délice.</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Điểm có hết hạn không?</h4>
                  <p className="text-gray-600 text-sm">Điểm VIP của bạn sẽ không hết hạn, nhưng hạng VIP sẽ được đánh giá lại hàng năm dựa trên tổng chi tiêu.</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Khi nào được áp dụng ưu đãi VIP?</h4>
                  <p className="text-gray-600 text-sm">Ưu đãi VIP sẽ được áp dụng tự động khi bạn đặt hàng hoặc đặt bàn, dựa trên hạng VIP hiện tại.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default VipProgram;
