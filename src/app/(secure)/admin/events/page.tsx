"use client"
import { useState } from 'react'
import Title from '@/components/ui/title'
import Container from '@/components/ui/container'
import { Card } from '@/src/components/ui/card'
import EventForm from './form'
import EventHistory from './eventHistory'


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

export default function Leave() {
  const [events, setEvents] = useState<Event[] | null>(null);


  return (
    <>
      <Title title="Events"></Title>
      <Container>
        <Card className="p-3">
        <EventForm events={events} setEvents={setEvents}/>
        </Card>
        <h1 className="text-lg font-semibold my-6">Event History</h1>
        <EventHistory events={events} setEvents={setEvents} />
       </Container>
    </>
  )
}
