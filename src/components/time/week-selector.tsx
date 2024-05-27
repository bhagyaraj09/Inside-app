"use client"
import * as React from "react"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import { cn } from "@/src/lib/utils"

interface WeekSelectorProps {
  startDate: string;
}

export function WeekSelector(props: WeekSelectorProps, {
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
    var curr = new Date(props.startDate); // get current date
    var first = curr.getDate() - curr.getDay() + 1; // First day is the day of the month - the day of the week    
    var firstday = new Date(curr.setDate(first));
    var lastday = new Date(curr.setDate(first + 6));
  return (
    <div className={cn("border h-9 items-center justify-center rounded-md flex px-2 w-64", className)}>      
      <CalendarIcon className="mr-2 h-4 w-4" />
      {firstday ? (
        lastday ? (
          <>
            {format(firstday, "LLL dd, y")} -{" "}
            {format(lastday, "LLL dd, y")}
          </>
        ) : (
          format(firstday, "LLL dd, y")
        )
      ) : (
        <span>Pick a date</span>
      )}  
    </div>
  )
}