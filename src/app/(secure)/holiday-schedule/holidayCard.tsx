
import { Card } from "@/src/components/ui/card"
import React from "react"
import { getMonthName,getWeekName } from "@/src/lib/timeFormat"
import { HolidaysType } from "@/src/types/holiday"
const HolidayCard:React.FC<HolidaysType>=({eventName,description,date})=>{
const isDisabled =  (date.getTime() < (new Date().getTime() - new Date().getTimezoneOffset() * 60000));

return (
    <div
      className={`border-blue-900 border border-solid rounded-sm w-[450px] mr-2 mt-2 mb-2 grid grid-cols-[1fr_5fr] ${
        isDisabled ? "opacity-50 pointer-events-none" : ""
      }`}
    >
    
    <div className="bg-blue-900 p-3  text-white text-center">
        <h1 className="text-md text-white">{getMonthName(date.getMonth())}</h1>
        <p>{date.getDate()}</p>
    </div>
    <div className=" grid items-center pl-2 ">
        <div>
        <h1 className="text-md font-semibold flex text-blue-900">{eventName}</h1>
        <p className="text-xs text-slate-500 font-medium">{getWeekName(date.getDay())}</p>
        </div>
    </div>
</div> 
)}

export default HolidayCard