"use server";
import { revalidatePath } from "next/cache";
import prisma from "../app/utils/db";
import { Timesheet } from '@/types';

export async function fetchTime(resourceId: string, startDate: Date, endDate: Date  ) : Promise<Timesheet[]> {
    const data = await prisma.timesheet.findMany ({
        select: {
            id: true,
            date: true,
            email: true,
            sowId: true,        
            resourceId: true,                
            serviceId: true,
            hours: true,        
            description: true,
            billable: true,
            status: true,
            createdAt: true,        
        },    
        where: {
        resourceId: resourceId,
        date: {
            gte: startDate,
            lte: endDate
        }
        },
    });
    return data;
}

export async function updateTime(formData: FormData){
    "use server";    
    const data = await prisma.timesheet.update({
        data: {
            date: formData.get("name") as string,
            email: formData.get("email") as string,
            statementOfWork: {
                connect: {
                    id: formData.get("sowId") as string,
                }
            },
            resource: {
                connect: {
                    id: formData.get("resourceId") as string,
                }
            },
            service: {
                connect: {
                    id: formData.get("serviceId") as string,
                }
            },
            hours: formData.get("federalTaxId") as string,
            description: formData.get("address1") as string,
            billable: Boolean(formData.get("billable")),
            createdAt: formData.get("city") as string,
            
        },
        where: {
            id: formData.get("id") as string
        }
    });
    revalidatePath("/admin/customers");    
}

export async function addTime(formData: FormData){
    "use server";    
    const data = await prisma.timesheet.create ({
        data: {
            date: formData.get("date") as string,
            email: formData.get("email") as string,
            statementOfWork: {
                connect: {
                    id: formData.get("sowId") as string,
                }
            },
            resource: {
                connect: {
                    id: formData.get("resourceId") as string,
                }
            },
            service: {
                connect: {
                    id: formData.get("serviceId") as string,
                }
            },
            hours: formData.get("hours") as string,
            description: formData.get("description") as string,
            billable: Boolean(formData.get("billable")),
            status:  formData.get("status") as string,
            createdAt: formData.get("city") as string,
        }
    });
    revalidatePath("/admin/customers");    
}