import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Service } from '@/types';

interface ServicesSelectProps {
    id: string,
    services: Service[],
}

export default async function ServicesSelect(props: ServicesSelectProps) {  
  return (
    <Select defaultValue={props.id == "" ? props.services[0].id.toString() : props.id }>
        <SelectTrigger>
        <SelectValue placeholder="Select a service" />
        </SelectTrigger>
        <SelectContent>
        {props.services.map((service) => (
            <SelectItem key={service.id} value={service.id}>
            {service.name}
            </SelectItem>
        ))}
        </SelectContent>
    </Select>
  );
};