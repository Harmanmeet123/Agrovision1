"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Home, 
  ChevronDown, 
  TrendingUp, 
  BarChart2, 
  DollarSign, 
  PieChart, 
  HelpCircle 
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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function CFODashboard() {
  const [berryType, setBerryType] = useState("All Berries");

  // Sample data
  const metricsData = {
    roi: {
      value: "18.7%",
      formula: "ROI = (Net Profit / Investment Cost) × 100",
    },
    marketShare: {
      value: "24.3%",
      formula: "Market Share = (Brand Sales / Total Industry Sales) × 100",
    },
    grossMargin: {
      value: "42.6%",
      formula: "Gross Margin = ((Revenue - Cost of Goods Sold) / Revenue) × 100",
    },
    totalRevenue: {
      value: "$8,724,152",
      formula: "Total Revenue = Units Sold × Average Selling Price",
    },
  };

  // Line chart data - based on reference image
  const salesProfitData = {
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    fruitistJumboSales: [64, 70, 75, 80, 84, 90, 95, 98, 100, 104, 110, 120],
    fruitistSales: [44, 48, 52, 55, 58, 62, 64, 67, 68, 72, 75, 82],
    fruitistJumboProfit: [20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42],
    fruitistProfit: [14, 16, 18, 18, 19, 20, 21, 22, 22, 23, 24, 26],
  };

  // Revenue over time data
  const revenueOverTimeData = {
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    revenue: [9.7, 9.9, 10.7, 14.0, 11.7, 14.1, 9.2, 11.2, 12.5, 14.6, 11.3, 13.0]
  };

  // Revenue contribution data
  const revenueContributionData = {
    online: 65,
    inStore: 35,
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Compact Header */}
      <div className="px-3 py-2 bg-white shadow-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-lg font-bold text-indigo-950">
              CFO Dashboard: Financial Overview and Analytics
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

      {/* Main Content - Optimized for single screen view */}
      <div className="flex-1 p-2 bg-gray-50 overflow-hidden">
        <div className="h-full flex flex-col gap-2">
          {/* Metric Cards - Single Row */}
          <div className="grid grid-cols-4 gap-2 h-24">
            {/* ROI Card */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Card className="p-2 hover:shadow-md transition-shadow bg-gradient-to-r from-indigo-50 to-white">
                    <div className="flex justify-between items-start h-full">
                      <div>
                        <p className="text-xs font-medium text-gray-500">Return on Investment</p>
                        <h3 className="text-xl font-bold text-indigo-800">
                          {metricsData.roi.value}
                        </h3>
                      </div>
                      <div className="bg-indigo-100 p-1.5 rounded-full">
                        <TrendingUp className="h-4 w-4 text-indigo-600" />
                      </div>
                    </div>
                  </Card>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="bg-indigo-950 text-white p-2 text-xs">
                  <p>{metricsData.roi.formula}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* Market Share Card */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Card className="p-2 hover:shadow-md transition-shadow bg-gradient-to-r from-purple-50 to-white">
                    <div className="flex justify-between items-start h-full">
                      <div>
                        <p className="text-xs font-medium text-gray-500">Market Share</p>
                        <h3 className="text-xl font-bold text-purple-800">
                          {metricsData.marketShare.value}
                        </h3>
                      </div>
                      <div className="bg-purple-100 p-1.5 rounded-full">
                        <BarChart2 className="h-4 w-4 text-purple-600" />
                      </div>
                    </div>
                  </Card>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="bg-indigo-950 text-white p-2 text-xs">
                  <p>{metricsData.marketShare.formula}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* Gross Margin Card */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Card className="p-2 hover:shadow-md transition-shadow bg-gradient-to-r from-blue-50 to-white">
                    <div className="flex justify-between items-start h-full">
                      <div>
                        <p className="text-xs font-medium text-gray-500">Gross Margin</p>
                        <h3 className="text-xl font-bold text-blue-800">
                          {metricsData.grossMargin.value}
                        </h3>
                      </div>
                      <div className="bg-blue-100 p-1.5 rounded-full">
                        <PieChart className="h-4 w-4 text-blue-600" />
                      </div>
                    </div>
                  </Card>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="bg-indigo-950 text-white p-2 text-xs">
                  <p>{metricsData.grossMargin.formula}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* Total Revenue Card */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Card className="p-2 hover:shadow-md transition-shadow bg-gradient-to-r from-green-50 to-white">
                    <div className="flex justify-between items-start h-full">
                      <div>
                        <p className="text-xs font-medium text-gray-500">Total Revenue</p>
                        <h3 className="text-xl font-bold text-green-800">
                          {metricsData.totalRevenue.value}
                        </h3>
                      </div>
                      <div className="bg-green-100 p-1.5 rounded-full">
                        <DollarSign className="h-4 w-4 text-green-600" />
                      </div>
                    </div>
                  </Card>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="bg-indigo-950 text-white p-2 text-xs">
                  <p>{metricsData.totalRevenue.formula}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          {/* Charts Section - 2 row layout */}
          <div className="grid grid-cols-12 gap-2 flex-grow">
            {/* Sales and Profit Overview Line Chart */}
            <Card className="col-span-12 lg:col-span-6 p-2">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-sm font-semibold text-indigo-950">Sales and Profit Overview</h3>
              </div>
              <div className="h-[85%] relative">
                <div className="absolute inset-0 pt-2 pb-8 pl-8 pr-4">
                  {/* Legend */}
                  <div className="absolute top-0 left-8 flex flex-wrap gap-x-3 gap-y-1 text-[10px]">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-blue-600 mr-1"></div>
                      <span>Fruitist Jumbo Sales</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-purple-600 mr-1"></div>
                      <span>Fruitist Sales</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 mr-1"></div>
                      <span>Fruitist Jumbo Profit</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-yellow-500 mr-1"></div>
                      <span>Fruitist Profit</span>
                    </div>
                  </div>

                  {/* Y-axis grid lines */}
                  <div className="absolute left-8 right-4 top-8 bottom-8 flex flex-col justify-between">
                    <div className="border-b border-gray-200 w-full h-0"></div>
                    <div className="border-b border-gray-200 w-full h-0"></div>
                    <div className="border-b border-gray-200 w-full h-0"></div>
                    <div className="border-b border-gray-200 w-full h-0"></div>
                    <div className="border-b border-gray-200 w-full h-0"></div>
                    <div className="border-b border-gray-200 w-full h-0"></div>
                  </div>

                  {/* Y-axis labels */}
                  <div className="absolute left-0 top-8 bottom-8 flex flex-col justify-between text-[10px] text-gray-500">
                    <span>120</span>
                    <span>100</span>
                    <span>80</span>
                    <span>60</span>
                    <span>40</span>
                    <span>20</span>
                    <span>0</span>
                  </div>

                  {/* X-axis labels */}
                  <div className="absolute left-8 right-4 bottom-0 flex justify-between text-[10px] text-gray-500">
                    {salesProfitData.months.map((month, index) => (
                      <span key={index}>{month}</span>
                    ))}
                  </div>

                  {/* Chart using SVG */}
                  <svg 
                    className="absolute left-8 right-4 top-8 bottom-8" 
                    viewBox="0 0 1100 400" 
                    preserveAspectRatio="none"
                  >
                    {/* Fruitist Jumbo Sales Line */}
                    <path 
                      d={salesProfitData.fruitistJumboSales.map((value, index) => {
                        const x = (index / (salesProfitData.months.length - 1)) * 1100;
                        const y = 400 - (value / 120) * 400;
                        return `${index === 0 ? 'M' : 'L'}${x},${y}`;
                      }).join(' ')} 
                      fill="none"
                      stroke="#4338ca" 
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    
                    {/* Fruitist Sales Line */}
                    <path 
                      d={salesProfitData.fruitistSales.map((value, index) => {
                        const x = (index / (salesProfitData.months.length - 1)) * 1100;
                        const y = 400 - (value / 120) * 400;
                        return `${index === 0 ? 'M' : 'L'}${x},${y}`;
                      }).join(' ')} 
                      fill="none"
                      stroke="#a855f7" 
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    
                    {/* Fruitist Jumbo Profit Line */}
                    <path 
                      d={salesProfitData.fruitistJumboProfit.map((value, index) => {
                        const x = (index / (salesProfitData.months.length - 1)) * 1100;
                        const y = 400 - (value / 120) * 400;
                        return `${index === 0 ? 'M' : 'L'}${x},${y}`;
                      }).join(' ')} 
                      fill="none"
                      stroke="#22c55e" 
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    
                    {/* Fruitist Profit Line */}
                    <path 
                      d={salesProfitData.fruitistProfit.map((value, index) => {
                        const x = (index / (salesProfitData.months.length - 1)) * 1100;
                        const y = 400 - (value / 120) * 400;
                        return `${index === 0 ? 'M' : 'L'}${x},${y}`;
                      }).join(' ')} 
                      fill="none"
                      stroke="#eab308" 
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    
                    {/* Data points for Fruitist Jumbo Sales */}
                    {salesProfitData.fruitistJumboSales.map((value, index) => {
                      const x = (index / (salesProfitData.months.length - 1)) * 1100;
                      const y = 400 - (value / 120) * 400;
                      return (
                        <circle 
                          key={`fjSales-${index}`} 
                          cx={x} 
                          cy={y} 
                          r="4" 
                          fill="white" 
                          stroke="#4338ca" 
                          strokeWidth="2"
                        />
                      );
                    })}
                    
                    {/* Data points for Fruitist Sales */}
                    {salesProfitData.fruitistSales.map((value, index) => {
                      const x = (index / (salesProfitData.months.length - 1)) * 1100;
                      const y = 400 - (value / 120) * 400;
                      return (
                        <circle 
                          key={`fSales-${index}`} 
                          cx={x} 
                          cy={y} 
                          r="4" 
                          fill="white" 
                          stroke="#a855f7" 
                          strokeWidth="2"
                        />
                      );
                    })}
                    
                    {/* Data points for Fruitist Jumbo Profit */}
                    {salesProfitData.fruitistJumboProfit.map((value, index) => {
                      const x = (index / (salesProfitData.months.length - 1)) * 1100;
                      const y = 400 - (value / 120) * 400;
                      return (
                        <circle 
                          key={`fjProfit-${index}`} 
                          cx={x} 
                          cy={y} 
                          r="4" 
                          fill="white" 
                          stroke="#22c55e" 
                          strokeWidth="2"
                        />
                      );
                    })}
                    
                    {/* Data points for Fruitist Profit */}
                    {salesProfitData.fruitistProfit.map((value, index) => {
                      const x = (index / (salesProfitData.months.length - 1)) * 1100;
                      const y = 400 - (value / 120) * 400;
                      return (
                        <circle 
                          key={`fProfit-${index}`} 
                          cx={x} 
                          cy={y} 
                          r="4" 
                          fill="white" 
                          stroke="#eab308" 
                          strokeWidth="2"
                        />
                      );
                    })}
                  </svg>
                </div>
              </div>
            </Card>

            {/* Revenue Contribution Pie Chart */}
            <Card className="col-span-12 lg:col-span-6 p-2 bg-indigo-950">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-sm font-semibold text-white">Revenue Contribution by Channel</h3>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="h-3.5 w-3.5 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="bg-indigo-950 text-white p-2 text-xs">
                      <p>Contribution % = (Channel Revenue / Total Revenue) × 100</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="flex h-[85%] items-center justify-center">
                <svg width="160" height="160" viewBox="0 0 160 160">
                  {/* Darker blue section - 65% */}
                  <path
                    d="M80 0 A80 80 0 0 1 156 106.8 L80 80 Z"
                    fill="#3b82f6"
                  />
                  
                  {/* Lighter blue section - 35% */}
                  <path
                    d="M156 106.8 A80 80 0 1 1 80 0 L80 80 Z"
                    fill="#93c5fd"
                  />
                </svg>
                
                <div className="ml-6">
                  <div className="mb-2">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-blue-500 rounded-sm mr-2"></div>
                      <span className="text-xs text-white">Online Sales - 65%</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-blue-300 rounded-sm mr-2"></div>
                      <span className="text-xs text-white">In-store Sales - 35%</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Sales & Profit Overview – Brand-wise - NEW LINE CHART */}
            <Card className="col-span-12 p-2">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-sm font-semibold text-indigo-950">Revenue Over Time</h3>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
                    <span className="text-xs">Revenue</span>
                  </div>
                  
                </div>
              </div>
              <div className="h-[90%] relative bg-white">
                {/* Chart area */}
                <div className="absolute inset-0 pt-2 pb-6 pl-8 pr-4">
                  {/* X-axis labels */}
                  <div className="absolute left-8 right-4 bottom-0 flex justify-between text-[10px] text-gray-500">
                    {revenueOverTimeData.months.map((month, index) => (
                      <span key={index}>{month}</span>
                    ))}
                  </div>

                  {/* Chart using SVG */}
                  <svg 
                    className="absolute left-8 right-4 top-4 bottom-8" 
                    viewBox="0 0 1100 200" 
                    preserveAspectRatio="none"
                  >
                    {/* Revenue Line */}
                    <path 
                      d={revenueOverTimeData.revenue.map((value, index) => {
                        const x = (index / (revenueOverTimeData.months.length - 1)) * 1100;
                        const y = 200 - (value / 15) * 200;
                        return `${index === 0 ? 'M' : 'L'}${x},${y}`;
                      }).join(' ')} 
                      fill="none"
                      stroke="#3b82f6" 
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    
                    {/* Data points */}
                    {revenueOverTimeData.revenue.map((value, index) => {
                      const x = (index / (revenueOverTimeData.months.length - 1)) * 1100;
                      const y = 200 - (value / 15) * 200;
                      return (
                        <circle 
                          key={`revenue-${index}`} 
                          cx={x} 
                          cy={y} 
                          r="4" 
                          fill="white" 
                          stroke="#3b82f6" 
                          strokeWidth="2"
                        />
                      );
                    })}
                  </svg>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 