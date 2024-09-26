"use server"
import prisma from "../app/utils/db";

export async function getAllHolidaysDate() {
    try{
      const holidays = await prisma.holidays.findMany({
        select: {
          date: true,
        },
        orderBy: {
          date: 'asc',
        },
      });
      return holidays;
    }
    catch(err){
      console.log(err)
    }
   
  }




 
  


  
 

  export async function fetchAllHolidays() {
    try{
      const holidays = await prisma.holidays.findMany({
        select: {
          date: true,
          description:true,
          title:true,
        },
        orderBy: {
          date: 'asc',
        },
      });
      return holidays;
    }
    catch(err){
      console.log(err)
    }
   
  }
  
  
  