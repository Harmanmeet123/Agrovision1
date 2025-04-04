"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Home, 
  ChevronDown, 
  AlertCircle, 
  FileText, 
  CheckCircle2, 
  Clock, 
  ShieldAlert
} from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function GovernanceDashboard() {
  const [berryType, setBerryType] = useState("All Berries");

  // Sample data for the dashboard
  const summaryData = {
    activeContracts: {
      value: "87",
      change: "+12%",
    },
    pendingApprovals: {
      value: "23",
      change: "-5%",
    },
    highRiskAlerts: {
      value: "14",
      change: "+2%",
    },
    verifiedEntities: {
      value: "156",
      change: "+8%",
    },
  };

  // High-Risk Buyers data
  const highRiskBuyers = [
    { buyer: "Metro Foods", paymentDelay: 15, contractBreaches: 2, totalValue: "$1.85M", riskLevel: "High" },
    { buyer: "Fresh Market", paymentDelay: 21, contractBreaches: 3, totalValue: "$2.14M", riskLevel: "Critical" },
    { buyer: "Organic Delights", paymentDelay: 11, contractBreaches: 1, totalValue: "$845K", riskLevel: "Medium" },
    { buyer: "Berry Express", paymentDelay: 18, contractBreaches: 2, totalValue: "$1.32M", riskLevel: "High" },
    { buyer: "Fruit Haven", paymentDelay: 9, contractBreaches: 1, totalValue: "$760K", riskLevel: "Medium" },
  ];

  // KYC Verified Entities data
  const verifiedEntities = [
    { name: "Trader Joe's", type: "Retail Chain", verificationDate: "Jan 15, 2024", riskRating: "Low" },
    { name: "Albertsons", type: "Retail Chain", verificationDate: "Feb 2, 2024", riskRating: "Low" },
    { name: "Costco", type: "Wholesale", verificationDate: "Dec 10, 2023", riskRating: "Low" },
    { name: "Whole Foods Market", type: "Retail Chain", verificationDate: "Mar 5, 2024", riskRating: "Low" },
    { name: "Walmart", type: "Retail Chain", verificationDate: "Jan 28, 2024", riskRating: "Low" },
    { name: "Giant", type: "Retail Chain", verificationDate: "Feb 14, 2024", riskRating: "Medium" },
    { name: "Woodlands Market", type: "Independent", verificationDate: "Mar 1, 2024", riskRating: "Low" },
  ];

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Compact Header */}
      <div className="px-3 py-2 bg-white shadow-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-lg font-bold text-indigo-950">
                Governance Dashboard: Contract management and compliance monitoring

            </h1>
          </div>

          <div className="flex items-center">
            <Select
              value={berryType}
              onValueChange={(value) => setBerryType(value)}
            >
              <SelectTrigger className="h-8 w-[160px] text-sm bg-white border-indigo-200">
                <SelectValue placeholder="Select Berry Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Berries">All Berries</SelectItem>
                <SelectItem value="blueberry">Blueberry</SelectItem>
                <SelectItem value="raspberry">Raspberry</SelectItem>
                <SelectItem value="blackberry">Blackberry</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="flex-1 p-2 bg-gray-50 overflow-auto">
        <div className="flex flex-col gap-2">
          {/* Summary Cards - Single Row */}
          <div className="grid grid-cols-4 gap-2 h-24">
            {/* Active Supply Contracts */}
            <Card className="p-2 hover:shadow-md transition-shadow bg-gradient-to-r from-blue-50 to-white">
              <div className="flex justify-between items-start h-full">
                <div>
                  <p className="text-xs font-medium text-gray-500">Active Supply Contracts</p>
                  <h3 className="text-xl font-bold text-blue-800">
                    {summaryData.activeContracts.value}
                  </h3>
                  <span className={`text-xs ${summaryData.activeContracts.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {summaryData.activeContracts.change} vs last month
                  </span>
                </div>
                <div className="bg-blue-100 p-1.5 rounded-full">
                  <FileText className="h-4 w-4 text-blue-600" />
                </div>
              </div>
            </Card>

            {/* Pending Approval */}
            <Card className="p-2 hover:shadow-md transition-shadow bg-gradient-to-r from-amber-50 to-white">
              <div className="flex justify-between items-start h-full">
                <div>
                  <p className="text-xs font-medium text-gray-500">Pending Approval</p>
                  <h3 className="text-xl font-bold text-amber-800">
                    {summaryData.pendingApprovals.value}
                  </h3>
                  <span className={`text-xs ${summaryData.pendingApprovals.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {summaryData.pendingApprovals.change} vs last month
                  </span>
                </div>
                <div className="bg-amber-100 p-1.5 rounded-full">
                  <Clock className="h-4 w-4 text-amber-600" />
                </div>
              </div>
            </Card>

            {/* High-Risk Alerts */}
            <Card className="p-2 hover:shadow-md transition-shadow bg-gradient-to-r from-red-50 to-white">
              <div className="flex justify-between items-start h-full">
                <div>
                  <p className="text-xs font-medium text-gray-500">High-Risk Alerts</p>
                  <h3 className="text-xl font-bold text-red-800">
                    {summaryData.highRiskAlerts.value}
                  </h3>
                  <span className={`text-xs ${summaryData.highRiskAlerts.change.startsWith('+') ? 'text-red-600' : 'text-green-600'}`}>
                    {summaryData.highRiskAlerts.change} vs last month
                  </span>
                </div>
                <div className="bg-red-100 p-1.5 rounded-full">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                </div>
              </div>
            </Card>

            {/* Verified Entities */}
            <Card className="p-2 hover:shadow-md transition-shadow bg-gradient-to-r from-green-50 to-white">
              <div className="flex justify-between items-start h-full">
                <div>
                  <p className="text-xs font-medium text-gray-500">Verified Entities</p>
                  <h3 className="text-xl font-bold text-green-800">
                    {summaryData.verifiedEntities.value}
                  </h3>
                  <span className={`text-xs ${summaryData.verifiedEntities.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {summaryData.verifiedEntities.change} vs last month
                  </span>
                </div>
                <div className="bg-green-100 p-1.5 rounded-full">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                </div>
              </div>
            </Card>
          </div>

          {/* Tables Section */}
          <div className="grid grid-cols-12 gap-2 mt-2">
            {/* High-Risk Buyers Table */}
            <Card className="col-span-12 lg:col-span-6 p-2">
              <div className="mb-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-indigo-950 flex items-center">
                    <ShieldAlert className="h-4 w-4 text-red-500 mr-1" />
                    High-Risk Buyers
                  </h3>
                  <span className="text-xs text-red-600 font-medium">
                    {highRiskBuyers.length} buyers at risk
                  </span>
                </div>
              </div>
              <div className="overflow-auto max-h-[300px]">
                <Table>
                  <TableHeader className="bg-gray-50">
                    <TableRow>
                      <TableHead className="text-xs">Buyer</TableHead>
                      <TableHead className="text-xs text-right">Payment Delay (Days)</TableHead>
                      <TableHead className="text-xs text-right">Contract Breaches</TableHead>
                      <TableHead className="text-xs text-right">Total Value</TableHead>
                      <TableHead className="text-xs text-right">Risk Level</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {highRiskBuyers.map((buyer, index) => (
                      <TableRow key={index} className="hover:bg-gray-50">
                        <TableCell className="text-xs font-medium">{buyer.buyer}</TableCell>
                        <TableCell className="text-xs text-right">{buyer.paymentDelay}</TableCell>
                        <TableCell className="text-xs text-right">{buyer.contractBreaches}</TableCell>
                        <TableCell className="text-xs text-right">{buyer.totalValue}</TableCell>
                        <TableCell className="text-xs text-right">
                          <span className={`px-2 py-1 rounded-full text-white text-[10px] font-medium ${
                            buyer.riskLevel === 'Critical' ? 'bg-red-600' : 
                            buyer.riskLevel === 'High' ? 'bg-red-500' : 
                            buyer.riskLevel === 'Medium' ? 'bg-amber-500' : 'bg-green-500'
                          }`}>
                            {buyer.riskLevel}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>

            {/* KYC & Verification Status Table */}
            <Card className="col-span-12 lg:col-span-6 p-2">
              <div className="mb-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-indigo-950 flex items-center">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mr-1" />
                    KYC & Verification Status
                  </h3>
                  <span className="text-xs text-green-600 font-medium">
                    {verifiedEntities.length} verified entities
                  </span>
                </div>
              </div>
              <div className="overflow-auto max-h-[300px]">
                <Table>
                  <TableHeader className="bg-gray-50">
                    <TableRow>
                      <TableHead className="text-xs">Entity Name</TableHead>
                      <TableHead className="text-xs">Type</TableHead>
                      <TableHead className="text-xs">Verification Date</TableHead>
                      <TableHead className="text-xs text-right">Risk Rating</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {verifiedEntities.map((entity, index) => (
                      <TableRow key={index} className="hover:bg-gray-50">
                        <TableCell className="text-xs font-medium">{entity.name}</TableCell>
                        <TableCell className="text-xs">{entity.type}</TableCell>
                        <TableCell className="text-xs">{entity.verificationDate}</TableCell>
                        <TableCell className="text-xs text-right">
                          <span className={`px-2 py-1 rounded-full text-white text-[10px] font-medium ${
                            entity.riskRating === 'Low' ? 'bg-green-500' : 
                            entity.riskRating === 'Medium' ? 'bg-amber-500' : 'bg-red-500'
                          }`}>
                            {entity.riskRating}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>

            {/* Contract Lifecycle Overview */}
            <Card className="col-span-12 p-2">
              <div className="mb-2">
                <h3 className="text-sm font-semibold text-indigo-950 flex items-center">
                  <FileText className="h-4 w-4 text-blue-500 mr-1" />
                  Contract Lifecycle Overview
                </h3>
              </div>
              <div className="grid grid-cols-4 gap-2 h-28">
                <div className="bg-blue-50 rounded-md p-3 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-medium text-blue-800">Draft</span>
                    <div className="bg-blue-100 h-6 w-6 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-blue-800">12</span>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="w-full bg-blue-100 h-1.5 rounded-full">
                      <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '15%' }}></div>
                    </div>
                    <p className="text-[10px] text-blue-600 mt-1">15% of total contracts</p>
                  </div>
                </div>
                <div className="bg-amber-50 rounded-md p-3 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-medium text-amber-800">Pending Approval</span>
                    <div className="bg-amber-100 h-6 w-6 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-amber-800">23</span>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="w-full bg-amber-100 h-1.5 rounded-full">
                      <div className="bg-amber-600 h-1.5 rounded-full" style={{ width: '25%' }}></div>
                    </div>
                    <p className="text-[10px] text-amber-600 mt-1">25% of total contracts</p>
                  </div>
                </div>
                <div className="bg-green-50 rounded-md p-3 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-medium text-green-800">Active</span>
                    <div className="bg-green-100 h-6 w-6 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-green-800">87</span>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="w-full bg-green-100 h-1.5 rounded-full">
                      <div className="bg-green-600 h-1.5 rounded-full" style={{ width: '55%' }}></div>
                    </div>
                    <p className="text-[10px] text-green-600 mt-1">55% of total contracts</p>
                  </div>
                </div>
                <div className="bg-purple-50 rounded-md p-3 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-medium text-purple-800">Completed</span>
                    <div className="bg-purple-100 h-6 w-6 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-purple-800">34</span>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="w-full bg-purple-100 h-1.5 rounded-full">
                      <div className="bg-purple-600 h-1.5 rounded-full" style={{ width: '20%' }}></div>
                    </div>
                    <p className="text-[10px] text-purple-600 mt-1">20% of total contracts</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 