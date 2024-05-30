'use client'
import Conditional from "@/components/custom/conditional"
import { WeekSelector } from "@/components/time/week-selector"
import { Button } from "@/components/ui/button"
import { Card, CardContent,} from "@/components/ui/card"
import { SOWResource, Service, Timesheet, Resource } from '@/types';
import { getProjectsByResource } from '@/src/actions/sowResource'
import { getServicesData } from '@/src/actions/service';
import { fetchResource } from '@/src/actions/resource'
import { fetchTime, submitTimeForApproval } from '@/src/actions/timeSheet'
import { SetStateAction, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Title from '@/components/ui/title'
import Container from '@/components/ui/container'
import TimeForm from '@/src/components/time/time-form'

export default function Time() {
  const { data: session, status } = useSession();
  const [services, setServices] = useState<Service[]>([]);
  const [projects, setProjects] = useState<SOWResource[]>([]);
  const [resource, setResource] = useState<Resource>();
  const [selectedService, setSelectedService] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const [timesheets, setTimesheets] = useState<Timesheet[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [dateMode, setDateMode] = useState("Day");
  const handleSubmitforApproval = async() => {
    if(resource?.id){
      const curr = new Date(currentDate.toString()); // get current date
      const first = curr.getDate() - curr.getDay() + 1; // First day is the day of the month - the day of the week      
      const response =  await submitTimeForApproval(resource?.id ?? "", new Date(curr.setDate(first)), new Date(curr.setDate(first + (dateMode == "Day" ? 0 : 6))));
      setTimesheets(response);
    }  
  }
  useEffect(() => {    
    const getServices = async() => {
      try{        
        const response =  await getServicesData();
        setServices(response);        
      } catch(error) {
        console.log(error);
      }
    }
    getServices();
  }, []);  
  useEffect(() => {    
    const getResource = async() => {
      try{
        if(session?.user.email){
          const response =  await fetchResource(session?.user.email as string); 
          setResource(response)
        }
      } catch(error) {
        console.log(error);
      }
    }    
    getResource();      
    const getProjects = async() => {
      try{
        if(session?.user.email){
          const response =  await getProjectsByResource(session?.user.email as string);
          setProjects(response)          
        }
      } catch(error) {
        console.log(error);
      }
    }
    getProjects();
  }, [session?.user.email]);
  useEffect(() => {    
  const getTimesheets = async() => {
    try{
      if(resource?.id){
        const curr = new Date(currentDate.toString()); // get current date
        const first = curr.getDate() - curr.getDay() + 1; // First day is the day of the month - the day of the week        
        const response =  await fetchTime(resource?.id ?? "", dateMode == "Day" ? new Date(curr) : new Date(curr.setDate(first)), dateMode == "Day" ? new Date(curr) : new Date(curr.setDate(first + (dateMode == "Day" ? 0 : 6)))); // last day is the first day + 6
        setTimesheets(response);        
      }
    } catch(error) {
      console.log(error);
    }  
  }
  getTimesheets();
  }, [resource?.id, currentDate, dateMode]);
  var newTimesheet: Timesheet = { id: '', email:session?.user.email?? "",  date: new Date(), sowId: '', resourceId: resource?.id?? "", serviceId: '', hours: undefined, description: '', billable: true, status: 'Added' }   
  const handleNext = () => {    
    dateMode == "Day" ? setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() + 1))) : setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() + 7)));
  }
  const handlePrev = () => {
    dateMode == "Day" ? setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() - 1))) : setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() - 7)));
  }
  return (
    <>
      <Title title="Time"></Title>
      <Container>
        <div className="p-2">
          <div className="items-center justify-between">
            <div className="flex items-center">
              <Button variant="outline" size="icon" onClick={handlePrev}>
                <i className="fa-solid fa-arrow-left"></i>
              </Button>
              <WeekSelector currentDate={currentDate.toString()} dateMode={dateMode} setDateMode={setDateMode} />
              <Button variant="outline" size="icon" onClick={handleNext}>
                <i className="fa-solid fa-arrow-right"></i>
              </Button>
              <Button variant="outline" className='ml-2'>
                <i className="fa-solid fa-print md:mr-2"></i><span className='hidden md:block'>Print Time</span>
              </Button>
            </div>
          </div>
          <div className="mt-5">
            <Card>
              <CardContent>
                <h2 className="text-lg font-medium py-3">Record your time<i className="ml-2 fa-regular fa-clock text-sm"></i></h2>
                <div className="hidden md:block md:flex mb-1">
                  <span className='mr-1 w-44'>Date</span>
                  <span className='mr-1 w-56'>Project</span>
                  <span className='mr-1 w-36'>Service</span>
                  <span className='mr-1 w-16'>Hours</span>
                  <span className='mr-1 w-56'>Description</span>
                  <span className='mr-1 w-20 flex justify-center'>Billable</span>
                  <span className='mr-1'></span>
                </div>
                <TimeForm projects={projects} services={services} timesheet={newTimesheet} formType='Add' 
                  defaultProject={selectedProject} defaultService={selectedService} currentDate={currentDate} setTimesheets={setTimesheets} resourceId={resource?.id ?? ""} dateMode={dateMode}/>
              </CardContent>
            </Card>
          </div>
          <Conditional showWhen={timesheets.length > 0}>
            <div className="mt-5">
              <Card>
                <CardContent>                
                  <h2 className="text-lg font-medium py-3">Timesheet<i className="ml-2 fa-solid fa-table-cells text-sm"></i></h2>                
                  {timesheets.map((timesheet, index) => 
                    <div key={timesheet.id} className="border-b-4 mb-4 pb-4 md:mb-1 md:pb-0 md:border-b-0">
                      <div className= {index==0 ? "hidden md:block md:flex" : "hidden"}>
                        <span className='mr-1 w-44'>Date</span>
                        <span className='mr-1 w-56'>Project</span>
                        <span className='mr-1 w-36'>Service</span>
                        <span className='mr-1 w-16'>Hours</span>
                        <span className='mr-1 w-56'>Description</span>
                        <span className='mr-1 w-20 flex justify-center'>Billable</span>
                        <span className='mr-1'></span>
                      </div>
                      <TimeForm key={timesheet.id} projects={projects} services={services} timesheet={timesheet} formType='Edit' defaultProject={timesheet.sowId} defaultService={timesheet.serviceId} currentDate={currentDate} 
                      setTimesheets={setTimesheets} resourceId={resource?.id ?? ""} dateMode={dateMode}/>
                    </div>
                  )}
                  <div className="mt-5">
                      <Button variant="outline" onClick={handleSubmitforApproval}><span className='text-green-800 font-semibold'><i className="mr-2 fa-solid fa-list-check"></i>Submit for Approval</span></Button>
                  </div>                
                </CardContent>
              </Card>
            </div>
          </Conditional>
        </div>
      </Container>
    </>
  )
}