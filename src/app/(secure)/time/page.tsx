import Title from '@/components/ui/title'
import Container from '@/components/ui/container'
import { CalendarDateRangePicker } from "@/components/time/date-range-picker"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function Time() {
  return (
    <>
      <Title title="Time"></Title>
      <Container>
        <div className="p-8 pt-6">
          <div className="items-center justify-between">
            <div className="flex items-center">
              <Button variant="outline" size="icon">
                <i className="fa-solid fa-arrow-left"></i>
              </Button>
              <CalendarDateRangePicker />
              <Button variant="outline" size="icon">
                <i className="fa-solid fa-arrow-right"></i>
              </Button>
            </div>
          </div>
          <div className="mt-5 flex">
            <span className='mr-2'>
              <Select defaultValue='light'>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a project" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">SOW#1 CSB</SelectItem>
                  <SelectItem value="dark">SOW#3 CFCU</SelectItem>
                  <SelectItem value="system">SOW#2 SaveOn</SelectItem>
                </SelectContent>
              </Select>
            </span>
            <span>
              <Button>Add Time</Button>
            </span>
          </div>
        </div>
      </Container>
    </>
  )
}
