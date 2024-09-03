"use server";
import { revalidatePath } from "next/cache";
import prisma from "../app/utils/db";
import { Timesheet } from '@/types';

export async function fetchTime(resourceId: string, startDate: string, endDate: string  ) : Promise<Timesheet[]> {

    "use server";
    console.log("ssssssssssssssssssssssssssssssssssssssss",{startDate,endDate})
    console.log("before modifying",{startDate,endDate})
    const startDateArr=startDate.split(":")
    const startDateVal=new Date(Date.UTC(parseInt(startDateArr[2]),parseInt(startDateArr[1]),parseInt(startDateArr[0]) ,0,0,0,0))
    const endDateArr=endDate.split(":")
    const endDateVal = new Date(Date.UTC(parseInt(endDateArr[2]), parseInt(endDateArr[1]), parseInt(endDateArr[0]), 0, 0, 0, 0));
        console.log("after modifying modifying",{startDateVal,endDateVal})

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
                gte: startDateVal,
                lte: endDateVal
            }
        },        
        orderBy: {
            date: "asc"            
        }
    });
    console.log({data});
    console.log("----------------------------------------------------")
    return JSON.parse(JSON.stringify(data));
    //Only plain objects can be passed to Client Components from Server Components. Decimal objects are not supported.
}


export async function fetchTimeBySOWId(sowId: string, startDate: Date, endDate: Date  ) : Promise<Timesheet[]> {
    "use server";
    startDate.setHours(0,0,0,0);
    endDate.setHours(0,0,0,0);
    const data = await prisma.timesheet.findMany ({
        select: {
            id: true,
            date: true,
            email: true,
            sowId: true, 
            statementOfWork: {
                select: {
                    id: true,
                    name: true,
                    project: {
                        select: {
                            id: true,
                            name: true,
                        }
                    }
                }
            },       
            resourceId: true,  
            resource: {
                select: {
                    id: true,
                    name: true,
                }
            },              
            serviceId: true,
            service: {
                select: {
                    id: true,
                    name: true,
                }
            },
            hours: true,        
            description: true,
            billable: true,
            status: true,
            createdAt: true,        
        },    
        where: {
            sowId: sowId,
            date: {
                gte: startDate,
                lte: endDate
            }
        },        
        orderBy: {
            resource: {
                name: "asc",
            },         
        },
    });
    return JSON.parse(JSON.stringify(data));
    //Only plain objects can be passed to Client Components from Server Components. Decimal objects are not supported.
}

export async function fetchTimeByResourceId(resourceId: string, startDate: Date, endDate: Date  ) : Promise<Timesheet[]> {
    "use server";
    startDate.setHours(0,0,0,0);
    endDate.setHours(0,0,0,0);
    const data = await prisma.timesheet.findMany ({
        select: {
            id: true,
            date: true,
            email: true,
            sowId: true, 
            statementOfWork: {
                select: {
                    id: true,
                    name: true,
                    project: {
                        select: {
                            id: true,
                            name: true,
                        }
                    }
                }
            },       
            resourceId: true,  
            resource: {
                select: {
                    id: true,
                    name: true,
                }
            },              
            serviceId: true,
            service: {
                select: {
                    id: true,
                    name: true,
                }
            },
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
        orderBy: {
            date: "asc",
        },
    });
    return JSON.parse(JSON.stringify(data));
    //Only plain objects can be passed to Client Components from Server Components. Decimal objects are not supported.
}

export async function updateTime(formData: FormData){
    "use server";    
    let timesheetDate = new Date(formData.get("date") as string);
    timesheetDate.setHours(0,0,0,0);
    const data = await prisma.timesheet.update({
        data: {
            date: timesheetDate,
            email: formData.get("email") as string,
            statementOfWork: {
                connect: {
                    id: formData.get("sowId") as string,
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
        },
        where: {
            id: formData.get("id") as string
        }
    });
    revalidatePath("/admin/customers");    
}

export async function addTime(formData: FormData){
    "use server";
    let timesheetDate = new Date(formData.get("date") as string);
    timesheetDate=  new Date(Date.UTC(timesheetDate.getFullYear(),timesheetDate.getMonth(),timesheetDate.getDay()+1))
    console.log({timesheetDate},formData.get("date"))  
    


    timesheetDate.setHours(0,0,0,0);
    const data = await prisma.timesheet.create ({
        data: {
            date: timesheetDate,
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
            hours: parseFloat(formData.get("hours") as string),
            description: formData.get("description") as string,
            billable: Boolean(formData.get("billable")),
            status:  "Added",
        }
    });
    revalidatePath("/time");
}

export async function deleteTime(id: string){
    "use server";   
    const data = await prisma.timesheet.delete({
        where: {
            id: id
        }
    });
    revalidatePath("/time");
}
export async function getTimeForApproval(resourceId: string, startDate: Date, endDate: Date  ) : Promise<Timesheet[]> {
    "use server";    
    startDate.setHours(0,0,0,0);
    endDate.setHours(0,0,0,0);
    const data = await prisma.timesheet.findMany({
        select: {
            id: true,
            date: true,
            email: true,
            sowId: true,        
            resourceId: true,                
            serviceId: true,
            service: {
                select: {
                    id: true,
                    name: true,
                }
            },
            hours: true,        
            description: true,
            billable: true,
            status: true,
            createdAt: true,        
        },    
        where: {
            date: {
                gte: startDate,
                lte: endDate
            },
            resourceId: resourceId,
            OR: [
                {status:  "Submitted"},
                {status:"Approved"},       
            ] 
        },
        orderBy: {
            date: "asc"            
        }
    });
    return JSON.parse(JSON.stringify(data));
}
export async function submitTimeForApproval(resourceId: string, startDate: Date, endDate: Date  ) : Promise<Timesheet[]> {
    "use server";    
    startDate.setHours(0,0,0,0);
    endDate.setHours(0,0,0,0);
    const data = await prisma.timesheet.updateMany({
        data: {
            status: "Submitted"
        },
        where: {
            date: {
                gte: startDate,
                lte: endDate
            },
            resourceId: resourceId,
            OR: [
                {
                    status: {
                        not: "Submitted"
                    }
                },
                {
                    status: {
                        not: "Approved"
                    }
                }
            ]
        }
    });
    const startDateValue=`${startDate.getDate()}:${startDate.getMonth()}:${startDate.getFullYear()}`
         const endDateValue=`${endDate.getDate()}:${endDate.getMonth()}:${endDate.getFullYear()}`
    return fetchTime(resourceId, startDateValue, endDateValue);
}