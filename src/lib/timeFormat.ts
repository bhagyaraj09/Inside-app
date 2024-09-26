import { HolidaysType } from "../types/leaves";

export function getDaysDifference(date1: Date, date2: Date): number {
  const timeDifference = date2.getTime() - date1.getTime();
  
  const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
  
  return Math.abs(daysDifference); 
}

export function getHoursDifference(date1: Date, date2: Date): number {
  // Get the time difference in milliseconds
  const timeDifference = date2.getTime() - date1.getTime();
  
  // Convert time difference from milliseconds to hours
  const hoursDifference = timeDifference / (1000 * 60 * 60);
  
  return Math.abs(hoursDifference); // Return absolute value to avoid negative hours
}

export function calculateDaysFromHours(hrs:number): number{
  return hrs/8.5

}


export function   calculatePartialHrs(date: Date, partialDay: string, actionType: string): Number {
  if (partialDay === "firstHalf" && actionType === "startDate") {
    date.setHours(0, 0, 0, 0);
  } else if (partialDay==="secondHalf" && actionType === "startDate") {
    date.setHours(12,0,0,0)
  }else if (partialDay==="firstHalf" && actionType === "endDate") {
    date.setHours(12,0,0,0)
  }else if (partialDay==="secondHalf" && actionType === "endDate") {
    date.setHours(23,59,59,999)
  }
  return date.getTime();
};




interface LeaveHistoryType {
  resourceId: string;
  startTime: Date; // ISO 8601 string representation of the date and time
  endTime: Date;   // ISO 8601 string representation of the date and time
  status: string; // Status can be extended based on your needs
  description: string;
  duration:number;
  leaveType: string; // Type of leave (sick, vacation, etc.)
}  

export function calculateDuration(
  startDate: Date,
  endDate: Date,
  startDatePartial: string,
  endDatePartial: string,
  holidays: HolidaysType[]|null
): number {
  let duration = 0;
  let date = new Date(startDate);
  date.setHours(0, 0, 0, 0);
  endDate.setHours(0,0,0,0)
  startDate.setHours(0,0,0,0)
  
  // Extract day and month from holidays
    const holidaySet = new Set(
      holidays?.map(d => `${(d.date).getMonth()}-${(d.date).getDate()}`)
    );
 

 

  while (date <= endDate) {
    // Check if the date is not a weekend and is a holiday
    const dayMonth = `${date.getMonth()}-${date.getDate()}`;
    if (date.getDay() !== 0 && date.getDay() !== 6 &&
      holidays&&  holidaySet.has(dayMonth)) {
      //duration += 8;
      continue

    } else if (date.getDay() !== 0 && date.getDay() !== 6) {
      duration += 8;

    }
    date.setDate(date.getDate() + 1);
  }
if (endDate.getTime()===startDate.getTime() && date.getDay() !== 0 && date.getDay() !== 6){
  duration=8
}
  if (startDatePartial === endDatePartial) {
    duration -= 4;


  }


  return duration;
}
export function getMonthName(index: number): string {
  const monthNames: string[] = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ];

  if (index < 0 || index > 11) {
    return 'Invalid month';
  }

  return monthNames[index];
}


export function getWeekName(index:number):string{
  const weekDays:string[] = [
     'Sunday',
     'Monday',
     'Tuesday',
     'Wednesday',
     'Thursday',
     'Friday',
     'Saturday'
  ]
  if (index < 0 || index > 6) {
    return 'Invalid Day';
  }

  return weekDays[index];


}

export function convertTo12HourFormat(time24:string):string {
  // Parse the time24 string to get hours and minutes
  const [hours, minutes] = time24.split(':').map(Number);

  // Determine AM or PM suffix
  const ampm = hours >= 12 ? 'PM' : 'AM';

  // Convert 24-hour format to 12-hour format
  const hours12 = hours % 12 || 12; // Convert 0 hours to 12
  const minutesFormatted = minutes.toString().padStart(2, '0'); // Format minutes with leading zero if needed

  // Return formatted time
  return `${hours12}:${minutesFormatted} ${ampm}`;
}