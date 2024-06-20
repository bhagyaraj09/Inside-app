'use client'
import Title from '@/components/ui/title';
import Container from '@/components/ui/container';
import { Button } from "@/components/ui/button";
import { SetStateAction, useEffect, useState } from "react";
import { Timesheet, StatementOfWork, SOWResource } from '@/types';
import { getAllSOWs } from '@/src/actions/sow';
import { Card, CardContent,} from "@/components/ui/card";
import AllSOWSelect from '@/src/components/time/all-sow-select';
import { MonthSelector } from '@/components/time/month-selector';
import { getResourcesBySOW } from '@/src/actions/sowResource';
import { fetchTimeBySOWId } from '@/src/actions/timeSheet';
import { DataTable } from '@/src/components/ui/data-table';
import { columns } from './columns';


export default function TimeReport() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [dateMode, setDateMode] = useState("Month");
  const [sows, setSOWs] = useState<StatementOfWork[]>([]);
  const [sowId, setSOWId] = useState("");
  const [sowResources, setSOWResources] = useState<SOWResource[]>([]);
  
  const [timesheets, setTimesheets] = useState<Timesheet[]>([]);  
  const [totalHours, setTotalHours] = useState(0.0);

  const handleNext = () => {    
    if(dateMode == "Month"){
      if (currentDate.getMonth() == 11) {
        setCurrentDate(new Date(currentDate.getFullYear() + 1, 0, 1));
      } else {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
      }
    }else{
       setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() + 7)));
    }
  }
  const handlePrev = () => {
    if(dateMode == "Month"){
      if (currentDate.getMonth() == 0) {
        setCurrentDate(new Date(currentDate.getFullYear() - 1, 11, 1));
      } else {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
      }
    }else{
      setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() - 7)));
    }
  }
  useEffect(() => {    
    const getTimesheets = async() => {
      try{
        if(sowId != ""){
          const curr = new Date(currentDate.toString()); // get current date        
          const first = curr.getDate() - curr.getDay() + 1; // First day is the day of the month - the day of the week        
          const response =  await fetchTimeBySOWId(sowId, dateMode == "Month" ? new Date(curr.getFullYear(), curr.getMonth(), 1) : new Date(curr.setDate(first)), dateMode == "Month" ? new Date(curr.getFullYear(), curr.getMonth()+1, 0) : new Date(curr.setDate(first + 6))); // last day is the first day + 6
          setTimesheets(response); 
          setTotalHours (response.reduce((total, timesheet) => total + parseFloat(timesheet.hours?? 0), 0));
        }
      } catch(error) {
        console.log(error);
      }  
    }
    getTimesheets();
    }, [currentDate, dateMode, sowId]);
  useEffect(() => {    
    const getSOWs = async() => {
      try{
        const response =  await getAllSOWs(); 
        setSOWs(response)
        setSOWId(response[0].id);
      } catch(error) {
        console.log(error);
      }
    }    
    getSOWs();          
  }, []);

  useEffect(() => {    
    const getSOWResources = async() => {
      try{
        const response =  await getResourcesBySOW(sowId); 
        setSOWResources(response)
      } catch(error) {
        console.log(error);
      }
    }    
    getSOWResources();          
  }, [sowId]);
  
  return (
    <>
      <Title title="Time Reports"></Title>
      <Container>
        <div className="p-2">
          <Card>
            <CardContent>                    
              <div className="items-center justify-between">
                <div className="flex items-center py-4">                    
                  <Button variant="outline" size="icon" onClick={handlePrev}>
                    <i className="fa-solid fa-arrow-left"></i>
                  </Button>
                  <MonthSelector currentDate={currentDate.toString()} dateMode={dateMode} setDateMode={setDateMode} />
                  <Button variant="outline" size="icon" onClick={handleNext}>
                    <i className="fa-solid fa-arrow-right"></i>
                  </Button>
                  <Button variant="outline" className='ml-2'>
                    <i className="fa-solid fa-print md:mr-2"></i><span className='hidden md:block'>Print Time</span>
                  </Button>
                </div>
                <div className="flex items-center">                    
                  <span className='mr-2  font-medium'>Project:</span>
                  <span className='w-auto mr-2'><AllSOWSelect id={sowId} sows={sows} disabled={false} setSOWId={setSOWId} /></span>
                </div>
                <div className="pt-2">
                  Total Hours: <span className='font-semibold'>{totalHours}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          {sowResources.map( sowResource => (
            timesheets.filter( timesheet => timesheet.resourceId == sowResource.resourceId).length > 0 ?
              <Card key={sowResource.resourceId} className='mt-5'>
                <CardContent>                
                  <div className="items-center justify-between">
                    <div>
                      <div key={sowResource?.id} className="items-center justify-between py-3">
                        <div className="flex items-center">
                          <span className="font-semibold">{sowResource.resource?.name}</span>
                        </div>
                        <DataTable columns={columns} data={timesheets.filter(timesheet => timesheet.resourceId == sowResource.resourceId)} filter={false} pagination={false} />
                        <div className="pt-2">
                          Hours for <span className='font-semibold'>{sowResource.resource?.name}: {timesheets.filter(timesheet => timesheet.resourceId == sowResource.resourceId).reduce((total, timesheet) => total + parseFloat(timesheet.hours?? 0), 0)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              : ""
        ))}
        </div>
      </Container>
    </>
  )
}
