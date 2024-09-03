import { format, addDays } from "date-fns";
interface DatesSelectProps {
  currentDate: Date,
  selectedDate: string
  dateMode: string
  disabled: boolean
}

export default function DatesSelect(props: DatesSelectProps) {  
  const curr = new Date(props.currentDate.toString()); // get current date
  const first = props.currentDate.getDate() - props.currentDate.getDay() + 1; // First day is the day of the month - the day of the week  
  const datesArray = Array.from({ length: 7 }, (_, i) => addDays(new Date(curr.setDate(first)), i));
  console.log("client",props)
    return (
    <select id="date" name="date" defaultValue={props.selectedDate} className="p-1.5 border rounded-md w-full"  disabled={props.disabled}>
        {props.dateMode == "Day" ? 
          <option key = {new Date(props.currentDate.toISOString()).toDateString()} value={new Date(props.currentDate.toISOString()).toDateString()}>{new Date(props.currentDate.toISOString()).toDateString()}</option>
          : datesArray.map((date, index) => (
            <option key = {new Date(date.toISOString()).toDateString()} value={new Date(date.toISOString()).toDateString()}>{new Date(date.toISOString()).toDateString()}</option>
        ))}
    </select>
  );
};