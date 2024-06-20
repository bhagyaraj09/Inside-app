"use client"

import { ColumnDef } from "@tanstack/react-table";
import { Timesheet } from "@/types";

export const columns: ColumnDef<Timesheet>[] = [
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {            
      return <>{new Date(row.getValue("date")).toDateString()}</>
    },
  },
  {
    accessorKey: "service.name",
    header: "Service",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "hours",
    header: "Hours",
  },
  {
    accessorKey: "billable",
    header: "Billable",
  },
  
]
