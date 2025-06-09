
import { useState, useEffect } from "react";
import { format, subMonths, isAfter } from "date-fns";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CreditCard, Wallet, BanknoteIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

// Mock data for food orders
const mockFoodOrders = [
  {
    id: "ORD-12345",
    date: "2025-05-10T15:30:00",
    status: "Đã giao",
    total: 450000,
    paymentMethod: "Visa",
    paymentStatus: "Đã thanh toán",
    items: [
      { name: "Bò Bít Tết Kiểu Pháp", quantity: 1, price: 350000 },
      { name: "Pizza Hải Sản", quantity: 1, price: 100000 },
    ],
  },
  {
    id: "ORD-12344",
    date: "2025-05-08T12:45:00",
    status: "Đã giao",
    total: 280000,
    paymentMethod: "ATM",
    paymentStatus: "Đã thanh toán",
    items: [
      { name: "Cá Hồi Nướng Sốt Cam", quantity: 1, price: 280000 },
    ],
  },
  {
    id: "ORD-12343",
    date: "2025-04-29T19:15:00",
    status: "Đang giao",
    total: 565000,
    paymentMethod: "Tiền mặt",
    paymentStatus: "Thanh toán khi giao hàng",
    items: [
      { name: "Sườn cừu nướng rosemary", quantity: 1, price: 420000 },
      { name: "Salad Ceasar", quantity: 1, price: 95000 },
      { name: "Nước Ép Trái Cây Tươi", quantity: 1, price: 50000 },
    ],
  },
];

// Mock data for table reservations
const mockReservations = [
  {
    id: "RES-7890",
    date: "2025-05-20T19:00:00",
    guests: 4,
    status: "Đã xác nhận",
    tables: ["T4"],
    paymentStatus: "Đã đặt cọc",
    paymentMethod: "MasterCard",
    amount: 200000,
  },
  {
    id: "RES-7889",
    date: "2025-05-01T18:30:00",
    guests: 2,
    status: "Hoàn thành",
    tables: ["T2"],
    paymentStatus: "Đã thanh toán",
    paymentMethod: "Tiền mặt",
    amount: 580000,
  },
  {
    id: "RES-7888",
    date: "2025-04-22T20:00:00",
    guests: 6,
    status: "Hoàn thành",
    tables: ["T8", "T9"],
    paymentStatus: "Đã thanh toán",
    paymentMethod: "Visa",
    amount: 1250000,
  },
];

// Function to get payment method icon
const getPaymentIcon = (method: string) => {
  switch (method.toLowerCase()) {
    case "visa":
    case "mastercard":
      return <CreditCard className="h-4 w-4" />;
    case "tiền mặt":
      return <BanknoteIcon className="h-4 w-4" />;
    case "atm":
      return <Wallet className="h-4 w-4" />;
    default:
      return <CreditCard className="h-4 w-4" />;
  }
};

// Function to get status badge
const getStatusBadge = (status: string) => {
  switch (status.toLowerCase()) {
    case "đã giao":
    case "hoàn thành":
    case "đã thanh toán":
    case "đã xác nhận":
      return <Badge className="bg-green-500">{status}</Badge>;
    case "đang giao":
    case "đã đặt cọc":
      return <Badge className="bg-yellow-500">{status}</Badge>;
    case "thanh toán khi giao hàng":
      return <Badge className="bg-blue-500">{status}</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
};

const Orders = () => {
  const [activeTab, setActiveTab] = useState("food-orders");
  const [foodOrders, setFoodOrders] = useState(mockFoodOrders);
  const [reservations, setReservations] = useState(mockReservations);
  const { toast } = useToast();

  // Filter for orders within the last month
  useEffect(() => {
    const oneMonthAgo = subMonths(new Date(), 1);
    
    const recentFoodOrders = mockFoodOrders.filter(order => 
      isAfter(new Date(order.date), oneMonthAgo)
    );
    
    const recentReservations = mockReservations.filter(reservation => 
      isAfter(new Date(reservation.date), oneMonthAgo)
    );
    
    setFoodOrders(recentFoodOrders);
    setReservations(recentReservations);
  }, []);

  const handlePrintReceipt = (id: string) => {
    toast({
      title: "Đang in hóa đơn",
      description: `Hóa đơn ${id} đang được in...`,
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-primary/10 py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Quản lý đơn hàng</h1>
            <p className="text-gray-600">
              Xem và quản lý đơn hàng và đặt bàn của bạn trong vòng 1 tháng qua
            </p>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Card>
            <CardHeader>
              <CardTitle>Đơn hàng và đặt bàn</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-6 w-full">
                  <TabsTrigger value="food-orders" className="flex-1">Đơn hàng thức ăn</TabsTrigger>
                  <TabsTrigger value="reservations" className="flex-1">Đặt bàn</TabsTrigger>
                </TabsList>
                
                <TabsContent value="food-orders">
                  {foodOrders.length > 0 ? (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Mã đơn hàng</TableHead>
                            <TableHead>Ngày đặt</TableHead>
                            <TableHead>Tổng tiền</TableHead>
                            <TableHead>Trạng thái</TableHead>
                            <TableHead>Thanh toán</TableHead>
                            <TableHead className="text-right">Thao tác</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {foodOrders.map(order => (
                            <TableRow key={order.id}>
                              <TableCell className="font-medium">{order.id}</TableCell>
                              <TableCell>{format(new Date(order.date), "dd/MM/yyyy HH:mm")}</TableCell>
                              <TableCell>{order.total.toLocaleString()}đ</TableCell>
                              <TableCell>{getStatusBadge(order.status)}</TableCell>
                              <TableCell>
                                <div className="flex items-center gap-1">
                                  {getPaymentIcon(order.paymentMethod)}
                                  <span>{order.paymentMethod}</span>
                                  <span className="mx-1">-</span>
                                  <span>{getStatusBadge(order.paymentStatus)}</span>
                                </div>
                              </TableCell>
                              <TableCell className="text-right">
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  onClick={() => handlePrintReceipt(order.id)}
                                >
                                  In hóa đơn
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      Không có đơn hàng nào trong vòng 1 tháng qua
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="reservations">
                  {reservations.length > 0 ? (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Mã đặt bàn</TableHead>
                            <TableHead>Ngày</TableHead>
                            <TableHead>Số khách</TableHead>
                            <TableHead>Bàn</TableHead>
                            <TableHead>Trạng thái</TableHead>
                            <TableHead>Thanh toán</TableHead>
                            <TableHead className="text-right">Thao tác</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {reservations.map(reservation => (
                            <TableRow key={reservation.id}>
                              <TableCell className="font-medium">{reservation.id}</TableCell>
                              <TableCell>{format(new Date(reservation.date), "dd/MM/yyyy HH:mm")}</TableCell>
                              <TableCell>{reservation.guests} người</TableCell>
                              <TableCell>{reservation.tables.join(", ")}</TableCell>
                              <TableCell>{getStatusBadge(reservation.status)}</TableCell>
                              <TableCell>
                                <div className="flex items-center gap-1">
                                  {getPaymentIcon(reservation.paymentMethod)}
                                  <span>{reservation.paymentMethod}</span>
                                  <span className="mx-1">-</span>
                                  <span>{getStatusBadge(reservation.paymentStatus)}</span>
                                </div>
                              </TableCell>
                              <TableCell className="text-right">
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => handlePrintReceipt(reservation.id)}
                                >
                                  In hóa đơn
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      Không có đặt bàn nào trong vòng 1 tháng qua
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Orders;
