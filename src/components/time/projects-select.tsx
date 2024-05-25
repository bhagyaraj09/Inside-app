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

export default async function ProjectsSelect(props: ProjectsSelectProps) {  
  return (
    <Select defaultValue={props.id == "" ? props.projects[0].id.toString() : props.id }>
        <SelectTrigger>
        <SelectValue placeholder="Select a service" />
        </SelectTrigger>
        <SelectContent>
        {props.projects.map((project) => (
            <SelectItem key={project.id} value={project.id}>
            {project.statementOfWork?.project?.name + " - " + project.statementOfWork?.name}
            </SelectItem>
        ))}
        </SelectContent>
    </Select>
  );
};