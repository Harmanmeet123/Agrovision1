"use client";

import { useState } from "react";
import { 
  Users, 
  UserPlus, 
  Store, 
  ShoppingCart, 
  UserMinus,
  DollarSign,
  PieChart,
  Calendar,
  Map
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
  PieChart as ReChartPie,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend
} from "recharts";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

export default function CRMDashboard() {
  const [berryType, setBerryType] = useState("All Berries");
  const [timeRange, setTimeRange] = useState("Monthly");

  // Sample data for the dashboard
  const metricsData = {
    totalCustomers: {
      value: "842",
      change: "+5%",
    },
    newCustomers: {
      value: "124",
      change: "+12%",
    },
    totalStores: {
      value: "397",
      change: "+3%",
    },
    onlineSales: {
      value: "$1.2M",
      change: "+15%",
    },
    churnRate: {
      value: "2.7%",
      change: "-0.5%",
    },
    totalRevenue: {
      value: "$8.5M",
      change: "+8%",
    },
  };

  // Revenue Distribution by Brand data
  const revenueByBrand = [
    { name: "Brand 1", value: 35, color: "#4f46e5" },
    { name: "Brand 2", value: 25, color: "#3b82f6" },
    { name: "Brand 3", value: 20, color: "#06b6d4" },
    { name: "Brand 4", value: 15, color: "#10b981" },
      { name: "Others", value: 5, color: "#f59e0b" },
  ];

  // Sales Distribution by Store/Region data for heatmap
  const salesDistribution = [
    { brand: "Costco", westCoast: 2.4, eastCoast: 1.8, midwest: 1.2, south: 0.9, intl: 0.5 },
    { brand: "Walmart", westCoast: 1.6, eastCoast: 2.1, midwest: 1.8, south: 1.4, intl: 0.2 },
    { brand: "Whole Foods", westCoast: 1.2, eastCoast: 0.9, midwest: 0.5, south: 0.7, intl: 0.1 },
    { brand: "Target", westCoast: 1.1, eastCoast: 1.3, midwest: 0.8, south: 1.0, intl: 0.1 },
    { brand: "Local Markets", westCoast: 0.5, eastCoast: 0.4, midwest: 0.7, south: 0.6, intl: 0.2 },
  ];

  // Function to determine cell color based on value
  const getCellColor = (value: number) => {
    if (value > 2.0) return "bg-green-600 text-white";
    if (value > 1.5) return "bg-green-500 text-white";
    if (value > 1.0) return "bg-green-400 text-white";
    if (value > 0.5) return "bg-green-300";
    return "bg-green-200";
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Compact Header */}
      <div className="px-3 py-2 bg-white shadow-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-lg font-bold text-indigo-950">
            CRM & Sales Dashboard:Monitor customer relationships and sales performance
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
          
          <div className="flex items-center">
            <Select
              value={berryType}
              onValueChange={(value) => setBerryType(value)}
            >
              <SelectTrigger className="h-8 w-[160px] text-sm bg-white border-indigo-200">
                <SelectValue placeholder="Select Berry Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Overall">Overall</SelectItem>
                <SelectItem value="Last week">Last week</SelectItem>
                <SelectItem value="Last month">Last month</SelectItem>
                <SelectItem value="Last year">Last year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 p-2 bg-gray-50 overflow-auto">
        <div className="flex flex-col gap-2">
          {/* Key Metrics Cards - 6 cards in a row */}
          <div className="grid grid-cols-6 gap-2 h-24">
            {/* Total Customers */}
            <Card className="p-2 hover:shadow-md transition-shadow bg-gradient-to-r from-blue-50 to-white">
              <div className="flex justify-between items-start h-full">
                <div>
                  <p className="text-xs font-medium text-gray-500">Total Customers</p>
                  <h3 className="text-xl font-bold text-blue-800">
                    {metricsData.totalCustomers.value}
                  </h3>
                  <span className={`text-xs ${metricsData.totalCustomers.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {metricsData.totalCustomers.change} vs last month
                  </span>
                </div>
                <div className="bg-blue-100 p-1.5 rounded-full">
                  <Users className="h-4 w-4 text-blue-600" />
                </div>
              </div>
            </Card>

            {/* New Customers */}
            <Card className="p-2 hover:shadow-md transition-shadow bg-gradient-to-r from-green-50 to-white">
              <div className="flex justify-between items-start h-full">
                <div>
                  <p className="text-xs font-medium text-gray-500">New Customers</p>
                  <h3 className="text-xl font-bold text-green-800">
                    {metricsData.newCustomers.value}
                  </h3>
                  <span className={`text-xs ${metricsData.newCustomers.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {metricsData.newCustomers.change} vs last month
                  </span>
                </div>
                <div className="bg-green-100 p-1.5 rounded-full">
                  <UserPlus className="h-4 w-4 text-green-600" />
                </div>
              </div>
            </Card>

            {/* Total Stores */}
            <Card className="p-2 hover:shadow-md transition-shadow bg-gradient-to-r from-purple-50 to-white">
              <div className="flex justify-between items-start h-full">
                <div>
                  <p className="text-xs font-medium text-gray-500">Total Stores</p>
                  <h3 className="text-xl font-bold text-purple-800">
                    {metricsData.totalStores.value}
                  </h3>
                  <span className={`text-xs ${metricsData.totalStores.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {metricsData.totalStores.change} vs last month
                  </span>
                </div>
                <div className="bg-purple-100 p-1.5 rounded-full">
                  <Store className="h-4 w-4 text-purple-600" />
                </div>
              </div>
            </Card>

            {/* Online Sales */}
            <Card className="p-2 hover:shadow-md transition-shadow bg-gradient-to-r from-cyan-50 to-white">
              <div className="flex justify-between items-start h-full">
                <div>
                  <p className="text-xs font-medium text-gray-500">Online Sales</p>
                  <h3 className="text-xl font-bold text-cyan-800">
                    {metricsData.onlineSales.value}
                  </h3>
                  <span className={`text-xs ${metricsData.onlineSales.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {metricsData.onlineSales.change} vs last month
                  </span>
                </div>
                <div className="bg-cyan-100 p-1.5 rounded-full">
                  <ShoppingCart className="h-4 w-4 text-cyan-600" />
                </div>
              </div>
            </Card>

            {/* Churn Rate */}
            <Card className="p-2 hover:shadow-md transition-shadow bg-gradient-to-r from-amber-50 to-white">
              <div className="flex justify-between items-start h-full">
                <div>
                  <p className="text-xs font-medium text-gray-500">Churn Rate</p>
                  <h3 className="text-xl font-bold text-amber-800">
                    {metricsData.churnRate.value}
                  </h3>
                  <span className={`text-xs ${metricsData.churnRate.change.startsWith('-') ? 'text-green-600' : 'text-red-600'}`}>
                    {metricsData.churnRate.change} vs last month
                  </span>
                </div>
                <div className="bg-amber-100 p-1.5 rounded-full">
                  <UserMinus className="h-4 w-4 text-amber-600" />
                </div>
              </div>
            </Card>

            {/* Total Revenue */}
            <Card className="p-2 hover:shadow-md transition-shadow bg-gradient-to-r from-indigo-50 to-white">
              <div className="flex justify-between items-start h-full">
                <div>
                  <p className="text-xs font-medium text-gray-500">Total Revenue</p>
                  <h3 className="text-xl font-bold text-indigo-800">
                    {metricsData.totalRevenue.value}
                  </h3>
                  <span className={`text-xs ${metricsData.totalRevenue.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {metricsData.totalRevenue.change} vs last month
                  </span>
                </div>
                <div className="bg-indigo-100 p-1.5 rounded-full">
                  <DollarSign className="h-4 w-4 text-indigo-600" />
                </div>
              </div>
            </Card>
          </div>

          {/* Charts and Tables Section */}
          <div className="grid grid-cols-12 gap-2 mt-2">
            {/* Revenue Distribution by Brand - Pie Chart */}
            <Card className="col-span-12 lg:col-span-4 p-2">
              <div className="mb-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-indigo-950 flex items-center">
                    <PieChart className="h-4 w-4 text-indigo-500 mr-1" />
                    Revenue Distribution by Brand
                  </h3>
                </div>
              </div>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ReChartPie>
                    <Pie
                      data={revenueByBrand}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {revenueByBrand.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => [`$${(Number(value) / 100 * parseFloat(metricsData.totalRevenue.value.replace('$', '').replace('M', ''))).toFixed(1)}M`, 'Revenue']}
                    />
                  </ReChartPie>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Sales Distribution Across Stores - Heatmap */}
            <Card className="col-span-12 lg:col-span-8 p-2">
              <div className="mb-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-indigo-950 flex items-center">
                    <Map className="h-4 w-4 text-indigo-500 mr-1" />
                    Sales Distribution Across Stores
                  </h3>
                </div>
              </div>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-gray-50">
                    <TableRow>
                      <TableHead className="text-xs font-semibold">Brand/Region</TableHead>
                      <TableHead className="text-xs text-center font-semibold">West Coast</TableHead>
                      <TableHead className="text-xs text-center font-semibold">East Coast</TableHead>
                      <TableHead className="text-xs text-center font-semibold">Midwest</TableHead>
                      <TableHead className="text-xs text-center font-semibold">South</TableHead>
                      <TableHead className="text-xs text-center font-semibold">International</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {salesDistribution.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell className="text-xs font-medium">{row.brand}</TableCell>
                        <TableCell className={`text-xs text-center font-medium ${getCellColor(row.westCoast)}`}>
                          ${row.westCoast.toFixed(1)}M
                        </TableCell>
                        <TableCell className={`text-xs text-center font-medium ${getCellColor(row.eastCoast)}`}>
                          ${row.eastCoast.toFixed(1)}M
                        </TableCell>
                        <TableCell className={`text-xs text-center font-medium ${getCellColor(row.midwest)}`}>
                          ${row.midwest.toFixed(1)}M
                        </TableCell>
                        <TableCell className={`text-xs text-center font-medium ${getCellColor(row.south)}`}>
                          ${row.south.toFixed(1)}M
                        </TableCell>
                        <TableCell className={`text-xs text-center font-medium ${getCellColor(row.intl)}`}>
                          ${row.intl.toFixed(1)}M
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="font-semibold bg-gray-50">
                      <TableCell className="text-xs">Total</TableCell>
                      <TableCell className="text-xs text-center">$6.8M</TableCell>
                      <TableCell className="text-xs text-center">$6.5M</TableCell>
                      <TableCell className="text-xs text-center">$5.0M</TableCell>
                      <TableCell className="text-xs text-center">$4.6M</TableCell>
                      <TableCell className="text-xs text-center">$1.1M</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </Card>

            {/* Top Stores Table */}
            <Card className="col-span-12 lg:col-span-6 p-2">
              <div className="mb-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-indigo-950 flex items-center">
                    <Users className="h-4 w-4 text-indigo-500 mr-1" />
                    Top Stores
                  </h3>
                </div>
              </div>
              <div className="overflow-auto max-h-[250px]">
                <Table>
                  <TableHeader className="bg-gray-50">
                    <TableRow>
                      <TableHead className="text-xs">Store Name</TableHead>
                      <TableHead className="text-xs">Store Type</TableHead>
                      <TableHead className="text-xs text-right">Orders</TableHead>
                      <TableHead className="text-xs text-right">Avg. Order</TableHead>
                      <TableHead className="text-xs text-right">Total Spent</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="text-xs font-medium">Costco Northwest</TableCell>
                      <TableCell className="text-xs">Warehouse</TableCell>
                      <TableCell className="text-xs text-right">32</TableCell>
                      <TableCell className="text-xs text-right">$75,450</TableCell>
                      <TableCell className="text-xs text-right">$2.41M</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-xs font-medium">Whole Foods CA</TableCell>
                      <TableCell className="text-xs">Organic</TableCell>
                      <TableCell className="text-xs text-right">28</TableCell>
                      <TableCell className="text-xs text-right">$42,800</TableCell>
                      <TableCell className="text-xs text-right">$1.20M</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-xs font-medium">Walmart East</TableCell>
                      <TableCell className="text-xs">Retail Chain</TableCell>
                      <TableCell className="text-xs text-right">24</TableCell>
                      <TableCell className="text-xs text-right">$48,750</TableCell>
                      <TableCell className="text-xs text-right">$1.17M</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-xs font-medium">Target Midwest</TableCell>
                      <TableCell className="text-xs">Retail Chain</TableCell>
                      <TableCell className="text-xs text-right">18</TableCell>
                      <TableCell className="text-xs text-right">$45,500</TableCell>
                      <TableCell className="text-xs text-right">$0.82M</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-xs font-medium">Fresh Market</TableCell>
                      <TableCell className="text-xs">Premium</TableCell>
                      <TableCell className="text-xs text-right">15</TableCell>
                      <TableCell className="text-xs text-right">$38,700</TableCell>
                      <TableCell className="text-xs text-right">$0.58M</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </Card>

            {/* New Customer Table - replacing Recent Orders */}
            <Card className="col-span-12 lg:col-span-6 p-2">
              <div className="mb-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-indigo-950 flex items-center">
                    <UserPlus className="h-4 w-4 text-indigo-500 mr-1" />
                    New Customers
                  </h3>
                </div>
              </div>
              <div className="overflow-auto max-h-[250px]">
                <Table>
                  <TableHeader className="bg-gray-50">
                    <TableRow>
                      <TableHead className="text-xs">Customer ID</TableHead>
                      <TableHead className="text-xs">Name</TableHead>
                      <TableHead className="text-xs">Type</TableHead>
                      <TableHead className="text-xs">Date Joined</TableHead>
                      <TableHead className="text-xs">KYC Status</TableHead>
                      <TableHead className="text-xs">Governance Compliance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="text-xs font-medium">CUST-7812</TableCell>
                      <TableCell className="text-xs">Nature's Best</TableCell>
                      <TableCell className="text-xs">Store</TableCell>
                      <TableCell className="text-xs">Apr 28, 2024</TableCell>
                      <TableCell className="text-xs">
                        <span className="px-2 py-1 rounded-full text-white text-[10px] font-medium bg-green-500">
                          Verified
                        </span>
                      </TableCell>
                      <TableCell className="text-xs">
                        <span className="px-2 py-1 rounded-full text-white text-[10px] font-medium bg-green-500">
                          Completed
                        </span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-xs font-medium">CUST-7811</TableCell>
                      <TableCell className="text-xs">Berry Farms Co.</TableCell>
                      <TableCell className="text-xs">Farm</TableCell>
                      <TableCell className="text-xs">Apr 27, 2024</TableCell>
                      <TableCell className="text-xs">
                        <span className="px-2 py-1 rounded-full text-white text-[10px] font-medium bg-blue-500">
                          Pending
                        </span>
                      </TableCell>
                      <TableCell className="text-xs">
                        <span className="px-2 py-1 rounded-full text-white text-[10px] font-medium bg-amber-500">
                          Pending
                        </span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-xs font-medium">CUST-7810</TableCell>
                      <TableCell className="text-xs">Organic Express</TableCell>
                      <TableCell className="text-xs">Store</TableCell>
                      <TableCell className="text-xs">Apr 25, 2024</TableCell>
                      <TableCell className="text-xs">
                        <span className="px-2 py-1 rounded-full text-white text-[10px] font-medium bg-green-500">
                          Verified
                        </span>
                      </TableCell>
                      <TableCell className="text-xs">
                        <span className="px-2 py-1 rounded-full text-white text-[10px] font-medium bg-green-500">
                          Completed
                        </span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-xs font-medium">CUST-7809</TableCell>
                      <TableCell className="text-xs">John Peterson</TableCell>
                      <TableCell className="text-xs">Individual</TableCell>
                      <TableCell className="text-xs">Apr 24, 2024</TableCell>
                      <TableCell className="text-xs">
                        <span className="px-2 py-1 rounded-full text-white text-[10px] font-medium bg-green-500">
                          Verified
                        </span>
                      </TableCell>
                      <TableCell className="text-xs">
                        <span className="px-2 py-1 rounded-full text-white text-[10px] font-medium bg-blue-500">
                          Pending
                        </span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-xs font-medium">CUST-7808</TableCell>
                      <TableCell className="text-xs">Fresh Harvest Wholesalers</TableCell>
                      <TableCell className="text-xs">Store</TableCell>
                      <TableCell className="text-xs">Apr 23, 2024</TableCell>
                      <TableCell className="text-xs">
                        <span className="px-2 py-1 rounded-full text-white text-[10px] font-medium bg-green-500">
                          Verified
                        </span>
                      </TableCell>
                      <TableCell className="text-xs">
                        <span className="px-2 py-1 rounded-full text-white text-[10px] font-medium bg-green-500">
                          Completed
                        </span>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 