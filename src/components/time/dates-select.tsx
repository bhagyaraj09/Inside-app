import { format, addDays } from "date-fns";
interface DatesSelectProps {
  currentDate: Date,
  selectedDate: string
  disabled: boolean
}

export default function DatesSelect(props: DatesSelectProps) {  
  var first = props.currentDate.getDate() - props.currentDate.getDay() + 1; // First day is the day of the month - the day of the week  
  const datesArray = Array.from({ length: 7 }, (_, i) => addDays(new Date(props.currentDate.setDate(first)), i));
  const formatWithOrdinal = (date: Date) => {
    const day = date.getDate();
    const suffix = ['th', 'st', 'nd', 'rd'];
    const v = day % 100;
    const ordinal = suffix[(v - 20) % 10] || suffix[v] || suffix[0];
    return format(date, `EEE, MMM d'${ordinal}, ${format(date, 'yyyy')}`);
  };
  return (
    <select id="date" name="date" defaultValue={props.selectedDate} className="p-1.5 border rounded-md w-full"  disabled={props.disabled}>
        {datesArray.map((date, index) => (
            <option key = {date.toLocaleDateString()} value={date.toLocaleDateString()}>{formatWithOrdinal(date)}</option>
        ))}
    </select>
  );
};