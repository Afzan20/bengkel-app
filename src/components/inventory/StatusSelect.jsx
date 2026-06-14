import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function StatusSelect({ value, onChange }) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[180px] bg-white border-gray-200 focus:ring-0">
        <SelectValue placeholder="Filter status" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="all">All Status</SelectItem>
        <SelectItem value="success">Success</SelectItem>
        <SelectItem value="pending">Pending</SelectItem>
        <SelectItem value="warning">Warning</SelectItem>
      </SelectContent>
    </Select>
  );
}