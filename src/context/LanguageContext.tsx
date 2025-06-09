
import React, { createContext, useContext, useState, useEffect } from 'react';

interface LanguageContextType {
  language: 'vi' | 'ja';
  setLanguage: (lang: 'vi' | 'ja') => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  vi: {
    // Navigation
    home: 'Trang chủ',
    menu: 'Thực đơn',
    reservation: 'Đặt bàn',
    coupons: 'Khuyến mãi',
    vip: 'VIP',
    orders: 'Đơn hàng',
    cart: 'Giỏ hàng',
    
    // Reservation page
    reservationTitle: 'Đặt bàn',
    reservationSubtitle: 'Đặt bàn trước để đảm bảo trải nghiệm ẩm thực tuyệt vời tại nhà hàng Sakura',
    reservationInfo: 'Thông tin đặt bàn',
    openingHours: 'Giờ mở cửa',
    reservationPolicy: 'Chính sách đặt bàn',
    needSupport: 'Cần hỗ trợ?',
    contactUs: 'Liên hệ với chúng tôi qua số điện thoại hoặc email:',
    
    // Form fields
    fullName: 'Họ và tên',
    phone: 'Số điện thoại',
    email: 'Email',
    guests: 'Số khách',
    date: 'Ngày',
    time: 'Giờ',
    notes: 'Ghi chú',
    selectedTables: 'Bàn đã chọn',
    selectTables: 'Chọn bàn',
    submit: 'Đặt bàn',
    processing: 'Đang xử lý...',
    
    // Placeholders
    enterName: 'Nhập họ tên của bạn',
    enterPhone: 'Nhập số điện thoại',
    enterEmail: 'Nhập email của bạn',
    selectGuests: 'Chọn số người',
    selectDate: 'Chọn ngày',
    selectTime: 'Chọn giờ',
    enterNotes: 'Ghi chú thêm (nếu có)',
    
    // Opening hours
    weekdays: 'Thứ 2 - Thứ 6',
    weekend: 'Thứ 7 - Chủ nhật',
    lunch: 'Bữa trưa',
    dinner: 'Bữa tối',
    
    // Policy items
    policy1: 'Vui lòng đến đúng giờ. Chúng tôi sẽ giữ bàn trong vòng 15 phút.',
    policy2: 'Đối với những dịp đặc biệt, chúng tôi có thể yêu cầu đặt cọc.',
    policy3: 'Hủy đặt bàn vui lòng thông báo trước ít nhất 4 giờ.',
    policy4: 'Đối với nhóm trên 10 người, vui lòng liên hệ trực tiếp.',
  },
  ja: {
    // Navigation
    home: 'ホーム',
    menu: 'メニュー',
    reservation: '予約',
    coupons: 'キャンペーン',
    vip: 'VIP',
    orders: '注文履歴',
    cart: 'カート',
    
    // Reservation page
    reservationTitle: 'ご予約',
    reservationSubtitle: '桜レストランで最高のお食事体験をお約束するため、事前のご予約をお願いいたします',
    reservationInfo: 'ご予約情報',
    openingHours: '営業時間',
    reservationPolicy: 'ご予約に関して',
    needSupport: 'サポートが必要ですか？',
    contactUs: 'お電話またはメールでお気軽にお問い合わせください：',
    
    // Form fields
    fullName: 'お名前',
    phone: 'お電話番号',
    email: 'メールアドレス',
    guests: 'ご人数',
    date: 'ご希望日',
    time: 'ご希望時間',
    notes: '備考',
    selectedTables: '選択されたテーブル',
    selectTables: 'テーブル選択',
    submit: 'ご予約する',
    processing: '処理中...',
    
    // Placeholders
    enterName: 'お名前をご入力ください',
    enterPhone: 'お電話番号をご入力ください',
    enterEmail: 'メールアドレスをご入力ください',
    selectGuests: 'ご人数をお選びください',
    selectDate: 'ご希望日をお選びください',
    selectTime: 'ご希望時間をお選びください',
    enterNotes: 'ご要望がございましたらご記入ください',
    
    // Opening hours
    weekdays: '平日',
    weekend: '週末',
    lunch: 'ランチ',
    dinner: 'ディナー',
    
    // Policy items
    policy1: 'お時間通りにお越しください。15分間お席をお取り置きいたします。',
    policy2: '特別な日には、お席の確保のため前金をお願いする場合がございます。',
    policy3: 'キャンセルの場合は、4時間前までにご連絡ください。',
    policy4: '10名様以上でのご利用は、直接お電話でご相談ください。',
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'vi' | 'ja'>(() => {
    const saved = localStorage.getItem('language');
    return (saved as 'vi' | 'ja') || 'vi';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['vi']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
