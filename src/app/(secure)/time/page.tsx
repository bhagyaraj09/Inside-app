'use client'
import { WeekSelector } from "@/components/time/week-selector"
import { Button } from "@/components/ui/button"
import { Card, CardContent,} from "@/components/ui/card"
import { SOWResource, Service, Timesheet, Resource } from '@/types';
import { getProjectsByResource } from '@/src/actions/sowResource'
import { getServicesData } from '@/src/actions/service';
import { fetchResource } from '@/src/actions/resource'
import { fetchTime } from '@/src/actions/timeSheet'
import Title from '@/components/ui/title'
import Container from '@/components/ui/container'
import TimeForm from '@/src/components/time/time-form'
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";


export default function Time() {

  const { data: session, status } = useSession();
  const [services, setServices] = useState<Service[]>([]);
  const [projects, setProjects] = useState<SOWResource[]>([]);
  const [resource, setResource] = useState<Resource>();
  const [timesheets, setTimesheets] = useState<Timesheet[]>([]);
  let startofWeek = new Date().getDate() - new Date().getDay() + 1;

  useEffect(() => {    
    const getServices = async() => {
      try{
        const response =  await getServicesData();
        setServices(response)
      } catch(error) {
        console.log(error);
      }
    }
  }, []);
  useEffect(() => {    
    const getProjects = async() => {
      try{
        const response =  await getProjectsByResource(session?.user.email as string);
        setProjects(response)
      } catch(error) {
        console.log(error);
      }
    }
    const getResource = async() => {
      try{
        const response =  await fetchResource(session?.user.email as string); 
        setResource(response)
      } catch(error) {
        console.log(error);
      }
    }
    getProjects();
    getResource();    
  }, [session?.user.email]);
  useEffect(() => {    
  const getTimesheets = async() => {
    try{
      const response =  await fetchTime(resource?.id ?? "", new Date(), new Date());
      setTimesheets(response)
    } catch(error) {
      console.log(error);
    }  
  }
  getTimesheets();
  }, [resource?.id]);
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
              <WeekSelector />
              <Button variant="outline" size="icon">
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
                  <span className='mr-1 w-32'>Date</span>
                  <span className='mr-1 w-56'>Project</span>
                  <span className='mr-1 w-40'>Service</span>
                  <span className='mr-1 w-16'>Hours</span>
                  <span className='mr-1 w-56'>Description</span>
                  <span className='mr-1 w-20 flex justify-center'>Billable</span>
                  <span className='mr-1'></span>
                </div>
                <TimeForm projects={projects} services={services} timeheet={newTimesheet} formType='Add' />
              </CardContent>
            </Card>
          </div>
          <div className="mt-5">
            <Card>
              <CardContent>                
                <h2 className="text-lg font-medium py-3">Timesheet<i className="ml-2 fa-solid fa-table-cells text-sm"></i></h2>                
                {[...Array(5)].map((e, i) => 
                  <div key={i} className="border-b-4 mb-4 pb-4 md:mb-1 md:pb-0 md:border-b-0">
                    <div className= {i==0 ? "hidden md:block md:flex" : "hidden"}>
                      <span className='mr-1 w-32'>Date</span>
                      <span className='mr-1 w-56'>Project</span>
                      <span className='mr-1 w-40'>Service</span>
                      <span className='mr-1 w-16'>Hours</span>
                      <span className='mr-1 w-56'>Description</span>
                      <span className='mr-1 w-20 flex justify-center'>Billable</span>
                      <span className='mr-1'></span>
                    </div>
                    <TimeForm key={i} projects={projects} services={services} timeheet={newTimesheet} formType='Edit' />
                    
                  </div>
                )}
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