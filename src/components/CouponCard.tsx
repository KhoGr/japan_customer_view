
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";

type CouponProps = {
  id: string;
  title: string;
  code: string;
  discount: string;
  expiry: string;
  description: string;
  isNew?: boolean;
  isLimited?: boolean;
};

const CouponCard = ({
  id,
  title,
  code,
  discount,
  expiry,
  description,
  isNew,
  isLimited,
}: CouponProps) => {
  const { toast } = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Đã sao chép mã",
      description: `Mã ${code} đã được sao chép vào clipboard`,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
      <div className="bg-gradient-to-r from-primary to-secondary p-4 text-white relative">
        <div className="absolute top-0 right-0 -mt-2 -mr-2">
          {isNew && (
            <Badge className="bg-green-500 hover:bg-green-600">Mới</Badge>
          )}
          {isLimited && (
            <Badge className="bg-amber-500 hover:bg-amber-600 ml-1">Sắp hết</Badge>
          )}
        </div>
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-sm opacity-90">Giảm {discount}</p>
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="bg-gray-100 px-3 py-2 rounded-lg font-mono text-sm">
            {code}
          </div>
          <Button onClick={handleCopy} variant="outline" size="sm">
            Sao chép
          </Button>
        </div>
        
        <p className="text-sm text-gray-600 mb-3">{description}</p>
        
        <div className="text-xs text-gray-500">
          Hạn sử dụng: {expiry}
        </div>
      </div>
    </div>
  );
};

export default CouponCard;
