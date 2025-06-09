
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { useState } from "react";
import { CheckCircle, Circle } from "lucide-react";

interface TableOption {
  id: string;
  name: string;
  capacity: number;
  available: boolean;
}

interface TableAllocationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  guestCount: number;
  onConfirm: (selectedTables: string[]) => void;
}

const TableAllocationDialog = ({
  isOpen,
  onClose,
  guestCount,
  onConfirm,
}: TableAllocationDialogProps) => {
  // Mock data cho các bàn có sẵn - trong thực tế sẽ lấy từ API
  const availableTables: TableOption[] = [
    { id: "T1", name: "Bàn 1", capacity: 2, available: true },
    { id: "T2", name: "Bàn 2", capacity: 2, available: true },
    { id: "T3", name: "Bàn 3", capacity: 4, available: true },
    { id: "T4", name: "Bàn 4", capacity: 4, available: true },
    { id: "T5", name: "Bàn 5", capacity: 6, available: true },
    { id: "T6", name: "Bàn 6", capacity: 8, available: true },
    { id: "T7", name: "Bàn 7", capacity: 10, available: true },
  ];

  // Lọc bàn phù hợp với số khách
  const suitableTables = availableTables.filter(
    (table) => table.available && table.capacity >= guestCount
  );

  // Đề xuất bàn tối ưu (bàn có capacity gần nhất với số khách)
  const optimalTables = [...suitableTables].sort(
    (a, b) => a.capacity - b.capacity
  );

  const [selectedTables, setSelectedTables] = useState<string[]>(
    optimalTables.length > 0 ? [optimalTables[0].id] : []
  );

  // Tổng số chỗ ngồi đã chọn
  const totalCapacity = availableTables
    .filter((table) => selectedTables.includes(table.id))
    .reduce((sum, table) => sum + table.capacity, 0);

  const handleTableToggle = (tableId: string) => {
    setSelectedTables((prev) => {
      if (prev.includes(tableId)) {
        return prev.filter((id) => id !== tableId);
      } else {
        return [...prev, tableId];
      }
    });
  };

  const handleConfirm = () => {
    onConfirm(selectedTables);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Phân bố bàn</DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <p className="mb-4">
            Vui lòng chọn bàn cho {guestCount} khách của bạn. 
            <span className="font-medium text-primary"> 
              Đã chọn: {totalCapacity} chỗ ngồi
            </span>
          </p>

          <div className="border rounded-md max-h-[300px] overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Bàn</TableHead>
                  <TableHead>Số chỗ</TableHead>
                  <TableHead className="text-right">Chọn</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {availableTables.map((table) => (
                  <TableRow 
                    key={table.id}
                    className={`cursor-pointer ${
                      selectedTables.includes(table.id) ? "bg-primary/10" : ""
                    }`}
                    onClick={() => handleTableToggle(table.id)}
                  >
                    <TableCell className="font-medium">{table.name}</TableCell>
                    <TableCell>{table.capacity} người</TableCell>
                    <TableCell className="text-right">
                      {selectedTables.includes(table.id) ? (
                        <CheckCircle className="h-5 w-5 text-primary ml-auto" />
                      ) : (
                        <Circle className="h-5 w-5 text-muted-foreground ml-auto" />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {totalCapacity < guestCount && (
            <p className="mt-2 text-sm text-destructive">
              Chưa đủ chỗ ngồi cho {guestCount} khách. Vui lòng chọn thêm bàn.
            </p>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Hủy
          </Button>
          <Button 
            onClick={handleConfirm} 
            disabled={totalCapacity < guestCount}
          >
            Xác nhận
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TableAllocationDialog;
