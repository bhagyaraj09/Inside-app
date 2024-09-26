-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "federalTaxId" VARCHAR(12),
    "address1" VARCHAR(200),
    "address2" VARCHAR(200),
    "city" VARCHAR(200),
    "state" VARCHAR(2),
    "zip" VARCHAR(10),
    "phone" VARCHAR(15),
    "mobile" VARCHAR(15),
    "fax" VARCHAR(15),
    "email" VARCHAR(200),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL,
    "companyId" VARCHAR(30) NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "displayName" VARCHAR(20),
    "contact" VARCHAR(200),
    "manager" VARCHAR(200),
    "externalId" VARCHAR(200),
    "federalTaxId" VARCHAR(12),
    "address1" VARCHAR(200),
    "address2" VARCHAR(200),
    "city" VARCHAR(200),
    "state" VARCHAR(2),
    "zip" VARCHAR(10),
    "phone" VARCHAR(15),
    "mobile" VARCHAR(15),
    "fax" VARCHAR(15),
    "email" VARCHAR(200),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "customerId" VARCHAR(30) NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "manager" VARCHAR(200) NOT NULL,
    "email" VARCHAR(200),
    "phone" VARCHAR(15),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Resource" (
    "id" TEXT NOT NULL,
    "companyId" VARCHAR(30) NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "federalTaxId" VARCHAR(12),
    "address1" VARCHAR(200),
    "address2" VARCHAR(200),
    "city" VARCHAR(200),
    "state" VARCHAR(2),
    "zip" VARCHAR(10),
    "phone" VARCHAR(15),
    "mobile" VARCHAR(15),
    "fax" VARCHAR(15),
    "email" VARCHAR(200),
    "reportingManager" VARCHAR(200) NOT NULL,
    "vacationLeaves" INTEGER NOT NULL,
    "vacationLeavesConsumed" INTEGER NOT NULL,
    "vacationLeavesAvailable" INTEGER NOT NULL,
    "resetLeaveTime" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Resource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StatementOfWork" (
    "id" TEXT NOT NULL,
    "projectId" VARCHAR(30) NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "fileLocation" VARCHAR(500),
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "value" MONEY,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StatementOfWork_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectRole" (
    "id" TEXT NOT NULL,
    "role" VARCHAR(200) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProjectRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SOWResource" (
    "id" TEXT NOT NULL,
    "sowId" VARCHAR(30) NOT NULL,
    "resourceId" VARCHAR(30) NOT NULL,
    "projectRoleId" VARCHAR(30) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "billingRate" MONEY,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SOWResource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invoice" (
    "id" TEXT NOT NULL,
    "sowId" VARCHAR(30) NOT NULL,
    "customerId" TEXT NOT NULL,
    "invoiceNo" VARCHAR(30),
    "invoiceDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "invoiceDueDate" TIMESTAMP(3),
    "invoiceStatus" VARCHAR(50) NOT NULL,
    "poNumber" VARCHAR(50),
    "invoiceAmount" MONEY,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvoiceDetail" (
    "id" TEXT NOT NULL,
    "invoiceId" VARCHAR(30) NOT NULL,
    "serviceId" VARCHAR(30) NOT NULL,
    "resourceId" VARCHAR(30),
    "unitAmount" MONEY,
    "quantity" DECIMAL(65,30),
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InvoiceDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResourceStatus" (
    "id" TEXT NOT NULL,
    "resourceId" VARCHAR(30) NOT NULL,
    "supervisor" VARCHAR(30) NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "location" VARCHAR(30) NOT NULL,
    "employmentStatus" VARCHAR(30) NOT NULL,
    "currentBaseSalary" MONEY,
    "dateOfTermination" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "eligibleForRehire" BOOLEAN NOT NULL,
    "hrContact" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ResourceStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Timesheet" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "email" VARCHAR(200) NOT NULL,
    "sowId" VARCHAR(30) NOT NULL,
    "resourceId" VARCHAR(30) NOT NULL,
    "serviceId" VARCHAR(30) NOT NULL,
    "hours" DECIMAL(65,30) NOT NULL,
    "description" TEXT NOT NULL,
    "billable" BOOLEAN NOT NULL,
    "status" VARCHAR(30) NOT NULL,
    "approvedBy" VARCHAR(30),
    "approvedDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Timesheet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Leave" (
    "id" TEXT NOT NULL,
    "leaveId" VARCHAR(30) NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "status" VARCHAR(30) NOT NULL,

    CONSTRAINT "Leave_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resource" ADD CONSTRAINT "Resource_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StatementOfWork" ADD CONSTRAINT "StatementOfWork_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SOWResource" ADD CONSTRAINT "SOWResource_sowId_fkey" FOREIGN KEY ("sowId") REFERENCES "StatementOfWork"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SOWResource" ADD CONSTRAINT "SOWResource_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "Resource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SOWResource" ADD CONSTRAINT "SOWResource_projectRoleId_fkey" FOREIGN KEY ("projectRoleId") REFERENCES "ProjectRole"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_sowId_fkey" FOREIGN KEY ("sowId") REFERENCES "StatementOfWork"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoiceDetail" ADD CONSTRAINT "InvoiceDetail_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoiceDetail" ADD CONSTRAINT "InvoiceDetail_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoiceDetail" ADD CONSTRAINT "InvoiceDetail_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "Resource"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Timesheet" ADD CONSTRAINT "Timesheet_sowId_fkey" FOREIGN KEY ("sowId") REFERENCES "StatementOfWork"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Timesheet" ADD CONSTRAINT "Timesheet_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "Resource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Timesheet" ADD CONSTRAINT "Timesheet_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Leave" ADD CONSTRAINT "Leave_leaveId_fkey" FOREIGN KEY ("leaveId") REFERENCES "Resource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
