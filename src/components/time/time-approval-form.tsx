'use client'
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { FormType, SOWResource, Service, Timesheet } from '@/types';
import { addTime, deleteTime, fetchTime, updateTime } from '@/src/actions/timeSheet';

interface TimeFormProps {
    timesheets: Timesheet[];    
    currentDate: Date;
    resourceId: string;
    dateMode: string;
    setTimesheets: React.Dispatch<React.SetStateAction<Timesheet[]>>;
    setTotalHours: React.Dispatch<React.SetStateAction<number>>;
}

export default function TimeApprovalForm(props: TimeFormProps) {
    const [error, setError] = useState<string>('');
    //const disabled: boolean = props.timesheet?.status!= "Added" && props.timesheet?.status != "Rejected";    
    
    const getTimesheets = async() => {
        try{
            const curr = new Date(props.currentDate.toString()); // get current date
            const first = curr.getDate() - curr.getDay() + 1; // First day is the day of the month - the day of the week
            const response =  await fetchTime(props.resourceId ?? "", props.dateMode == "Day" ? new Date(curr) : new Date(curr.setDate(first)), props.dateMode == "Day" ? new Date(curr) : new Date(curr.setDate(first + (props.dateMode == "Day" ? 0 : 6)))); // last day is the first day + 6
            props.setTimesheets(response);
            props.setTotalHours (response.reduce((total, timesheet) => total + parseFloat(timesheet.hours?? 0), 0));     
        } catch(error) {
          console.log(error);
        }  
    }
    return (
        <form action={async (formData) => {
            await updateTime(formData);
            getTimesheets();            
        }} >
        {props.timesheets.map((timesheet, index) => 
        <div key={timesheet.id} className='md:flex'>                        
            <input type="hidden" name="id" value={timesheet.id} />
            <span className='mr-1 w-full md:w-30'>
                {new Date(timesheet.date).toDateString()}
            </span>
            <span className='mr-1 w-full md:w-20'>
                {timesheet.service?.name}
            </span>
            <span className='mr-1 w-full md:w-20'>
                {timesheet.hours}
            </span>
            <span className='mr-1 w-full md:w-56'>
                {timesheet.description}
            </span>
            <span className='mr-1 w-full md:w-56'>
                {timesheet.billable ? "Billable" : "Non-Billable"}
            </span>
            <span className="w-full md:w-24 md:grid md:items-center md:justify-center">
                <span className="mr-1 font-semibold text-blue-800">
                    {timesheet?.status}
                </span>
            </span>
        </div>
        )}
    </form>
    )
}