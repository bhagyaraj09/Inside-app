import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { format, addDays } from "date-fns";

interface DatesSelectProps {
  startDate: Date,
  selectedDate: string
}

export default function DatesSelect(props: DatesSelectProps) {
  const datesArray = Array.from({ length: 7 }, (_, i) => addDays(props.startDate, i));
  const formatWithOrdinal = (date: Date) => {
    const day = date.getDate();
    const suffix = ['th', 'st', 'nd', 'rd'];
    const v = day % 100;
    const ordinal = suffix[(v - 20) % 10] || suffix[v] || suffix[0];
    return format(date, `EEE, MMM d'${ordinal}, ${format(date, 'yyyy')}`);
  };
  return (
    <Select defaultValue= {props.selectedDate==""? format(props.startDate, 'yyyy-MM-dd') : props.selectedDate}>
      <SelectTrigger>
        <SelectValue placeholder="Select a date" />
      </SelectTrigger>
      <SelectContent>
        {datesArray.map((date, index) => (
          <SelectItem key = {format(date, 'yyyy-MM-dd')} value={format(date, 'yyyy-MM-dd')}>{formatWithOrdinal(date)}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};