import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { SOWResource } from '@/types';

interface ProjectsSelectProps {
    id: string,
    projects: SOWResource[],
}

export default function ProjectsSelect(props: ProjectsSelectProps) {  
  return (
    <Select defaultValue={props.id}>
        <SelectTrigger>
        <SelectValue placeholder="Select a service" />
        </SelectTrigger>
        <SelectContent>
        {props.projects.map((project) => (
            <SelectItem key={project.sowId} value={project.sowId??""}>
            {project.statementOfWork?.project?.name + " - " + project.statementOfWork?.name}
            </SelectItem>
        ))}
        </SelectContent>
    </Select>
  );
};