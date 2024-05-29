'use client'
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import ServicesSelect from '@/src/components/time/services-select';
import ProjectsSelect from '@/src/components/time/projects-select'
import DatesSelect from './dates-select'
import { FormType, SOWResource, Service, Timesheet } from '@/types';
import { addTime, deleteTime, fetchTime, updateTime } from '@/src/actions/timeSheet';
import Conditional from '@/components/custom/conditional'
interface TimeFormProps {
    projects: SOWResource[];
    services: Service[];
    timesheet: Timesheet;
    formType: FormType;
    defaultProject: string;
    defaultService: string
    startDate: Date;
    resourceId: string;
    setTimesheets: React.Dispatch<React.SetStateAction<Timesheet[]>>;
}

export default function TimeForm(props: TimeFormProps) {
    
    const disabled: boolean = props.timesheet?.status!= "Added" && props.timesheet?.status != "Rejected";    
    const [billable, setBillable] = useState<boolean>(props.timesheet.billable?? true);
    function setTimeBillable(timeBillable: boolean){
        props.timesheet.billable = timeBillable;        
        setBillable(timeBillable);
    }
    const getTimesheets = async() => {
        try{
            const curr = new Date(props.startDate.toString()); // get current date
            const first = curr.getDate() - curr.getDay() + 1; // First day is the day of the month - the day of the week        
            const response =  await fetchTime(props.resourceId ?? "", new Date(curr.setDate(first)), new Date(curr.setDate(first + 6))); // last day is the first day + 6
            props.setTimesheets(response);
        } catch(error) {
          console.log(error);
        }  
      }
    return (
        <form action={async (formData) => {                
            if(props.formType == "Add"){
                await addTime(formData);                
                getTimesheets();
            }
            else{
                const action = formData.get("action") as string;
                if(action == "delete"){                    
                    await deleteTime(formData.get("id") as string);
                    getTimesheets();
                }
                else if(action == "update"){
                    await updateTime(formData) 
                }
            }
        }} >
        <div className='md:flex'>
            <Conditional showWhen={props.formType == "Edit"}>
                <input type="hidden" name="id" value={props.timesheet.id} />
            </Conditional>
            <input type="hidden" name="email" value={props.timesheet.email} />
            <input type="hidden" name="resourceId" value={props.timesheet.resourceId} />
            <span className='mr-1 w-full md:w-44'>
                <DatesSelect startDate={props.startDate} selectedDate={new Date(props.timesheet.date).toLocaleDateString()} disabled={disabled}/>
            </span>
            <span className='mr-1 w-full md:w-56'>
                <ProjectsSelect projects={props.projects} id={props.defaultProject}  disabled={disabled}/>
            </span>
            <span className='mr-1 w-full md:w-36'>
                <ServicesSelect services={props.services} id={props.defaultService}  disabled={disabled}/>
            </span>
            <span className='mr-1 w-full md:w-16'>
                <Input id="hours" name="hours" type="text" placeholder="hrs" defaultValue={props.timesheet?.hours} disabled={disabled} />
            </span>
            <span className='mr-1 w-full md:w-56'>
                <Textarea id="description" name="description" placeholder="type your description here." className='h-9' defaultValue={props.timesheet?.description} disabled={disabled} />
            </span>
            <span className='mr-1 w-full md:w-20 md:grid md:items-center md:justify-center'>
                <div className='md:flex items-center justify-center'>
                    <Checkbox checked={billable} onCheckedChange={setTimeBillable} name="billable" id="billable">Billable</Checkbox>                    
                </div>
            </span>
            {props.formType == "Edit" ?
                <span className="w-full md:w-24">
                    <span className="mr-1">
                        <Button variant='outline'  disabled={disabled} value="delete" name="action"><i className="fa-regular fa-trash-can text-red-700"></i></Button>
                    </span>
                    <span>
                        <Button variant='outline'  disabled={disabled} value="update" name="action"><i className="fa-regular fa-floppy-disk"></i></Button>
                    </span>
                </span>            :
                <span className="mr-1 w-full md:w-20">
                    <Button variant="outline"><i className='mr-2 fa-regular fa-square-plus'></i>Add Time</Button>
                </span>
            }
        </div>
    </form>
    )
}