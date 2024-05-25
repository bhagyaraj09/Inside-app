'use client'
import React from 'react'
import { SubmitButton } from '@/components/ui/submit-button'
import { Label } from '@/components/ui/label'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import ServicesSelect from '@/src/components/time/services-select';
import ProjectsSelect from '@/src/components/time/projects-select'
import DatesSelect from './dates-select'
import { FormType, SOWResource, Service, Timesheet } from '@/types';
import { Card, CardContent,} from "@/components/ui/card"
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
        <div className="mt-5">
            <Card>
                <CardContent>
                    <h2 className="text-lg font-medium py-3">Record your time<i className="ml-2 fa-regular fa-clock text-sm"></i></h2>
                    <div className='flex'>
                        <span className='mr-2 w-48'>
                            <div>Date</div>
                            <DatesSelect startDate={new Date()} selectedDate='2024-05-23' />
                        </span>
                        <span className='mr-2 w-72'>
                            <div>Project</div>
                            <ProjectsSelect projects={props.projects} id='' />
                        </span>
                        <span className='mr-2 w-72'>
                            <div>Service</div>
                            <ServicesSelect services={props.services} id='' />
                        </span>
                        <span className='mr-2 w-20'>
                            <div>Hours</div>
                            <Input type="text" placeholder="Hours" />
                        </span>
                        <span className='mr-2 w-72'>
                            <div>Description</div>
                            <Textarea placeholder="Type your description here." className='h-9'/>
                        </span>
                        <span className='mr-2 w-20 grid items-center justify-center'>
                            <div>Billable</div>
                            <div className='flex items-center justify-center'>
                                <Checkbox>Billable</Checkbox>
                            </div>
                        </span>
                        <span>
                            <div>&nbsp;</div>
                            <Button variant="outline"><i className='mr-2 fa-regular fa-square-plus'></i>Add Time</Button>
                        </span>
                    </div>
                </CardContent>
            </Card>
        </div>
    </form>
    )
}