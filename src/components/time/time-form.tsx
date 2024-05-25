'use client'
import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import ServicesSelect from '@/src/components/time/services-select';
import ProjectsSelect from '@/src/components/time/projects-select'
import DatesSelect from './dates-select'
import { FormType, SOWResource, Service, Timesheet } from '@/types';
import { addTime, updateTime } from '@/src/actions/timeSheet'

interface TimeFormProps {
    projects: SOWResource[];
    services: Service[];
    timeheet: Timesheet;
    formType: FormType;
}

export default function TimeForm(props: TimeFormProps) {
  return (
    <form action={async (formData) => {                
        if(props.formType == "Add")
          await addTime(formData) 
        else
          await updateTime(formData) 
    }} >
        <div className='md:flex'>
            <span className='mr-1 w-full md:w-32'>
                <DatesSelect startDate={new Date()} selectedDate='2024-05-23' />
            </span>
            <span className='mr-1 w-full md:w-56'>
                <ProjectsSelect projects={props.projects} id='' />
            </span>
            <span className='mr-1 w-full md:w-40'>
                <ServicesSelect services={props.services} id='' />
            </span>
            <span className='mr-1 w-full md:w-16'>
                <Input type="text" placeholder="hrs" />
            </span>
            <span className='mr-1 w-full md:w-56'>
                <Textarea placeholder="type your description here." className='h-9'/>
            </span>
            <span className='mr-1 w-full md:w-20 md:grid md:items-center md:justify-center'>
                <div className='md:flex items-center justify-center'>
                    <Checkbox checked>Billable</Checkbox>
                </div>
            </span>
            {props.formType == "Edit" ?
                <span className="mr-1 w-full md:w-20">
                    <span>
                        <Button variant='outline'><i className="fa-regular fa-trash-can text-red-700"></i></Button>
                    </span>
                    <span>
                        <Button variant='outline'><i className="fa-regular fa-floppy-disk"></i></Button>
                    </span>
                </span>
            :
                <span className="mr-1 w-full md:w-20">
                    <Button variant="outline"><i className='mr-2 fa-regular fa-square-plus'></i>Add Time</Button>
                </span>
            }
        </div>
    </form>
    )
}