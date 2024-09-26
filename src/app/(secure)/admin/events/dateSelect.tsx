"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerType {
  date: Date | null;
  setDate: (date: Date | null) => void; // Callback to set date
  edit:boolean;
}

export const DatePicker: React.FC<DatePickerType> = ({ date, setDate,edit }) => {
  const handleSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate || null);
  };

  return (
    <Popover >
      <PopoverTrigger asChild className="p-0 ">
        <Button
          variant={edit?"outline":"ghost"}
          className={cn(
            "w-full justify-start text-left font-semibold ",
            !date && "text-muted-foreground",
            edit && "p-2",
            !edit&& "border-none outline-none hover:bg-transparent hover:text-current hover:shadow-none cursor-default"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4 font-semibold" />
          {date ? format(date, "PP").replace(","," ") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      {edit &&
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date || undefined} // Pass undefined instead of null
          onSelect={handleSelect}
          initialFocus
        />
      </PopoverContent>}
    </Popover>
  );
};
