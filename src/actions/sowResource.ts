'use server'
import prisma from "@/utils/db";
import { SOWResource } from '@/types'

export async function getProjectsByResource(email: string) : Promise<SOWResource[]> {
    const data = await prisma.sOWResource.findMany ({
        select: {
            id: true,
            sowId: true,        
            statementOfWork: {
                select:{
                    id: true,
                    active: true,
                    name: true,
                    project: {
                        select: {
                            id: true,
                            name: true,
                            manager: true,
                            email: true,
                            phone: true,
                            customerId: true,
                        }
                    }
                }
            },
            resourceId: true,
            resource: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                }
            },
            active: true,
        },   
        where: {
            resource: { email: email },
            active: true,
        },
        orderBy: {
            statementOfWork: {
                project: {
                    name: "asc"
                },                
            }
        }
    });
    return data;
}

