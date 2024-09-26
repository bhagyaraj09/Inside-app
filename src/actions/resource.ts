"use server";
import prisma from "../app/utils/db";
import { Resource } from '@/types'
import { getDaysDifference } from "../lib/timeFormat";
import { difference } from "next/dist/build/utils";

//need to shift this another file 
interface FetchLeavesDataFromId {
  vocationLeavesConsumed:number,
  vocationLeavesAvailable:number,
  vocationLeaves:number,
  sickLeaves:number,
        sickLeavesConsumed:number,
        sickLeavesAvailable:number,
        vactionLeaveNoticePeriod:number,
}


export async function fetchResource(email: string) : Promise<Resource | undefined> {
  if(email){
    const data = await prisma.resource.findFirstOrThrow ({
      select: {
        id: true,
        companyId: true,
        name: true,
        federalTaxId: true,
        address1: true,
        address2: true,
        city: true,
        state: true,
        zip: true,
        phone: true,
        mobile: true,
        fax: true,
        email: true,
        createdAt: true,
      },    
      where: {
        email: email
      }  
    });
    return data;
  }
  return undefined;
}  

export async function fetchResourceById(id: string) : Promise<FetchLeavesDataFromId | undefined> {
  try{
    if(id){
      const data = await prisma.resource.findFirstOrThrow ({
        select: {
          vocationLeaves:true,
          vocationLeavesAvailable:true,
          vocationLeavesConsumed:true,
          sickLeaves:true,
          sickLeavesConsumed:true,
          sickLeavesAvailable:true,
          vactionLeaveNoticePeriod:true,
        },    
        where: {
          id:id
        }  
      });
      return data;
    }
  }
  catch(err){
    console.log(err)
  }
  
  
}
export async function getAllResources() : Promise<Resource[]> {  
  const data = await prisma.resource.findMany ({
    select: {
      id: true,
      companyId: true,
      name: true,
      federalTaxId: true,
      address1: true,
      address2: true,
      city: true,
      state: true,
      zip: true,
      phone: true,
      mobile: true,
      fax: true,
      email: true,
      createdAt: true,
    },
    orderBy: {  
      name: 'asc'
    }  
  });
  return data;
}  




function updateAccuredLeave(resourceId:string,leaves:number,):void{
    const  updatedTime=prisma.resource.update({
      where: {
        id: resourceId, 
      },
      data: {
        vocationLeaves: leaves,  
      },
    });}






function  resetLeave(resourceId:string,curr:Date):void{
  const updatedTime=prisma.resource.update({
    where: {
      id: resourceId, 
    },
    data: {
      vocationLeaves: 12,  
      resetLeaveTime: curr
    },
  });}


  export async function fetchAllResourcesName(){
    try{
      const data=await prisma.resource.findMany({
        select:{
          id:true,
          name:true,
       
        },
        orderBy:{
          name:'asc'
        }
      })
      return data
    } catch(err){
      console.log(err)

    }

  }


  export async function  consumeLeaveResource(resourceId:string,diffHrs:number){
    const consumeLeave=diffHrs/24
    const data=await prisma.resource.findFirstOrThrow({
      select:{
        vocationLeavesAvailable:true,
        vocationLeavesConsumed:true,
      },
      where:{
        id:resourceId,
      }
    })
  const updatedData=await prisma.resource.update({
    data:{
      vocationLeavesAvailable:data.vocationLeavesAvailable-consumeLeave ,
      vocationLeavesConsumed:data.vocationLeavesConsumed+consumeLeave,
    },
    where:{
      id:resourceId
    }
  })

  }


  export const resetEntireLeavesAll=()=>{
    const result=prisma.resource.updateMany({
      data:{
        vocationLeaves         :0, 
        vocationLeavesConsumed  :0,
        vocationLeavesAvailable :0, 
        sickLeaves   :40, 
        sickLeavesConsumed  :0,
        sickLeavesAvailable :0, 
      },
      
    })
  
    }
  


export async function resetLeaveForTwoWeeks(){
   await prisma.resource.updateMany({
    data: {
      vocationLeaves: {
        increment: 4.62,  
      },
    },
    where: {
      vocationLeaves: {
        lt: 115.38,  
      },
    },
  });

}
  