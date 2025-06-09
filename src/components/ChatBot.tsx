
import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerFooter,
} from "@/components/ui/drawer";

type Message = {
  id: number;
  text: string;
  isBot: boolean;
};

const initialMessages: Message[] = [
  { id: 1, text: "こんにちは！私は桜レストランのAIアシスタントです。何かお手伝いできることはありますか？", isBot: true },
];

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessageId = messages.length + 1;
    setMessages(prev => [...prev, { id: userMessageId, text: input, isBot: false }]);
    setInput('');
    
    // Simulate typing effect
    setIsTyping(true);
    
    // Simple responses based on keywords
    setTimeout(() => {
      setIsTyping(false);
      const userInput = input.toLowerCase();
      let botResponse = '';
      
      if (userInput.includes('menu') || userInput.includes('món ăn') || userInput.includes('thực đơn') || userInput.includes('メニュー')) {
        botResponse = 'レストランには豊富なメニューがございます。「メニュー」セクションでご確認いただくか、お好みの料理をお聞かせください。';
      } else if (userInput.includes('đặt bàn') || userInput.includes('reservation') || userInput.includes('予約')) {
        botResponse = 'ご予約は「予約」セクションから承っております。お時間と人数をお教えください。';
      } else if (userInput.includes('giờ') || userInput.includes('mở cửa') || userInput.includes('thời gian') || userInput.includes('時間')) {
        botResponse = '営業時間は毎日10:00から22:00までです。事前のご予約をお勧めいたします。';
      } else if (userInput.includes('địa chỉ') || userInput.includes('đường') || userInput.includes('ở đâu') || userInput.includes('住所')) {
        botResponse = '桜レストランは123 Hai Bà Trưng Street, District 1, Ho Chi Minh Cityにございます。';
      } else if (userInput.includes('khuyến mãi') || userInput.includes('giảm giá') || userInput.includes('coupon') || userInput.includes('割引')) {
        botResponse = '現在、新規会員様に20%割引、毎週火曜日は全メニュー10%割引のキャンペーンを実施中です。';
      } else {
        botResponse = 'お問い合わせありがとうございます。メニュー、予約、営業時間、場所、キャンペーンについてお答えできます。何についてお聞きしたいですか？';
      }
      
      setMessages(prev => [...prev, { id: userMessageId + 1, text: botResponse, isBot: true }]);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger asChild>
          <Button 
            className="rounded-full h-16 w-16 shadow-lg bg-gradient-to-r from-japanese-sakura to-japanese-matcha hover:from-japanese-matcha hover:to-japanese-sakura transition-all duration-300 transform hover:scale-110 group relative overflow-hidden"
            size="icon"
          >
            <div className="absolute inset-0 bg-white/20 rounded-full animate-ping"></div>
            <MessageCircle size={28} className="relative z-10 group-hover:animate-pulse" />
            <Sparkles size={16} className="absolute top-2 right-2 text-yellow-300 animate-pulse" />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="h-[70vh] max-w-md mx-auto japanese-card">
          <DrawerHeader>
            <DrawerTitle className="flex items-center gap-2">
              <div className="relative">
                <MessageCircle size={20} className="text-japanese-sakura animate-pulse" />
                <Sparkles size={12} className="absolute -top-1 -right-1 text-yellow-500 animate-spin" />
              </div>
              <span className="japanese-title">桜アシスタント</span>
            </DrawerTitle>
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-4 top-4 hover:bg-japanese-sakura/20"
              onClick={() => setIsOpen(false)}
            >
              <X size={18} />
            </Button>
          </DrawerHeader>
          
          <div className="flex flex-col flex-1 px-4 overflow-y-auto mb-16 h-[calc(70vh-140px)]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`max-w-[80%] mb-4 p-3 rounded-lg animate-fade-in ${
                  msg.isBot
                    ? 'bg-gradient-to-r from-japanese-sakura/20 to-japanese-matcha/20 text-japanese-sumi self-start rounded-tl-none border border-japanese-sakura/30'
                    : 'bg-gradient-to-r from-japanese-sumi to-japanese-matcha text-white self-end rounded-br-none shadow-lg'
                }`}
              >
                {msg.text}
              </div>
            ))}
            {isTyping && (
              <div className="max-w-[80%] mb-4 p-4 bg-gradient-to-r from-japanese-sakura/20 to-japanese-matcha/20 text-japanese-sumi self-start rounded-lg rounded-tl-none border border-japanese-sakura/30">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-japanese-sakura animate-bounce"></div>
                  <div className="w-2 h-2 rounded-full bg-japanese-matcha animate-bounce delay-150"></div>
                  <div className="w-2 h-2 rounded-full bg-japanese-sumi animate-bounce delay-300"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <DrawerFooter className="absolute bottom-0 left-0 right-0 bg-japanese-washi border-t border-japanese-sakura/30">
            <div className="flex gap-2">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="メッセージを入力してください..."
                className="resize-none japanese-text border-japanese-sakura/30 focus:border-japanese-sakura"
                rows={1}
              />
              <Button 
                onClick={handleSend} 
                className="h-full zen-button bg-gradient-to-r from-japanese-sakura to-japanese-matcha hover:from-japanese-matcha hover:to-japanese-sakura"
              >
                <Send size={18} className="relative z-10" />
              </Button>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default ChatBot;
