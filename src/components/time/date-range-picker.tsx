"use client"

import * as React from "react"
import { CalendarIcon } from "@radix-ui/react-icons"
import { addDays, format } from "date-fns"
import { DateRange } from "react-day-picker"

import { cn } from "@/src/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function CalendarDateRangePicker({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {

    var curr = new Date; // get current date
    var first = curr.getDate() - curr.getDay() + 1; // First day is the day of the month - the day of the week
    var last = first + 6; // last day is the first day + 6
    
    var firstday = new Date(curr.setDate(first));
    var lastday = new Date(curr.setDate(last));


  const [date, setDate] = React.useState<DateRange | undefined>({
    from: firstday,
    to: lastday,
  })

  return (
    <div className={cn("border h-9 items-center justify-center rounded-md flex px-2", className)}>      
      <CalendarIcon className="mr-2 h-4 w-4" />
      {date?.from ? (
        date.to ? (
          <>
            {format(date.from, "LLL dd, y")} -{" "}
            {format(date.to, "LLL dd, y")}
          </>
        ) : (
          format(date.from, "LLL dd, y")
        )
      ) : (
        <span>Pick a date</span>
      )}  
    </div>
  )
}