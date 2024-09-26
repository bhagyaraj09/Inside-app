import React, { useEffect, useState, FC } from "react";
import { getAllEvents, updateEvent ,deleteEvent,cancelEvent} from "@/src/actions/event";
import { Card } from "@/src/components/ui/card";
import { convertTo12HourFormat } from "@/src/lib/timeFormat";
import { DatePicker } from "./dateSelect";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/src/components/ui/dropdown-menu";
import { BorderDottedIcon, CalendarIcon ,ClockIcon} from "@radix-ui/react-icons";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { Select, SelectContent, SelectTrigger, SelectItem, SelectValue } from "@/src/components/ui/select";
import { Button } from "@/src/components/ui/button";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

interface Event {
  id: string; // UUID as a string
  eventName: string;
  description: string;
  date: Date; // ISO 8601 date string
  startTime: string; // Time string in HH:MM format
  endTime: string | null; // Time string or null if not applicable
  eventMode: string; // Can be 'online' or other modes
  eventType: string; // Name of the event type
  isEventCancelled: boolean|null;
} 

interface EventHistoryProps {
  events: Event[] | null;
  setEvents: React.Dispatch<React.SetStateAction<Event[] | null>>;
}

interface EventCard extends Event {
  handleEdit: (
    id: string, // UUID as a string
    eventName: string,
    description: string,
    date: Date|null, // ISO 8601 date string
    startTime: string, // Time string in HH:MM format
    endTime: string | null, // Time string or null if not applicable
    eventMode: string, // Can be 'online' or other modes
    eventType: string,
  ) => void; // Function to handle edit event
  handleDelete:(id:string)=>void
  handleCancel:(id:string,value:string)=>void
}

type DropDownMenuProps = {
  eventId: string;
  isEventCancelled:boolean|null;
  isNotDisabled: boolean; // Flag to disable the dropdown menu if true
  onSelect: (option: string, eventId: string) => void; // Function to handle dropdown menu selection
};

