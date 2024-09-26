import { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from '@/src/components/ui/input';
import { Textarea } from '@/src/components/ui/textarea';
import { Select, SelectTrigger, SelectItem, SelectValue, SelectContent } from '@/src/components/ui/select';
import { Button } from '@/src/components/ui/button';
import { addEventType, createEvent, getAllEventType, getAllEvents } from '@/src/actions/event';

interface EventPropType {
  typeName: string;
  id: string;
}

interface Event {
  id: string;
  eventName: string;
  description: string;
  date: Date;
  startTime: string;
  endTime: string | null;
  eventMode: string;
  eventType: string;
  isEventCancelled: boolean | null;
}

interface EventFormProps {
  events: Event[] | null;
  setEvents: React.Dispatch<React.SetStateAction<Event[] | null>>;
}

const EventForm: React.FC<EventFormProps> = ({ events, setEvents }) => {
  // Initialize the form with default values
  const methods = useForm({
    defaultValues: {
      eventName: '',
      description: '',
      eventType: '',
      startDate: '',
      startTime: '',
      endTime: '',
      eventMode: '',
    },
    mode: 'onChange', // Validate as the user types
  });
  
  const { reset, formState: { isValid, isDirty } } = methods;
  
  const [eventTypes, setEventTypes] = useState<EventPropType[] | null>(null);
  const [newType, setNewType] = useState('');
  const [selectedEventType, setSelectedEventType] = useState('');
  const [isAddEventType, setAddEventType] = useState(false);
  const [showEndTime, setShowEndTime] = useState<boolean>(false);

  const onSubmit = async (data: any) => {
    try {
      await createEvent({
        ...data,
        startDate: new Date(data.startDate),
        offset: new Date().getTimezoneOffset(),
      });
      const eventData = await getAllEvents();
      if (eventData) {
        setEvents(eventData);
      }
      // Reset the form to its default state after successful submission
      reset();  // Resetting the form to initial values
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchAllEventTypes = async () => {
      try {
        const allEventType = await getAllEventType();
        if (allEventType) setEventTypes(allEventType);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllEventTypes();
  }, []);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="md:flex">
          {/* Event Name */}
          <FormField
            control={methods.control}
            name="eventName"
            rules={{ required: 'Event name is required' }}
            render={({ field }) => (
              <FormItem className="w-5/12 m-2">
                <FormLabel>Event Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter event name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Event Type */}
          <FormField
            control={methods.control}
            name="eventType"
            rules={{ required: 'Event type is required' }}
            render={({ field }) => (
              <FormItem className="m-2 w-4/12">
                <FormLabel>Event Type</FormLabel>
                <FormControl>
                  {isAddEventType ? (
                    <div className="flex">
                      <Input
                        placeholder="Enter new event type"
                        value={newType}
                        onChange={(e) => setNewType(e.target.value)}
                      />
                      <Button
                        className="bg-blue-600 ml-2"
                        type="button"
                        onClick={async () => {
                          setSelectedEventType(newType);
                          setAddEventType(false);

                          const data = await addEventType(newType);
                          if (data) {
                            setEventTypes(data);
                          }
                        }}
                      >
                        Add
                      </Button>
                      <Button
                        className="ml-2"
                        type="button"
                        variant="secondary"
                        onClick={() => setAddEventType(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <Select
                      value={selectedEventType}
                      onValueChange={(value) => {
                        if (value === 'add') {
                          setAddEventType(true);
                        } else {
                          setSelectedEventType(value);
                          field.onChange(value); // Update react-hook-form value
                        }
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Event Type" />
                      </SelectTrigger>
                      <SelectContent>
                        {eventTypes?.map((type) => (
                          <SelectItem key={type.id} value={type.typeName}>
                            {type.typeName}
                          </SelectItem>
                        ))}
                        <SelectItem value="add" key="add">
                          + Add New Event Type
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Description */}
        <FormField
          control={methods.control}
          name="description"
          rules={{ required: 'Description is required' }}
          render={({ field }) => (
            <FormItem className="max-w-5xl w-9/12 m-2">
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea rows={4} {...field} placeholder="Enter event description" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex">
          {/* Start Date */}
          <FormField
            control={methods.control}
            name="startDate"
            rules={{ required: 'Start date is required' }}
            render={({ field }) => (
              <FormItem className="w-4/12 m-2">
                <FormLabel>Start Date</FormLabel>
                <FormControl>
                  <Input {...field} type="date" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Start Time */}
          <FormField
            control={methods.control}
            name="startTime"
            rules={{ required: 'Start time is required' }}
            render={({ field }) => (
              <FormItem className="w-lg m-2">
                <FormLabel>Start Time</FormLabel>
                <FormControl>
                  <Input {...field} type="time" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* End Time */}
          <FormField
            control={methods.control}
            name="endTime"
            render={({ field }) => (
              <>
                {showEndTime ? (
                  <FormItem className="w-lg m-2">
                    <FormLabel>End Time</FormLabel>
                    <FormControl>
                      <Input {...field} type="time" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                ) : (
                  <FormItem className="w-4/12 m-2 mt-[2.5em]">
                    <Button
                      variant="ghost"
                      className="text-blue-700 hover:none"
                      onClick={() => setShowEndTime(true)}
                    >
                      + End Time
                    </Button>
                    <FormMessage />
                  </FormItem>
                )}
              </>
            )}
          />
        </div>

        {/* Event Mode */}
        <FormField
          control={methods.control}
          name="eventMode"
          rules={{ required: 'Event mode is required' }}
          render={({ field }) => (
            <FormItem className="w-4/12 m-2">
              <FormLabel>Event Mode</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={(value) => field.onChange(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="online">Online</SelectItem>
                    <SelectItem value="offline">Offline</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={!isValid || !isDirty} className="bg-blue-600 ml-2">
          Submit
        </Button>
      </form>
    </FormProvider>
  );
};

export default EventForm;
