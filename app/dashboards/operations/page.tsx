"use client";

import { useState } from "react";
import {
  Building,
  TrendingUp,
  TrendingDown,
  Clock,
  PackageCheck,
  Truck,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
  LineChart,
  Filter,
  Calendar,
  Search,
  RefreshCw,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function OperationsDashboard() {
  // State for filters and selections
  const [selectedFarm, setSelectedFarm] = useState("All Farms");
  const [selectedTimeRange, setSelectedTimeRange] = useState("Last 30 Days");
  const [orderStatusFilter, setOrderStatusFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Sample data for key metrics
  const keyMetrics = {
    yield: {
      value: 4.82,
      unit: "tons/ha",
      change: 8.6,
      trend: "up",
    },
    ordersFulfilled: {
      value: 1247,
      change: 12.3,
      trend: "up",
    },
    inventoryTurnover: {
      value: 5.8,
      unit: "turns",
      change: -2.5,
      trend: "down",
    },
    transitTime: {
      value: 3.4,
      unit: "days",
      change: -8.2,
      trend: "up", // this is good - less time is better
    },
    totalBerries: {
      value: 248.6,
      unit: "tons",
      change: 14.2,
      trend: "up",
    },
  };

  // Sample data for recent orders
  const recentOrders = [
    {
      id: "#ORD-5523",
      customer: "Walmart East",
      farm: "Washington Valley Farm",
      quantity: "12,000 kg",
      status: "Shipped",
      date: "Apr 28, 2024",
    },
    {
      id: "#ORD-5522",
      customer: "Whole Foods CA",
      farm: "Andean Highlands Farm",
      quantity: "8,500 kg",
      status: "Processing",
      date: "Apr 27, 2024",
    },
    {
      id: "#ORD-5521",
      customer: "Target Midwest",
      farm: "Washington Valley Farm",
      quantity: "6,200 kg",
      status: "Shipped",
      date: "Apr 25, 2024",
    },
    {
      id: "#ORD-5520",
      customer: "Kroger South",
      farm: "Kent Berries",
      quantity: "9,800 kg",
      status: "Processing",
      date: "Apr 24, 2024",
    },
    {
      id: "#ORD-5519",
      customer: "Albertsons West",
      farm: "Techaluta Farm",
      quantity: "5,400 kg",
      status: "Delivered",
      date: "Apr 23, 2024",
    },
    {
      id: "#ORD-5518",
      customer: "Safeway",
      farm: "Sadhu Nagar Farm",
      quantity: "7,300 kg",
      status: "Pending",
      date: "Apr 22, 2024",
    },
    {
      id: "#ORD-5517",
      customer: "Publix",
      farm: "Dr Zmel Farm",
      quantity: "11,200 kg",
      status: "Delivered",
      date: "Apr 20, 2024",
    },
  ];

  // Sample data for farms
  const farms = [
    { name: "All Farms", value: "All Farms" },
    { name: "Washington Valley Farm", value: "Washington Valley Farm" },
    { name: "Andean Highlands Farm", value: "Andean Highlands Farm" },
    { name: "Techaluta Farm", value: "Techaluta Farm" },
    { name: "Dr Zmel Farm", value: "Dr Zmel Farm" },
    { name: "Kent Berries", value: "Kent Berries" },
    { name: "Sadhu Nagar Farm", value: "Sadhu Nagar Farm" },
  ];

  // Filter orders based on status and search query
  const filteredOrders = recentOrders.filter((order) => {
    const matchesStatus = orderStatusFilter === "All" || order.status === orderStatusFilter;
    const matchesSearch = 
      searchQuery === "" || 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.farm.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });

  // Helper function to get status badge color
  const getStatusColor = (status: string): string => {
    switch(status) {
      case "Shipped": return "bg-blue-100 text-blue-800";
      case "Delivered": return "bg-green-100 text-green-800";
      case "Processing": return "bg-amber-100 text-amber-800";
      case "Pending": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Compact Header */}
      <div className="px-3 py-2 bg-white shadow-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-lg font-bold text-indigo-950">
              Operations Dashboard: Supply Chain Performance Monitoring
            </h1>
          </div>

          <div className="flex items-center space-x-2">
            <Select
              value={selectedTimeRange}
              onValueChange={setSelectedTimeRange}
            >
              <SelectTrigger className="h-9 w-[180px] bg-white border-none text-gray-900 text-sm">
                <SelectValue placeholder="Select Time Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Last 7 Days">Last 7 Days</SelectItem>
                <SelectItem value="Last 30 Days">Last 30 Days</SelectItem>
                <SelectItem value="Last 90 Days">Last 90 Days</SelectItem>
                <SelectItem value="Year to Date">Year to Date</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="sm" className="bg-white border-none hover:bg-gray-100 text-gray-900">
              <RefreshCw className="h-4 w-4 mr-1" />
              Refresh
            </Button>
          </div>
    
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Key Metrics Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
          {/* Average Yield per Hectare */}
          <Card className="hover:shadow-md transition-shadow duration-300 bg-gradient-to-r from-blue-50 to-white">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-500">Average Yield per Hectare</p>
                  <div className="flex items-baseline mt-1">
                    <h3 className="text-2xl font-bold text-indigo-950">{keyMetrics.yield.value}</h3>
                    <span className="ml-1 text-sm text-gray-500">{keyMetrics.yield.unit}</span>
                  </div>
                  <div className="flex items-center mt-1">
                    <Badge className={`px-1.5 py-0.5 text-xs ${
                      keyMetrics.yield.trend === "up" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}>
                      {keyMetrics.yield.trend === "up" ? 
                        <ArrowUpRight className="h-3 w-3 mr-0.5" /> : 
                        <ArrowDownRight className="h-3 w-3 mr-0.5" />
                      }
                      {keyMetrics.yield.change}%
                    </Badge>
                    <span className="ml-1.5 text-xs text-gray-500">vs. last period</span>
                  </div>
                </div>
                <div className="p-2 rounded-full bg-indigo-100">
                  <TrendingUp className="h-5 w-5 text-indigo-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Orders Fulfilled */}
          <Card className="hover:shadow-md transition-shadow duration-300 bg-gradient-to-r from-green-50 to-white">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-500">Orders Fulfilled</p>
                  <div className="flex items-baseline mt-1">
                    <h3 className="text-2xl font-bold text-indigo-950">{keyMetrics.ordersFulfilled.value.toLocaleString()}</h3>
                  </div>
                  <div className="flex items-center mt-1">
                    <Badge className={`px-1.5 py-0.5 text-xs ${
                      keyMetrics.ordersFulfilled.trend === "up" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}>
                      {keyMetrics.ordersFulfilled.trend === "up" ? 
                        <ArrowUpRight className="h-3 w-3 mr-0.5" /> : 
                        <ArrowDownRight className="h-3 w-3 mr-0.5" />
                      }
                      {keyMetrics.ordersFulfilled.change}%
                    </Badge>
                    <span className="ml-1.5 text-xs text-gray-500">vs. last period</span>
                  </div>
                </div>
                <div className="p-2 rounded-full bg-green-100">
                  <PackageCheck className="h-5 w-5 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Total Berries Sold Card */}
          <Card className="hover:shadow-md transition-shadow duration-300 bg-gradient-to-r from-pink-50 to-white">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-500">Total Berries Sold</p>
                  <div className="flex items-baseline mt-1">
                    <h3 className="text-2xl font-bold text-indigo-950">{keyMetrics.totalBerries.value}</h3>
                    <span className="ml-1 text-sm text-gray-500">{keyMetrics.totalBerries.unit}</span>
                  </div>
                  <div className="flex items-center mt-1">
                    <Badge className={`px-1.5 py-0.5 text-xs ${
                      keyMetrics.totalBerries.trend === "up" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}>
                      {keyMetrics.totalBerries.trend === "up" ? 
                        <ArrowUpRight className="h-3 w-3 mr-0.5" /> : 
                        <ArrowDownRight className="h-3 w-3 mr-0.5" />
                      }
                      {keyMetrics.totalBerries.change}%
                    </Badge>
                    <span className="ml-1.5 text-xs text-gray-500">vs. last period</span>
                  </div>
                </div>
                <div className="p-2 rounded-full bg-pink-100">
                  <LineChart className="h-5 w-5 text-pink-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Inventory Turnover Rate */}
          <Card className="hover:shadow-md transition-shadow duration-300 bg-gradient-to-r from-purple-50 to-white">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-500">Inventory Turnover Rate</p>
                  <div className="flex items-baseline mt-1">
                    <h3 className="text-2xl font-bold text-indigo-950">{keyMetrics.inventoryTurnover.value}</h3>
                    <span className="ml-1 text-sm text-gray-500">{keyMetrics.inventoryTurnover.unit}</span>
                  </div>
                  <div className="flex items-center mt-1">
                    <Badge className={`px-1.5 py-0.5 text-xs ${
                      keyMetrics.inventoryTurnover.trend === "up" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}>
                      {keyMetrics.inventoryTurnover.trend === "up" ? 
                        <ArrowUpRight className="h-3 w-3 mr-0.5" /> : 
                        <ArrowDownRight className="h-3 w-3 mr-0.5" />
                      }
                      {Math.abs(keyMetrics.inventoryTurnover.change)}%
                    </Badge>
                    <span className="ml-1.5 text-xs text-gray-500">vs. last period</span>
                  </div>
                </div>
                <div className="p-2 rounded-full bg-purple-100">
                  <RefreshCw className="h-5 w-5 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Average Transit Time */}
          <Card className="hover:shadow-md transition-shadow duration-300 bg-gradient-to-r from-amber-50 to-white">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-500">Average Transit Time</p>
                  <div className="flex items-baseline mt-1">
                    <h3 className="text-2xl font-bold text-indigo-950">{keyMetrics.transitTime.value}</h3>
                    <span className="ml-1 text-sm text-gray-500">{keyMetrics.transitTime.unit}</span>
                  </div>
                  <div className="flex items-center mt-1">
                    <Badge className={`px-1.5 py-0.5 text-xs ${
                      keyMetrics.transitTime.trend === "up" && keyMetrics.transitTime.change < 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}>
                      {keyMetrics.transitTime.change < 0 ? 
                        <ArrowDownRight className="h-3 w-3 mr-0.5" /> : 
                        <ArrowUpRight className="h-3 w-3 mr-0.5" />
                      }
                      {Math.abs(keyMetrics.transitTime.change)}%
                    </Badge>
                    <span className="ml-1.5 text-xs text-gray-500">vs. last period</span>
                  </div>
                </div>
                <div className="p-2 rounded-full bg-amber-100">
                  <Truck className="h-5 w-5 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Yield Per Acre Line Graph and Recent Orders Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Yield Per Acre Line Graph */}
          <Card className="lg:col-span-2">
            <CardHeader className="border-b border-gray-200 p-4">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <CardTitle className="text-lg text-indigo-950">Yield per Acre</CardTitle>
                <div className="mt-2 md:mt-0">
                  <Select
                    value={selectedFarm}
                    onValueChange={setSelectedFarm}
                  >
                    <SelectTrigger className="h-8 w-[180px] text-sm">
                      <SelectValue placeholder="Select Farm" />
                    </SelectTrigger>
                    <SelectContent>
                      {farms.map((farm) => (
                        <SelectItem key={farm.value} value={farm.value}>
                          {farm.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="h-[350px] relative">
                {/* Chart Header */}
                <div className="absolute left-14 top-0 flex items-center">
                  <div className="w-3 h-3 bg-indigo-500 rounded-sm mr-1"></div>
                  <span className="text-xs text-gray-500">Yield per Acre</span>
                </div>
                
                {/* Y-axis labels */}
                <div className="absolute left-0 top-8 h-[calc(100%-40px)] flex flex-col justify-between text-xs text-gray-500">
                  <span>92</span>
                  <span>91</span>
                  <span>90</span>
                  <span>89</span>
                  <span>88</span>
                  <span>87</span>
                  <span>86</span>
                  <span>85</span>
                </div>

                {/* Chart Area */}
                <div className="absolute left-12 right-0 top-8 bottom-6 bg-white rounded-md border border-gray-200">
                  {/* Grid Lines */}
                  <div className="absolute inset-0 flex flex-col justify-between">
                    <div className="border-t border-gray-100 w-full"></div>
                    <div className="border-t border-gray-100 w-full"></div>
                    <div className="border-t border-gray-100 w-full"></div>
                    <div className="border-t border-gray-100 w-full"></div>
                    <div className="border-t border-gray-100 w-full"></div>
                    <div className="border-t border-gray-100 w-full"></div>
                    <div className="border-t border-gray-100 w-full"></div>
                  </div>

                  {/* Line Chart */}
                  <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                    {/* Path for the line */}
                    <path 
                      d="M50,100 L150,80 L250,60 L350,90 L450,80 L550,50 L650,30" 
                      fill="none" 
                      stroke="url(#line-gradient)" 
                      strokeWidth="3"
                      vectorEffect="non-scaling-stroke"
                    />
                    
                    {/* Data Points */}
                    <circle cx="50" cy="100" r="4" fill="#6366f1" />
                    <circle cx="150" cy="80" r="4" fill="#6366f1" />
                    <circle cx="250" cy="60" r="4" fill="#6366f1" />
                    <circle cx="350" cy="90" r="4" fill="#6366f1" />
                    <circle cx="450" cy="80" r="4" fill="#6366f1" />
                    <circle cx="550" cy="50" r="4" fill="#6366f1" />
                    <circle cx="650" cy="30" r="4" fill="#6366f1" />
                    
                    {/* Line Gradient */}
                    <defs>
                      <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#4f46e5" />
                        <stop offset="100%" stopColor="#818cf8" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                {/* X-axis labels */}
                <div className="absolute left-12 right-0 bottom-0 flex justify-between text-xs text-gray-500">
                  <span>Jan</span>
                  <span>Feb</span>
                  <span>Mar</span>
                  <span>Apr</span>
                  <span>May</span>
                  <span>Jun</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Orders Table */}
          <Card>
            <CardHeader className="border-b border-gray-200 p-4">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg text-indigo-950">Recent Orders</CardTitle>
                <Button variant="ghost" size="sm" className="text-indigo-600 hover:text-indigo-800">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-hidden">
                <div className="p-3 bg-gray-50 border-b border-gray-200 flex items-center space-x-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500"/>
                    <Input 
                      placeholder="Search orders..." 
                      className="pl-8 h-9"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Select
                    value={orderStatusFilter}
                    onValueChange={setOrderStatusFilter}
                  >
                    <SelectTrigger className="h-9 w-[120px]">
                      <SelectValue placeholder="Filter" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Status</SelectItem>
                      <SelectItem value="Shipped">Shipped</SelectItem>
                      <SelectItem value="Delivered">Delivered</SelectItem>
                      <SelectItem value="Processing">Processing</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="max-h-[400px] overflow-y-auto">
                  <Table>
                    <TableHeader className="bg-gray-50">
                      <TableRow className="hover:bg-gray-100 border-gray-200">
                        <TableHead className="text-xs">Order ID</TableHead>
                        <TableHead className="text-xs">Customer</TableHead>
                        <TableHead className="text-xs hidden md:table-cell">Status</TableHead>
                        <TableHead className="text-xs text-right">Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredOrders.map((order) => (
                        <TableRow key={order.id} className="hover:bg-gray-100 border-gray-200">
                          <TableCell className="font-medium">{order.id}</TableCell>
                          <TableCell>{order.customer}</TableCell>
                          <TableCell className="hidden md:table-cell">
                            <Badge className={getStatusColor(order.status)}>
                              {order.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">{order.date}</TableCell>
                        </TableRow>
                      ))}
                      {filteredOrders.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center text-gray-500 py-6">
                            No orders found
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Orders Table Section */}
        <Card className="mt-6">
          <CardHeader className="border-b border-gray-200 p-4">
            <CardTitle className="text-lg text-indigo-950">All Orders</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-gray-50">
                  <TableRow className="hover:bg-gray-100 border-gray-200">
                    <TableHead className="text-xs">Order ID</TableHead>
                    <TableHead className="text-xs">Customer</TableHead>
                    <TableHead className="text-xs">Farm Name</TableHead>
                    <TableHead className="text-xs">Quantity</TableHead>
                    <TableHead className="text-xs">Status</TableHead>
                    <TableHead className="text-xs text-right">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentOrders.map((order) => (
                    <TableRow key={order.id} className="hover:bg-gray-100 border-gray-200">
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{order.farm}</TableCell>
                      <TableCell>{order.quantity}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">{order.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 