const DropDownMenuValues: React.FC<DropDownMenuProps> = ({
  onSelect,
  eventId,
  isNotDisabled,
  isEventCancelled
}) => (
  <DropdownMenu>
    <DropdownMenuTrigger style={{ border: "none", outline: "none" }} disabled={!isNotDisabled}>
      <BorderDottedIcon />
    </DropdownMenuTrigger>
    <DropdownMenuContent style={{ minWidth: "75px", position: "relative", right: "28%" }}>
      <DropdownMenuItem className="text-xs" onSelect={() => onSelect("Edit", eventId)}>
        Edit Event
      </DropdownMenuItem>
     {isEventCancelled  ? <DropdownMenuItem className="text-xs" onSelect={() => onSelect("Uncancel", eventId)}>
        Uncancel Event
      </DropdownMenuItem>:<DropdownMenuItem className="text-xs" onSelect={() => onSelect("Cancel", eventId)}>
        Cancel Event
      </DropdownMenuItem>}
      <DropdownMenuItem className="text-xs" onSelect={() => onSelect("Delete", eventId)}>
        Delete Event
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

const EventCard: FC<EventCard> = ({
  id,
  eventName,
  description,
  date,
  startTime,
  endTime,
  eventMode,
  eventType,
  isEventCancelled,
  handleEdit,
  handleDelete,
  handleCancel
}) => {
  const [dateVal, setDateVal] = useState<Date | null>(new Date(date));
  const [eventNameVal, setEventNameVal] = useState<string>(eventName);
  const [descriptionVal, setDescriptionVal] = useState<string>(description);
  const [startTimeVal, setStartTimeVal] = useState<string>(startTime);
  const [eventModeVal, setEventModeVal] = useState<string>(eventMode);
  const [isEdit, setEdit] = useState<boolean>(false);

  const handleSelectOptions = (value: string, eventId: string) => {
    if (value === "Edit") {
      setEdit(true);
    }
    else if (value==="Delete"){
      handleDelete(id)

    }else if (value==="Cancel"){
      handleCancel(id,"cancel")
    } else if (value==="Uncancel"){
      handleCancel(id,"Uncancel")
    }
  };

  const handleEditForm = () => {
    handleEdit(id, eventNameVal, descriptionVal, dateVal, startTimeVal, endTime, eventModeVal, eventType);
    setEdit(false);
  };

 


  return (
    <Card className="p-6 flex justify-space my-6">
      <div className="w-full">
        {isEdit ? (
          <Input
            type="text"
            className="my-1"
            placeholder="Event Name"
            value={eventNameVal}
            onChange={(e) => setEventNameVal(e.target.value)}
          />
        ) : (
          <div className="flex">
          <p className="font-medium text-lg ">{eventNameVal}</p>
          {isEventCancelled&&<Badge className="bg-red-600 mx-6 font-medium">Cancelled</Badge>}
          </div>
        )}
        {isEdit ? (
          <Textarea
            value={descriptionVal}
            className="my-1"
            placeholder="Description"
            onChange={(e) => setDescriptionVal(e.target.value)}
          />
        ) : (
          <p className="truncate text-slate-700 text-xs">{descriptionVal}</p>
        )}
        <div className="inline-flex my-2 ">
          {isEdit?           <DatePicker date={dateVal} setDate={setDateVal} edit={isEdit} />
 :<div className="flex mr-16"><CalendarIcon className="font-semibold mt-1" />
 <span className="font-semibold ml-[0.5em] mt-[0.1em]">{ format(date, "PP").replace(","," ")}</span> 
 
  </div>}
          
          {isEdit ? (
            <div className="mb-6">

            <Input type="time" value={startTimeVal} onChange={(e) => setStartTimeVal(e.target.value)} className="my-1" />
         </div>
          ) : (
            <div className="flex">
            
              <ClockIcon className="mt-1"/>
            <p className="font-semibold text-md  ml-[0.5em] mt-[0.1em]">{convertTo12HourFormat(startTimeVal)}</p>
         </div> )}
        </div>
        {isEdit ? (
          <div className="my-1">
            <p>Event Mode</p>
            <Select value={eventModeVal} onValueChange={(value) => setEventModeVal(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="online">Online</SelectItem>
                <SelectItem value="offline">Offline</SelectItem>
              </SelectContent>
            </Select>
          </div>
        ) : (
          <p>Event Mode: {eventModeVal}</p>
        )}
      </div>
      {isEdit ? (
        <div className="w-full flex justify-end items-end space-x-2">
          <Button variant="secondary" type="button" onClick={() => setEdit(false)}>
            Cancel
          </Button>
          <Button type="button" className="bg-blue-600" onClick={handleEditForm}>
            Done
          </Button>
        </div>
      ) : (
        <span className="w-full flex justify-end items-start">
          <DropDownMenuValues onSelect={handleSelectOptions} eventId={id} isNotDisabled={true} isEventCancelled={isEventCancelled} />
        </span>
      )}
    </Card>
  );
};

const  EventHistory:React.FC<EventHistoryProps>=({events,setEvents}) =>{

  const handleEditById = async (
    id:string, eventNameVal:string, descriptionVal:string, dateVal:Date|null, startTimeVal:string, endTime:string|null, eventModeVal:string, eventType:string) => {
    try {
      if (dateVal){
    const data=  await updateEvent(id, {
        eventName: eventNameVal,
        description: descriptionVal,
        startTime: startTimeVal,
        eventMode: eventModeVal,
        date: new Date(dateVal),
      });
      setEvents(data)
    
    }
    } catch (err) {
      console.error("Error updating event:", err);
    }
  };
  const handleCancelById=async(id:string,value:string)=>{
    try{
     const data= await cancelEvent(id) 
     setEvents(data)
  }catch(err){
    console.log("Error")
  }
}

  const handleDeleteById=async(id:string)=>{
    try{
     const data= await deleteEvent(id)
        setEvents(data);


      

    }
    catch(err){
      console.error("Error deleting event:", err);
    };
  };

  useEffect(() => {
    const fetchAllEvents = async () => {
      try {
        const data = await getAllEvents();
        if (data) setEvents(data);
      } catch (err) {
        console.log(err);
        return null;
      }
    };
    fetchAllEvents();
  }, []);

  return (
    <>
      {events && events.map((event) => <EventCard key={event.id} {...event} handleEdit={handleEditById}  handleDelete={handleDeleteById} handleCancel={handleCancelById} isEventCancelled={event.isEventCancelled}/>)}
    </>
  );
}

export default EventHistory;
