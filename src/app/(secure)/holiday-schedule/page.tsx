"use client"
import Title from '@/components/ui/title'
import Container from '@/components/ui/container'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import HolidayCard from './holidayCard'
import { useEffect, useState } from 'react'
import { fetchAllHolidays } from '@/src/actions/event'
import { HolidaysType } from '@/src/types/holiday'
import Image from 'next/image';
import CalendarIcon from "../../../../public/holidays.svg"
export default function HolidaySchedule() {
  const [holidays, setHolidays] = useState<HolidaysType[]|null>(null)
  const [nextEvent,setNextEvent]=useState<HolidaysType|null>(null)

  useEffect(()=>{
    const Holidays=async ()=>{
      try{
        const data=await fetchAllHolidays() 
        if (data) {
          setHolidays(data)
          const currDate=new Date()
          for (const holiday of data) {
            if (holiday.date.getTime() >= currDate.getTime() - currDate.getTimezoneOffset() * 60000) {
              setNextEvent(holiday);
              break; // Exit loop once the condition is met
            }
          }

        }
  
      }
      catch(err){
        console.error('Failed to fetch data:', err)
      }

    }
    Holidays()
  },[])
  return (
    <>
      <Title title="Holiday Schedule"></Title>
      <Container>
        <div className="p-2  ">
            {/* <div className="flex flex-row  items-center justify-between space-y-0 pb-2">
              <h1 className="text-2xl font-bold ">
                Holidays
              </h1>
                   </div> */}
                {nextEvent &&   <Card className='w-[450px] flex items-center justify-between rounded-sm text-white p-6 my-2 ' style={{ background: 'linear-gradient(to right, #3b82f6, #1e40af,#1e3a8a)' }}>
                   <div>
                    <h6>Upcoming Event</h6>
                    <h1 className='text-lg font-semibold'>{nextEvent?.eventName}</h1> 
                    <p>{`${nextEvent?.date.toDateString().split(" ")[1]} ${nextEvent?.date.toDateString().split(" ")[2]}`}</p>
                    
                    </div>
                    <div>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={100}
    height={100}
    viewBox="0 0 60 60"
    style={{ fill: 'white' }} // This sets the fill color for all paths

  >
    <path  d="M55 4h-2V3a3 3 0 0 0-6 0v1h-4V3a3 3 0 0 0-6 0v1h-4V3a3 3 0 0 0-6 0v1h-4V3a3 3 0 0 0-6 0v1h-4V3a3 3 0 0 0-6 0v1H5a5.006 5.006 0 0 0-5 5v38a5.006 5.006 0 0 0 5 5h2.01a13.871 13.871 0 0 0-1.91 5.8 2.029 2.029 0 0 0 .52 1.547A2 2 0 0 0 7.1 60H53a2 2 0 0 0 1.477-.651 2.03 2.03 0 0 0 .52-1.548 13.881 13.881 0 0 0-1.91-5.8H55a5.006 5.006 0 0 0 5-5V9a5.006 5.006 0 0 0-5-5Zm-6-1a1 1 0 0 1 2 0v4a1 1 0 0 1-2 0ZM39 3a1 1 0 0 1 2 0v4a1 1 0 0 1-2 0ZM29 3a1 1 0 0 1 2 0v4a1 1 0 0 1-2 0ZM19 3a1 1 0 0 1 2 0v4a1 1 0 0 1-2 0ZM9 3a1 1 0 0 1 2 0v4a1 1 0 0 1-2 0ZM5 6h2v1a3 3 0 0 0 6 0V6h4v1a3 3 0 0 0 6 0V6h4v1a3 3 0 0 0 6 0V6h4v1a3 3 0 0 0 6 0V6h4v1a3 3 0 0 0 6 0V6h2a3 3 0 0 1 3 3v3H2V9a3 3 0 0 1 3-3Zm2.1 52-.005-.018c.68-7.493 8.781-13.524 19.115-14.743l1.117 2.573a1 1 0 0 0 .918.6.987.987 0 0 0 .4-.083 1 1 0 0 0 .518-1.315l-.849-1.956c.575-.03 1.151-.059 1.737-.059a30.559 30.559 0 0 1 12.33 2.505L41.48 47h-8.9a2 2 0 0 0-1.664.891l-1.7 2.554a1 1 0 1 0 1.664 1.11L32.581 49h8.93l1.7 2.555a1 1 0 1 0 1.664-1.11l-1.649-2.473.949-1.582C49.2 49.119 52.569 53.269 53 58ZM55 50h-3.312a21.742 21.742 0 0 0-6.494-5.3l.709-1.182a1 1 0 0 0-1.715-1.03L43.4 43.8A32.307 32.307 0 0 0 30.046 41c-.874 0-1.737.035-2.589.1L24 33.129a10.824 10.824 0 0 1 3.6-.633.962.962 0 0 0 .878-.432 7.518 7.518 0 0 1 6.36-2.764 1.008 1.008 0 0 0 1.018-.5 1 1 0 0 0-.1-1.128c-3.787-4.6-10.645-5.979-16.679-3.358s-9.7 8.576-8.932 14.482a1 1 0 0 0 .757.843 1.046 1.046 0 0 0 .235.027 1 1 0 0 0 .824-.434 7.522 7.522 0 0 1 6.365-2.764 1.01 1.01 0 0 0 .913-.345 10.927 10.927 0 0 1 2.921-2.2l3.211 7.393C18.159 42.309 12 45.546 8.4 50H5a3 3 0 0 1-3-3V14h56v33a3 3 0 0 1-3 3ZM18.878 33.727c-1.039-3.15-.675-5.758 1.033-7.493 2.414-.061 4.584 1.451 6.18 4.36a14.313 14.313 0 0 0-7.213 3.133Zm9.029-3.972a11.084 11.084 0 0 0-4.32-4.633 12.065 12.065 0 0 1 9.071 2.3 9.608 9.608 0 0 0-4.751 2.331ZM17.026 34.48a9.62 9.62 0 0 0-4.945 1.881 12.059 12.059 0 0 1 4.5-8.194 11.081 11.081 0 0 0 .445 6.313Z" />
    <path d="M50.046 24H48.9a3.915 3.915 0 0 0-.425-1.019l.809-.809a1 1 0 1 0-1.414-1.414l-.809.809a3.915 3.915 0 0 0-1.019-.425V20a1 1 0 1 0-2 0v1.142a3.915 3.915 0 0 0-1.019.425l-.809-.809a1 1 0 0 0-1.414 1.414l.809.809A3.915 3.915 0 0 0 41.188 24h-1.142a1 1 0 1 0 0 2h1.142a3.915 3.915 0 0 0 .425 1.019l-.809.809a1 1 0 1 0 1.414 1.414l.809-.809a3.915 3.915 0 0 0 1.019.425V30a1 1 0 0 0 2 0v-1.142a3.915 3.915 0 0 0 1.019-.425l.809.809a1 1 0 1 0 1.414-1.414l-.809-.809A3.915 3.915 0 0 0 48.9 26h1.142a1 1 0 0 0 0-2Zm-5 3a2 2 0 1 1 2-2 2 2 0 0 1-2 2Z" />
  </svg>
                    </div>

                   </Card>}
                   <h1 className="text-lg font-semibold my-4">List of Holidays</h1>

            <div className="flex flex-row flex-wrap my-2" >
                          {holidays?.map((holiday,index)=><HolidayCard key={`${holiday.eventName}${index}`} eventName={holiday.eventName} description={holiday.description} date={holiday.date}/>)}
            </div>
            <p>*If a holiday falls on a Saturday, the preceding Friday will be treated as a holiday for pay and leave purposes. If a holiday falls on a Sunday, the following Monday will be treated as a holiday for pay and leave purposes.</p>  

        </div>            
      </Container>
    </>
  )
}
