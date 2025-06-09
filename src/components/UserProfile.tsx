
import { useState } from 'react';
import { User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel, 
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter, 
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';

// Mock user data
const mockUser = {
  name: 'Nguyễn Văn A',
  email: 'nguyenvana@example.com',
  phone: '0987654321',
  avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
  address: '123 Đường ABC, Quận XYZ, TP. Hồ Chí Minh',
};

const mockOrders = [
  {
    id: 'ORD-12345',
    date: '15/05/2025',
    status: 'Đã giao',
    total: 450000,
    items: [
      { name: 'Bò Bít Tết Kiểu Pháp', quantity: 1, price: 350000 },
      { name: 'Pizza Hải Sản', quantity: 1, price: 100000 },
    ]
  },
  {
    id: 'ORD-12344',
    date: '10/05/2025',
    status: 'Đã giao',
    total: 280000,
    items: [
      { name: 'Cá Hồi Nướng Sốt Cam', quantity: 1, price: 280000 },
    ]
  }
];

const mockReservations = [
  {
    id: 'RES-7890',
    date: '20/05/2025',
    time: '19:00',
    guests: 4,
    status: 'Đã xác nhận',
    tables: ['T4']
  },
  {
    id: 'RES-7889',
    date: '01/05/2025',
    time: '18:30',
    guests: 2,
    status: 'Hoàn thành',
    tables: ['T2']
  }
];

const UserProfile = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(mockUser);

  const handleLogout = () => {
    toast({
      title: "Đăng xuất thành công",
      description: "Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi",
    });
    setOpen(false);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <User className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-xl">Thông tin tài khoản</SheetTitle>
        </SheetHeader>
        
        <div className="flex flex-col items-center my-6">
          <Avatar className="h-20 w-20">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
          </Avatar>
          <h2 className="mt-4 text-xl font-semibold">{user.name}</h2>
          <p className="text-muted-foreground">{user.email}</p>
        </div>

        <Separator className="my-4" />

        <Tabs defaultValue="information">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="information">Thông tin</TabsTrigger>
            <TabsTrigger value="orders">Đơn hàng</TabsTrigger>
            <TabsTrigger value="reservations">Đặt bàn</TabsTrigger>
          </TabsList>
          
          <TabsContent value="information" className="mt-4 space-y-4">
            <div>
              <h3 className="font-medium text-sm text-muted-foreground">Số điện thoại</h3>
              <p>{user.phone}</p>
            </div>
            <div>
              <h3 className="font-medium text-sm text-muted-foreground">Địa chỉ</h3>
              <p>{user.address}</p>
            </div>
            <div className="pt-4">
              <Button className="w-full">Chỉnh sửa thông tin</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="orders" className="mt-4">
            {mockOrders.map(order => (
              <div key={order.id} className="mb-4 border rounded-lg p-4">
                <div className="flex justify-between">
                  <div>
                    <h4 className="font-medium">Mã đơn: {order.id}</h4>
                    <p className="text-sm text-muted-foreground">Ngày: {order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-primary">{order.status}</p>
                    <p className="font-bold">{order.total.toLocaleString()}đ</p>
                  </div>
                </div>
                <Separator className="my-2" />
                <div className="text-sm">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between">
                      <p>{item.name} x{item.quantity}</p>
                      <p>{item.price.toLocaleString()}đ</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </TabsContent>
          
          <TabsContent value="reservations" className="mt-4">
            {mockReservations.map(reservation => (
              <div key={reservation.id} className="mb-4 border rounded-lg p-4">
                <div className="flex justify-between">
                  <div>
                    <h4 className="font-medium">Mã đặt bàn: {reservation.id}</h4>
                    <p className="text-sm">Ngày: {reservation.date} - {reservation.time}</p>
                    <p className="text-sm">Số khách: {reservation.guests} người</p>
                    <p className="text-sm">Bàn: {reservation.tables.join(', ')}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-primary">{reservation.status}</p>
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>

        <div className="mt-8">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="w-full">Đăng xuất</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Bạn muốn đăng xuất?</AlertDialogTitle>
                <AlertDialogDescription>
                  Xác nhận đăng xuất khỏi tài khoản. Bạn có thể đăng nhập lại bất cứ lúc nào.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Hủy</AlertDialogCancel>
                <AlertDialogAction onClick={handleLogout}>Đăng xuất</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default UserProfile;
