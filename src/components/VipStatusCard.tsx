
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Star, Gift, Truck } from 'lucide-react';
import { useVip } from '@/context/VipContext';

const VipStatusCard = () => {
  const { vipStatus, getTierColor } = useVip();
  
  const progressToNextTier = vipStatus.nextTierPoints === Infinity 
    ? 100 
    : (vipStatus.totalSpent / vipStatus.nextTierPoints) * 100;

  const tierIcons = {
    Bronze: '🥉',
    Silver: '🥈', 
    Gold: '🥇',
    Platinum: '💎',
    Diamond: '👑',
  };

  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <span className="text-2xl">{tierIcons[vipStatus.tier]}</span>
          <span>Hạng VIP của bạn</span>
        </CardTitle>
        <Badge className={`text-lg py-2 px-4 ${getTierColor(vipStatus.tier)}`}>
          {vipStatus.tier}
        </Badge>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-sm text-gray-600">Điểm tích lũy</p>
            <p className="text-2xl font-bold text-primary">{vipStatus.points.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Tổng chi tiêu</p>
            <p className="text-2xl font-bold text-green-600">{vipStatus.totalSpent.toLocaleString()}đ</p>
          </div>
        </div>

        {vipStatus.nextTierPoints !== Infinity && (
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Tiến độ lên hạng tiếp theo</span>
              <span>{Math.round(progressToNextTier)}%</span>
            </div>
            <Progress value={progressToNextTier} className="h-3" />
            <p className="text-xs text-gray-500 mt-1">
              Còn {(vipStatus.nextTierPoints - vipStatus.totalSpent).toLocaleString()}đ để lên hạng tiếp theo
            </p>
          </div>
        )}

        <div className="space-y-2">
          <h4 className="font-semibold flex items-center gap-2">
            <Gift className="h-4 w-4" />
            Ưu đãi hiện tại
          </h4>
          <ul className="space-y-1">
            {vipStatus.specialOffers.map((offer, index) => (
              <li key={index} className="flex items-center gap-2 text-sm">
                <Star className="h-3 w-3 text-yellow-500 flex-shrink-0" />
                <span>{offer}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-primary/10 p-3 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Truck className="h-4 w-4" />
            <span className="font-medium">Miễn phí ship</span>
          </div>
          <p className="text-sm">
            {vipStatus.freeShippingThreshold === 0 
              ? 'Tất cả đơn hàng' 
              : `Đơn hàng từ ${vipStatus.freeShippingThreshold.toLocaleString()}đ`}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default VipStatusCard;
