import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TableAllocationDialog from "./TableAllocationDialog";
import { useLanguage } from "@/context/LanguageContext";

const formSchema = z.object({
  name: z.string().min(2, { message: "Tên phải có ít nhất 2 ký tự" }),
  phone: z.string().min(10, { message: "Số điện thoại không hợp lệ" }),
  email: z.string().email({ message: "Email không hợp lệ" }),
  date: z.date({ required_error: "Vui lòng chọn ngày" }),
  time: z.string({ required_error: "Vui lòng chọn giờ" }),
  guests: z.string({ required_error: "Vui lòng chọn số khách" }),
  notes: z.string().optional(),
  tables: z.array(z.string()).optional(),
});

const ReservationForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showTableDialog, setShowTableDialog] = useState(false);
  const [currentGuestCount, setCurrentGuestCount] = useState<number>(0);
  const { toast } = useToast();
  const { t } = useLanguage();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      notes: "",
      tables: [],
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    console.log(values);
    const tableInfo = values.tables && values.tables.length > 0 
      ? `đã chọn ${values.tables.length} bàn` 
      : "";
      
    toast({
      title: "Đặt bàn thành công!",
      description: `Đã đặt bàn cho ${values.guests} khách vào lúc ${values.time}, ngày ${format(values.date, "dd/MM/yyyy")} ${tableInfo}`,
    });
    
    form.reset();
    setIsSubmitting(false);
  };

  const handleGuestChange = (value: string) => {
    form.setValue("guests", value);
    const guestCount = parseInt(value.replace('+', ''), 10);
    setCurrentGuestCount(guestCount);
    
    // Mở dialog phân bổ bàn sau khi chọn số khách
    setShowTableDialog(true);
  };

  const handleTableSelection = (selectedTables: string[]) => {
    form.setValue("tables", selectedTables);
  };

  const timeSlots = [
    "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
    "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30"
  ];

  const guestOptions = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10+"];

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-japanese text-japanese-sumi">{t('fullName')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('enterName')} {...field} className="japanese-card border-japanese-stone/30" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-japanese text-japanese-sumi">{t('phone')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('enterPhone')} {...field} className="japanese-card border-japanese-stone/30" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-japanese text-japanese-sumi">{t('email')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('enterEmail')} {...field} className="japanese-card border-japanese-stone/30" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="guests"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-japanese text-japanese-sumi">{t('guests')}</FormLabel>
                  <Select 
                    onValueChange={handleGuestChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="japanese-card border-japanese-stone/30">
                        <SelectValue placeholder={t('selectGuests')} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {guestOptions.map(option => (
                        <SelectItem key={option} value={option}>
                          {option === "10+" ? "10+ người" : `${option} người`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="font-japanese text-japanese-sumi">{t('date')}</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "pl-3 text-left font-normal japanese-card border-japanese-stone/30",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "dd/MM/yyyy")
                          ) : (
                            <span>{t('selectDate')}</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-japanese text-japanese-sumi">{t('time')}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="japanese-card border-japanese-stone/30">
                        <SelectValue placeholder={t('selectTime')} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {timeSlots.map(time => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="tables"
            render={() => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel className="font-japanese text-japanese-sumi">{t('selectedTables')}</FormLabel>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowTableDialog(true)}
                    className="text-xs zen-button"
                  >
                    {t('selectTables')}
                  </Button>
                </div>
                <FormControl>
                  <div className="p-2 border rounded-md bg-japanese-washi/50 min-h-[40px] border-japanese-stone/30">
                    {form.watch("tables")?.length ? (
                      <div className="flex flex-wrap gap-2">
                        {form.watch("tables")?.map((table) => (
                          <div key={table} className="bg-primary/20 text-primary px-2 py-1 rounded text-sm">
                            Bàn {table.replace("T", "")}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-japanese-stone">Chưa chọn bàn</p>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-japanese text-japanese-sumi">{t('notes')}</FormLabel>
                <FormControl>
                  <Input placeholder={t('enterNotes')} {...field} className="japanese-card border-japanese-stone/30" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            className="w-full zen-button font-japanese"
            disabled={isSubmitting}
          >
            {isSubmitting ? t('processing') : t('submit')}
          </Button>
        </form>
      </Form>
      
      <TableAllocationDialog
        isOpen={showTableDialog}
        onClose={() => setShowTableDialog(false)}
        guestCount={currentGuestCount}
        onConfirm={handleTableSelection}
      />
    </>
  );
};

export default ReservationForm;
