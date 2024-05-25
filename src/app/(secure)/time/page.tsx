import { CalendarDateRangePicker } from "@/components/time/date-range-picker"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent,} from "@/components/ui/card"
import { SOWResource, Service, Timesheet } from '@/types';
import { getServerSession } from "next-auth";
import { getProjectsByResource } from '@/src/actions/sowResource'
import { getServicesData } from '@/src/actions/service';
import { fetchResource } from '@/src/actions/resource'
import { fetchTime } from '@/src/actions/timeSheet'
import { authOptions } from '@/utils/auth'

import Title from '@/components/ui/title'
import Container from '@/components/ui/container'
import ServicesSelect from '@/src/components/time/services-select';
import ProjectsSelect from '@/src/components/time/projects-select'
import TimeForm from '@/src/components/time/time-form'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default async function Time() {
  const session = await getServerSession(authOptions);
  const resource = await fetchResource(session?.user.email as string);  
  const services: Service[] = await getServicesData();
  const projects: SOWResource[] = await getProjectsByResource(session?.user.email as string);
  //const timeshets: Timesheet[] = await fetchTime(resource.id, new Date(), new Date()); 
  var newTimesheet: Timesheet = {
    id: '',
    date: new Date(),
    sowId: '',
    resourceId: '',
    serviceId: '',
    hours: undefined,
    description: '',
    billable: false,
    status: ''
  }
    
  return (
    <>
      <Title title="Time"></Title>
      <Container>
        <div className="p-2">
          <div className="items-center justify-between">
            <div className="flex items-center">
              <Button variant="outline" size="icon">
                <i className="fa-solid fa-arrow-left"></i>
              </Button>
              <CalendarDateRangePicker />
              <Button variant="outline" size="icon">
                <i className="fa-solid fa-arrow-right"></i>
              </Button>
              <Button variant="outline" className='ml-2'>
                <i className="fa-solid fa-print mr-2"></i>Print Time
              </Button>
            </div>
          </div>
          <TimeForm projects={projects} services={services} timeheet={newTimesheet} formType='Add' />
          <div className="mt-5">
            <Card>
              <CardContent>                
                <h2 className="text-lg font-medium py-3">Timesheet<i className="ml-2 fa-solid fa-table-cells text-sm"></i></h2>                
                <div className='flex mb-1'>
                  <span className='mr-2 w-48'>Date</span>
                  <span className='mr-2 w-72'>Project</span>
                  <span className='mr-2 w-72'>Service</span>
                  <span className='mr-2 w-20'>Hours</span>
                  <span className='mr-2 w-72'>Description</span>
                  <span className='mr-2 w-20 flex justify-center'>Billable</span>
                  <span className='mr-2'></span>
                </div>
                <div className='flex mb-1'>
                  <span className='mr-2 w-48'>
                    <Select defaultValue='13'>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a date" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="13">Mon, May 13th, 2024</SelectItem>
                        <SelectItem value="14">Tue, May 14th, 2024</SelectItem>
                        <SelectItem value="15">Wed, May 15th, 2024</SelectItem>
                        <SelectItem value="16">Thu, May 16th, 2024</SelectItem>
                        <SelectItem value="17">Fri, May 17th, 2024</SelectItem>
                        <SelectItem value="18">Sat, May 18th, 2024</SelectItem>
                        <SelectItem value="19">Sun, May 19th, 2024</SelectItem>                      
                      </SelectContent>
                    </Select>
                  </span>
                  <span className='mr-2 w-72'>
                    <ProjectsSelect projects={projects} id='' />
                  </span>
                  <span className='mr-2 w-72'>
                    <ServicesSelect services={services} id='' />
                  </span>
                  <span className='mr-2 w-20'>
                    <Input type="text" placeholder="Hours" />
                  </span>
                  <span className='mr-2 w-72'>
                    <Textarea placeholder="Type your description here." className='h-9'/>
                  </span>
                  <span className='mr-2 w-20 flex items-center justify-center'>
                    <Checkbox>Billable</Checkbox>
                  </span>
                  <span className='mr-1'>
                    <Button variant='outline'><i className="fa-regular fa-trash-can text-red-700"></i></Button>
                  </span>
                  <span>
                    <Button variant='outline'><i className="fa-regular fa-floppy-disk"></i></Button>
                  </span>
                </div>
                <div className='flex mb-1'>
                  <span className='mr-2 w-48'>
                    <Select defaultValue='14'>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a date" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="13">Mon, May 13th, 2024</SelectItem>
                        <SelectItem value="14">Tue, May 14th, 2024</SelectItem>
                        <SelectItem value="15">Wed, May 15th, 2024</SelectItem>
                        <SelectItem value="16">Thu, May 16th, 2024</SelectItem>
                        <SelectItem value="17">Fri, May 17th, 2024</SelectItem>
                        <SelectItem value="18">Sat, May 18th, 2024</SelectItem>
                        <SelectItem value="19">Sun, May 19th, 2024</SelectItem>                      
                      </SelectContent>
                    </Select>
                  </span>
                  <span className='mr-2 w-72'>
                    <ProjectsSelect projects={projects} id='' />
                  </span>
                  <span className='mr-2 w-72'>
                    <ServicesSelect services={services} id='' />
                  </span>
                  <span className='mr-2 w-20'>
                    <Input type="text" placeholder="Hours" />
                  </span>
                  <span className='mr-2 w-72'>
                    <Textarea placeholder="Type your description here." className='h-9'/>
                  </span>
                  <span className='mr-2 w-20 flex items-center justify-center'>
                    <Checkbox>Billable</Checkbox>
                  </span>
                  <span className='mr-1'>
                    <Button variant='outline'><i className="fa-regular fa-trash-can text-red-700"></i></Button>
                  </span>
                  <span>
                    <Button variant='outline'><i className="fa-regular fa-floppy-disk"></i></Button>
                  </span>
                </div>
                <div className='flex mb-1'>
                  <span className='mr-2 w-48'>
                    <Select defaultValue='15'>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a date" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="13">Mon, May 13th, 2024</SelectItem>
                        <SelectItem value="14">Tue, May 14th, 2024</SelectItem>
                        <SelectItem value="15">Wed, May 15th, 2024</SelectItem>
                        <SelectItem value="16">Thu, May 16th, 2024</SelectItem>
                        <SelectItem value="17">Fri, May 17th, 2024</SelectItem>
                        <SelectItem value="18">Sat, May 18th, 2024</SelectItem>
                        <SelectItem value="19">Sun, May 19th, 2024</SelectItem>                      
                      </SelectContent>
                    </Select>
                  </span>
                  <span className='mr-2 w-72'>
                    <ProjectsSelect projects={projects} id='' />
                  </span>
                  <span className='mr-2 w-72'>
                    <ServicesSelect services={services} id='' />
                  </span>
                  <span className='mr-2 w-20'>
                    <Input type="text" placeholder="Hours" />
                  </span>
                  <span className='mr-2 w-72'>
                    <Textarea placeholder="Type your description here." className='h-9'/>
                  </span>
                  <span className='mr-2 w-20 flex items-center justify-center'>
                    <Checkbox>Billable</Checkbox>
                  </span>
                  <span className='mr-1'>
                    <Button variant='outline'><i className="fa-regular fa-trash-can text-red-700"></i></Button>
                  </span>
                  <span>
                    <Button variant='outline'><i className="fa-regular fa-floppy-disk"></i></Button>
                  </span>
                </div>
                <div className='flex mb-1'>
                  <span className='mr-2 w-48'>
                    <Select defaultValue='16'>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a date" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="13">Mon, May 13th, 2024</SelectItem>
                        <SelectItem value="14">Tue, May 14th, 2024</SelectItem>
                        <SelectItem value="15">Wed, May 15th, 2024</SelectItem>
                        <SelectItem value="16">Thu, May 16th, 2024</SelectItem>
                        <SelectItem value="17">Fri, May 17th, 2024</SelectItem>
                        <SelectItem value="18">Sat, May 18th, 2024</SelectItem>
                        <SelectItem value="19">Sun, May 19th, 2024</SelectItem>                      
                      </SelectContent>
                    </Select>
                  </span>
                  <span className='mr-2 w-72'>
                    <ProjectsSelect projects={projects} id='' />
                  </span>
                  <span className='mr-2 w-72'>
                    <ServicesSelect services={services} id='' />
                  </span>
                  <span className='mr-2 w-20'>
                    <Input type="text" placeholder="Hours" />
                  </span>
                  <span className='mr-2 w-72'>
                    <Textarea placeholder="Type your description here." className='h-9'/>
                  </span>
                  <span className='mr-2 w-20 flex items-center justify-center'>
                    <Checkbox>Billable</Checkbox>
                  </span>
                  <span className='mr-1'>
                    <Button variant='outline'><i className="fa-regular fa-trash-can text-red-700"></i></Button>
                  </span>
                  <span>
                    <Button variant='outline'><i className="fa-regular fa-floppy-disk"></i></Button>
                  </span>
                </div>
                <div className='flex mb-1'>
                  <span className='mr-2 w-48'>
                    <Select defaultValue='17'>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a date" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="13">Mon, May 13th, 2024</SelectItem>
                        <SelectItem value="14">Tue, May 14th, 2024</SelectItem>
                        <SelectItem value="15">Wed, May 15th, 2024</SelectItem>
                        <SelectItem value="16">Thu, May 16th, 2024</SelectItem>
                        <SelectItem value="17">Fri, May 17th, 2024</SelectItem>
                        <SelectItem value="18">Sat, May 18th, 2024</SelectItem>
                        <SelectItem value="19">Sun, May 19th, 2024</SelectItem>                      
                      </SelectContent>
                    </Select>
                  </span>
                  <span className='mr-2 w-72'>
                    <ProjectsSelect projects={projects} id='' />
                  </span>
                  <span className='mr-2 w-72'>
                    <ServicesSelect services={services} id='' />
                  </span>
                  <span className='mr-2 w-20'>
                    <Input type="text" placeholder="Hours" />
                  </span>
                  <span className='mr-2 w-72'>
                    <Textarea placeholder="Type your description here." className='h-9'/>
                  </span>
                  <span className='mr-2 w-20 flex items-center justify-center'>
                    <Checkbox>Billable</Checkbox>
                  </span>
                  <span className='mr-1'>
                    <Button variant='outline'><i className="fa-regular fa-trash-can text-red-700"></i></Button>
                  </span>
                  <span>
                    <Button variant='outline'><i className="fa-regular fa-floppy-disk"></i></Button>
                  </span>
                </div>
                <div className='flex mb-1'>
                  <span className='mr-2 w-48'>
                    <Select defaultValue='18'>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a date" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="13">Mon, May 13th, 2024</SelectItem>
                        <SelectItem value="14">Tue, May 14th, 2024</SelectItem>
                        <SelectItem value="15">Wed, May 15th, 2024</SelectItem>
                        <SelectItem value="16">Thu, May 16th, 2024</SelectItem>
                        <SelectItem value="17">Fri, May 17th, 2024</SelectItem>
                        <SelectItem value="18">Sat, May 18th, 2024</SelectItem>
                        <SelectItem value="19">Sun, May 19th, 2024</SelectItem>                      
                      </SelectContent>
                    </Select>
                  </span>
                  <span className='mr-2 w-72'>
                    <ProjectsSelect projects={projects} id='' />
                  </span>
                  <span className='mr-2 w-72'>
                    <ServicesSelect services={services} id='' />
                  </span>
                  <span className='mr-2 w-20'>
                    <Input type="text" placeholder="Hours" />
                  </span>
                  <span className='mr-2 w-72'>
                    <Textarea placeholder="Type your description here." className='h-9'/>
                  </span>
                  <span className='mr-2 w-20 flex items-center justify-center'>
                    <Checkbox>Billable</Checkbox>
                  </span>
                  <span className='mr-1'>
                    <Button variant='outline'><i className="fa-regular fa-trash-can text-red-700"></i></Button>
                  </span>
                  <span>
                    <Button variant='outline'><i className="fa-regular fa-floppy-disk"></i></Button>
                  </span>
                </div>
                <div className='flex mb-1'>
                  <span className='mr-2 w-48'>
                    <Select defaultValue='19'>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a date" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="13">Mon, May 13th, 2024</SelectItem>
                        <SelectItem value="14">Tue, May 14th, 2024</SelectItem>
                        <SelectItem value="15">Wed, May 15th, 2024</SelectItem>
                        <SelectItem value="16">Thu, May 16th, 2024</SelectItem>
                        <SelectItem value="17">Fri, May 17th, 2024</SelectItem>
                        <SelectItem value="18">Sat, May 18th, 2024</SelectItem>
                        <SelectItem value="19">Sun, May 19th, 2024</SelectItem>                      
                      </SelectContent>
                    </Select>
                  </span>
                  <span className='mr-2 w-72'>
                    <ProjectsSelect projects={projects} id='' />
                  </span>
                  <span className='mr-2 w-72'>
                    <ServicesSelect services={services} id='' />
                  </span>
                  <span className='mr-2 w-20'>
                    <Input type="text" placeholder="Hours" />
                  </span>
                  <span className='mr-2 w-72'>
                    <Textarea placeholder="Type your description here." className='h-9'/>
                  </span>
                  <span className='mr-2 w-20 flex items-center justify-center'>
                    <Checkbox>Billable</Checkbox>
                  </span>
                  <span className='mr-1'>
                    <Button variant='outline'><i className="fa-regular fa-trash-can text-red-700"></i></Button>
                  </span>
                  <span>
                    <Button variant='outline'><i className="fa-regular fa-floppy-disk"></i></Button>
                  </span>
                </div>                
                <div className="mt-5">
                  <Button variant="outline"><span className='text-green-800 font-semibold'><i className="mr-2 fa-solid fa-list-check"></i>Submit for Approval</span></Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </>
  )
}