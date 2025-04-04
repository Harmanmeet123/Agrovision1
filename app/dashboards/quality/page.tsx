"use client";

import { useState } from "react";
import { 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  ChevronDown, 
  ChevronRight,
  FileText,
  ThermometerSnowflake,
  PackageCheck,
  Truck,
  Beaker,
  Leaf,
  Tractor,
  ClipboardList,
  Home,
  ChevronUp
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
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function QualityDashboard() {
  const [berryType, setBerryType] = useState("All Berries");
  const [timeRange, setTimeRange] = useState("Last 30 Days");
  const [activeStage, setActiveStage] = useState("overview");
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  
  // Farm quality scores data
  const farmQualityScores = [
    { country: "United States", farmName: "Washington Valley Farm", location: "Yakima, WA", score: 92, status: "Passed" },
    { country: "Peru", farmName: "Andean Highlands Farm", location: "Cusco", score: 88, status: "Passed" },
    { country: "Mexico", farmName: "Techaluta Farm", location: "Jalisco", score: 81, status: "Needs Review" },
    { country: "Morocco", farmName: "Dr Zmel Farm", location: "Km4 Route", score: 94, status: "Passed" },
    { country: "UK", farmName: "Kent Berries", location: "Kent", score: 89, status: "Passed" },
    { country: "Egypt", farmName: "Abou Sultan Farm", location: "Ismailia", score: 78, status: "Needs Review" },
    { country: "China", farmName: "Cangxi Village Farm", location: "Kunming, Yunnan", score: 85, status: "Passed" },
    { country: "India", farmName: "Sadhu Nagar Farm", location: "Uttarakhand", score: 76, status: "Needs Review" },
  ];

  // Stage-wise quality status data
  const stageQualityData = [
    { 
      stage: "Pre-Harvest Inspection", 
      icon: <Leaf className="h-5 w-5" />,
      passed: 89,
      needs_review: 8,
      failed: 3,
      status: "Passed",
      metrics: [
        { name: "Soil & Climate Condition", score: 87, status: "Passed" },
        { name: "Pesticide & Residue Monitoring", score: 92, status: "Passed" },
        { name: "Fruit Maturity Evaluation", score: 79, status: "Needs Review" },
      ]
    },
    { 
      stage: "Harvesting Process", 
      icon: <Tractor className="h-5 w-5" />,
      passed: 92,
      needs_review: 5,
      failed: 3,
      status: "Passed",
      metrics: [
        { name: "Picking Process Monitoring", score: 94, status: "Passed" },
        { name: "Sorting Prevention", score: 88, status: "Passed" },
      ]
    },
    { 
      stage: "Post-Harvest Handling", 
      icon: <ThermometerSnowflake className="h-5 w-5" />,
      passed: 85,
      needs_review: 10,
      failed: 5,
      status: "Needs Review",
      metrics: [
        { name: "Temperature & Humidity Control", score: 82, status: "Needs Review" },
        { name: "Packaging Compliance in Storage", score: 88, status: "Passed" },
        { name: "Traceability & Batch Tracking", score: 91, status: "Passed" },
      ]
    },
    { 
      stage: "Internal Quality Testing", 
      icon: <Beaker className="h-5 w-5" />,
      passed: 93,
      needs_review: 5,
      failed: 2,
      status: "Passed",
      metrics: [
        { name: "AI-Based Hydra Machine Results", score: 95, status: "Passed" },
        { name: "Firmness & Sweetness Analysis", score: 91, status: "Passed" },
        { name: "Lab Testing Status", score: 89, status: "Passed" },
      ]
    },
    { 
      stage: "Packaging Compliance", 
      icon: <PackageCheck className="h-5 w-5" />,
      passed: 78,
      needs_review: 18,
      failed: 4,
      status: "Needs Review",
      metrics: [
        { name: "Material Quality Verification", score: 76, status: "Needs Review" },
        { name: "Packaging Suitability", score: 82, status: "Needs Review" },
      ]
    },
    { 
      stage: "Pre-Dispatch Verification", 
      icon: <Truck className="h-5 w-5" />,
      passed: 88,
      needs_review: 9,
      failed: 3,
      status: "Passed",
      metrics: [
        { name: "Final Quality Check", score: 90, status: "Passed" },
        { name: "Market Standard Compliance", score: 86, status: "Passed" },
      ]
    },
  ];

  // Alerts data
  const qualityAlerts = [
    { id: "ALT-2341", stage: "Packaging Compliance", issue: "Material quality below threshold for Batch P-7892", severity: "Medium", date: "Apr 28, 2024" },
    { id: "ALT-2340", stage: "Post-Harvest Handling", issue: "Temperature fluctuation detected in Cold Storage B", severity: "Medium", date: "Apr 27, 2024" },
    { id: "ALT-2339", stage: "Pre-Harvest Inspection", issue: "Fruit maturity inconsistent in Mexico Techaluta Farm", severity: "Low", date: "Apr 26, 2024" },
    { id: "ALT-2338", stage: "Pre-Dispatch Verification", issue: "Batch TR-8721 needs additional inspection before dispatch", severity: "Low", date: "Apr 25, 2024" },
  ];

  // Add order IDs for each stage
  const stageOrders = {
    "pre-harvest": ["ORD-2451", "ORD-2467", "ORD-2489", "ORD-2495"],
    "harvesting": ["ORD-2502", "ORD-2517", "ORD-2519", "ORD-2525"],
    "post-harvest": ["ORD-2532", "ORD-2538", "ORD-2541", "ORD-2546"],
    "testing": ["ORD-2553", "ORD-2559", "ORD-2561", "ORD-2567"],
    "packaging": ["ORD-2574", "ORD-2581", "ORD-2587", "ORD-2590"],
    "pre-dispatch": ["ORD-2597", "ORD-2603", "ORD-2609", "ORD-2612"]
  };

  // Function to handle order selection
  const handleOrderSelect = (orderId: string, stage: string) => {
    setSelectedOrderId(orderId);
    setActiveStage(stage);
  };

  // Function to get status color - more subtle for the detailed view
  const getStatusColor = (status: string): string => {
    switch(status) {
      case "Passed": return "bg-green-500";
      case "Needs Review": return "bg-amber-500";
      case "Failed": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  // Function to get alert severity color
  const getAlertSeverityColor = (severity: string): string => {
    switch(severity) {
      case "High": return "bg-red-500";
      case "Medium": return "bg-amber-500";
      case "Low": return "bg-blue-500";
      default: return "bg-gray-500";
    }
  };

  // Content to show based on the active stage
  const renderStageContent = () => {
    // Show overview as default
    if (activeStage === "overview") {
      return (
        <div className="grid grid-cols-4 gap-3">
          {/* Left panel - Overview content */}
          <div className="col-span-3">
            <Card className="p-3 shadow-sm">
              <div className="mb-3">
                <h2 className="text-lg font-semibold text-indigo-950">
                  Overall Quality Trend Analysis
                </h2>
              </div>
              
              {/* Trend Graph - Bar Chart */}
              <div className="h-[250px] w-full relative bg-white rounded-md border border-gray-100 p-4">
                {/* Y-axis labels */}
                <div className="absolute left-2 top-0 h-full flex flex-col justify-between text-xs text-gray-500">
                  <span>100%</span>
                  <span>75%</span>
                  <span>50%</span>
                  <span>25%</span>
                  <span>0%</span>
                </div>
                
                {/* Bar Chart */}
                <div className="absolute inset-0 ml-12 mr-4 mt-4 mb-8">
                  {/* Horizontal grid lines */}
                  <div className="absolute inset-0 flex flex-col justify-between">
                    <div className="border-t border-gray-200 w-full"></div>
                    <div className="border-t border-gray-200 w-full"></div>
                    <div className="border-t border-gray-200 w-full"></div>
                    <div className="border-t border-gray-200 w-full"></div>
                  </div>
                  
                  {/* Bar Chart with SVG */}
                  <div className="absolute inset-0 flex items-end justify-between">
                    <div className="h-full flex items-end w-full">
                      {/* November 2023 */}
                      <div className="flex-1 h-full flex flex-col justify-end items-center">
                        <div className="text-xs text-indigo-800 mb-1">65%</div>
                        <div className="w-10 bg-indigo-500 rounded-t-md" style={{ height: '65%' }}></div>
                      </div>
                      
                      {/* December 2023 */}
                      <div className="flex-1 h-full flex flex-col justify-end items-center">
                        <div className="text-xs text-indigo-800 mb-1">68%</div>
                        <div className="w-10 bg-indigo-500 rounded-t-md" style={{ height: '68%' }}></div>
                      </div>
                      
                      {/* January 2024 */}
                      <div className="flex-1 h-full flex flex-col justify-end items-center">
                        <div className="text-xs text-indigo-800 mb-1">72%</div>
                        <div className="w-10 bg-indigo-500 rounded-t-md" style={{ height: '72%' }}></div>
                      </div>
                      
                      {/* February 2024 */}
                      <div className="flex-1 h-full flex flex-col justify-end items-center">
                        <div className="text-xs text-indigo-800 mb-1">78%</div>
                        <div className="w-10 bg-indigo-500 rounded-t-md" style={{ height: '78%' }}></div>
                      </div>
                      
                      {/* March 2024 */}
                      <div className="flex-1 h-full flex flex-col justify-end items-center">
                        <div className="text-xs text-indigo-800 mb-1">75%</div>
                        <div className="w-10 bg-indigo-500 rounded-t-md" style={{ height: '75%' }}></div>
                      </div>
                      
                      {/* April 2024 */}
                      <div className="flex-1 h-full flex flex-col justify-end items-center">
                        <div className="text-xs text-indigo-800 mb-1">82%</div>
                        <div className="w-10 bg-indigo-500 rounded-t-md" style={{ height: '82%' }}></div>
                      </div>
                      
                      {/* May 2024 */}
                      <div className="flex-1 h-full flex flex-col justify-end items-center">
                        <div className="text-xs text-indigo-800 mb-1">87%</div>
                        <div className="w-10 bg-indigo-500 rounded-t-md" style={{ height: '87%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* X-axis labels - monthly */}
                <div className="absolute left-12 right-4 bottom-0 flex justify-between text-xs text-gray-500">
                  <span>Nov 23</span>
                  <span>Dec 23</span>
                  <span>Jan 24</span>
                  <span>Feb 24</span>
                  <span>Mar 24</span>
                  <span>Apr 24</span>
                  <span>May 24</span>
                </div>
              </div>
            </Card>
            
            {/* Farm Quality Scores Table */}
            <Card className="p-3 shadow-sm mt-3">
              <div className="mb-2 flex justify-between items-center">
                <h2 className="text-sm font-semibold text-indigo-950">
                  Farm Quality Scores
                </h2>
                <Select
                  defaultValue="All Farms"
                >
                  <SelectTrigger className="h-8 w-[140px] text-xs">
                    <SelectValue placeholder="Filter by region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All Farms">All Farms</SelectItem>
                    <SelectItem value="Americas">Americas</SelectItem>
                    <SelectItem value="Europe & Africa">Europe & Africa</SelectItem>
                    <SelectItem value="Asia">Asia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-gray-50">
                    <TableRow>
                      <TableHead className="text-xs">Country</TableHead>
                      <TableHead className="text-xs">Farm Name</TableHead>
                      <TableHead className="text-xs">Location</TableHead>
                      <TableHead className="text-xs">Quality Score</TableHead>
                      <TableHead className="text-xs">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {farmQualityScores.map((farm, index) => (
                      <TableRow key={index}>
                        <TableCell className="text-xs font-medium">{farm.country}</TableCell>
                        <TableCell className="text-xs">{farm.farmName}</TableCell>
                        <TableCell className="text-xs">{farm.location}</TableCell>
                        <TableCell className="text-xs">
                          <div className="flex items-center">
                            <div className="w-20 bg-gray-200 rounded-full h-1.5 mr-2">
                              <div 
                                className={`h-1.5 rounded-full ${farm.score >= 85 ? 'bg-green-500' : farm.score >= 75 ? 'bg-amber-500' : 'bg-red-500'}`}
                                style={{ width: `${farm.score}%` }}
                              ></div>
                            </div>
                            <span>{farm.score}/100</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-xs">
                          <Badge className={getStatusColor(farm.status) + " text-white"}>
                            {farm.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </div>
          
          {/* Right panel - Quality Alerts */}
          <div className="col-span-1">
            <Card className="p-3 shadow-sm h-full">
              <div className="mb-2 flex justify-between items-center">
                <h2 className="text-sm font-semibold text-indigo-950 flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-1 text-amber-500" />
                  Quality Alerts
                </h2>
                <Badge className="bg-amber-100 text-amber-800">
                  {qualityAlerts.length} Active
                </Badge>
              </div>
              
              <div className="space-y-2 overflow-y-auto max-h-[600px]">
                {qualityAlerts.map((alert) => (
                  <div key={alert.id} className="p-2 bg-white rounded-md border border-gray-200">
                    <div className="flex justify-between items-start">
                      <div className="text-xs font-medium text-indigo-900">{alert.id}</div>
                      <Badge className={`${getAlertSeverityColor(alert.severity)} text-white text-[10px]`}>
                        {alert.severity}
                      </Badge>
                    </div>
                    <div className="text-xs font-medium text-gray-700 mt-1">{alert.stage}</div>
                    <div className="text-xs text-gray-600 mt-1">{alert.issue}</div>
                    <div className="text-[10px] text-gray-500 mt-1">{alert.date}</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      );
    }
    
    // Show detailed stage view for selected stage
    const selectedStage = stageQualityData.find(s => 
      s.stage.toLowerCase().includes(activeStage.toLowerCase())
    );
    
    if (!selectedStage) return null;
    
    return (
      <Card className="p-3 shadow-sm">
        <div className="mb-4 pb-2 border-b flex items-center justify-between">
          <div className="flex items-center">
            <div className="mr-3 p-2 rounded-full bg-indigo-100 text-indigo-600">
              {selectedStage.icon}
            </div>
            <h2 className="text-lg font-medium text-gray-900">
              {selectedStage.stage}
              <Badge className={`ml-3 ${getStatusColor(selectedStage.status)} text-white`}>
                {selectedStage.status}
              </Badge>
            </h2>
          </div>
          <ChevronUp className="h-5 w-5 text-gray-400" />
        </div>
        
        <div className="space-y-6">
          {selectedStage.metrics.map((metric, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium text-gray-700">{metric.name}</h3>
                <div className="flex items-center gap-2">
                  <Badge className={`${getStatusColor(metric.status)} text-white`}>
                    {metric.status}
                  </Badge>
                  <span className="text-sm font-medium">{metric.score}/100</span>
                </div>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2.5">
                <div 
                  className={`h-2.5 rounded-full ${
                    metric.score >= 85 ? 'bg-green-500' : 
                    metric.score >= 75 ? 'bg-amber-500' : 
                    'bg-red-500'
                  }`}
                  style={{ width: `${metric.score}%` }}
                ></div>
              </div>
            </div>
          ))}
          
          <div className="flex justify-end pt-4">
            <Button variant="outline" className="text-sm flex items-center gap-2">
              <FileText className="h-4 w-4" />
              View Detailed Report
            </Button>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Compact Header */}
      <div className="px-3 py-2 bg-white shadow-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-lg font-bold text-indigo-950">
            Quality Officer:Quality Control and Standards Dashboard

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
      
      
      {/* Stage Navigation Tabs with Dropdown */}
      <div className="bg-white px-4 py-2 border-b flex items-center justify-between">
        <div className="flex gap-3">
          <Button 
            variant="ghost" 
            className={`${activeStage === 'overview' ? 'bg-indigo-100 hover:bg-indigo-200 text-indigo-800' : 'hover:bg-gray-100 text-gray-700'} flex items-center gap-2 rounded-md`}
            onClick={() => setActiveStage('overview')}
          >
            <span className={`${activeStage === 'overview' ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-600'} p-1 rounded-full`}>
              <Home className="h-4 w-4" />
            </span>
            Overview
          </Button>
          
          {/* Pre-Harvest with dropdown */}
          <div className="relative group">
            <Button 
              variant="ghost" 
              className={`${activeStage === 'pre-harvest' ? 'bg-indigo-100 hover:bg-indigo-200 text-indigo-800' : 'hover:bg-gray-100 text-gray-700'} flex items-center gap-2 rounded-md`}
              onClick={() => setActiveStage('pre-harvest')}
            >
              <span className={`${activeStage === 'pre-harvest' ? 'bg-green-600 text-white' : 'bg-green-100 text-green-700'} p-1 rounded-full`}>
                <Leaf className="h-4 w-4" />
              </span>
              Pre-Harvest
            </Button>
            <div className="absolute left-0 mt-1 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="py-1" role="menu" aria-orientation="vertical">
                {stageOrders["pre-harvest"].map((orderId) => (
                  <button
                    key={orderId}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700"
                    role="menuitem"
                    onClick={() => handleOrderSelect(orderId, 'pre-harvest')}
                  >
                    {orderId}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Harvesting with dropdown */}
          <div className="relative group">
            <Button 
              variant="ghost" 
              className={`${activeStage === 'harvesting' ? 'bg-indigo-100 hover:bg-indigo-200 text-indigo-800' : 'hover:bg-gray-100 text-gray-700'} flex items-center gap-2 rounded-md`}
              onClick={() => setActiveStage('harvesting')}
            >
              <span className={`${activeStage === 'harvesting' ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-700'} p-1 rounded-full`}>
                <Tractor className="h-4 w-4" />
              </span>
              Harvesting
            </Button>
            <div className="absolute left-0 mt-1 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="py-1" role="menu" aria-orientation="vertical">
                {stageOrders["harvesting"].map((orderId) => (
                  <button
                    key={orderId}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700"
                    role="menuitem"
                    onClick={() => handleOrderSelect(orderId, 'harvesting')}
                  >
                    {orderId}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Post-Harvest with dropdown */}
          <div className="relative group">
            <Button 
              variant="ghost" 
              className={`${activeStage === 'post-harvest' ? 'bg-indigo-100 hover:bg-indigo-200 text-indigo-800' : 'hover:bg-gray-100 text-gray-700'} flex items-center gap-2 rounded-md`}
              onClick={() => setActiveStage('post-harvest')}
            >
              <span className={`${activeStage === 'post-harvest' ? 'bg-cyan-600 text-white' : 'bg-cyan-100 text-cyan-700'} p-1 rounded-full`}>
                <ThermometerSnowflake className="h-4 w-4" />
              </span>
              Post-Harvest
            </Button>
            <div className="absolute left-0 mt-1 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="py-1" role="menu" aria-orientation="vertical">
                {stageOrders["post-harvest"].map((orderId) => (
                  <button
                    key={orderId}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700"
                    role="menuitem"
                    onClick={() => handleOrderSelect(orderId, 'post-harvest')}
                  >
                    {orderId}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Testing with dropdown */}
          <div className="relative group">
            <Button 
              variant="ghost" 
              className={`${activeStage === 'testing' ? 'bg-indigo-100 hover:bg-indigo-200 text-indigo-800' : 'hover:bg-gray-100 text-gray-700'} flex items-center gap-2 rounded-md`}
              onClick={() => setActiveStage('testing')}
            >
              <span className={`${activeStage === 'testing' ? 'bg-purple-600 text-white' : 'bg-purple-100 text-purple-700'} p-1 rounded-full`}>
                <Beaker className="h-4 w-4" />
              </span>
              Testing
            </Button>
            <div className="absolute left-0 mt-1 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="py-1" role="menu" aria-orientation="vertical">
                {stageOrders["testing"].map((orderId) => (
                  <button
                    key={orderId}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700"
                    role="menuitem"
                    onClick={() => handleOrderSelect(orderId, 'testing')}
                  >
                    {orderId}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Packaging with dropdown */}
          <div className="relative group">
            <Button 
              variant="ghost" 
              className={`${activeStage === 'packaging' ? 'bg-indigo-100 hover:bg-indigo-200 text-indigo-800' : 'hover:bg-gray-100 text-gray-700'} flex items-center gap-2 rounded-md`}
              onClick={() => setActiveStage('packaging')}
            >
              <span className={`${activeStage === 'packaging' ? 'bg-amber-600 text-white' : 'bg-amber-100 text-amber-700'} p-1 rounded-full`}>
                <PackageCheck className="h-4 w-4" />
              </span>
              Packaging
            </Button>
            <div className="absolute left-0 mt-1 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="py-1" role="menu" aria-orientation="vertical">
                {stageOrders["packaging"].map((orderId) => (
                  <button
                    key={orderId}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700"
                    role="menuitem"
                    onClick={() => handleOrderSelect(orderId, 'packaging')}
                  >
                    {orderId}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Pre-Dispatch with dropdown */}
          <div className="relative group">
            <Button 
              variant="ghost" 
              className={`${activeStage === 'pre-dispatch' ? 'bg-indigo-100 hover:bg-indigo-200 text-indigo-800' : 'hover:bg-gray-100 text-gray-700'} flex items-center gap-2 rounded-md`}
              onClick={() => setActiveStage('pre-dispatch')}
            >
              <span className={`${activeStage === 'pre-dispatch' ? 'bg-orange-600 text-white' : 'bg-orange-100 text-orange-700'} p-1 rounded-full`}>
                <Truck className="h-4 w-4" />
              </span>
              Pre-Dispatch
            </Button>
            <div className="absolute left-0 mt-1 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="py-1" role="menu" aria-orientation="vertical">
                {stageOrders["pre-dispatch"].map((orderId) => (
                  <button
                    key={orderId}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700"
                    role="menuitem"
                    onClick={() => handleOrderSelect(orderId, 'pre-dispatch')}
                  >
                    {orderId}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <Button variant="outline" className="flex items-center gap-2 bg-white">
          <FileText className="h-4 w-4" />
          View Audit Log
        </Button>
      </div>
      
      {/* Show selected order ID if any */}
      {selectedOrderId && activeStage !== 'overview' && (
        <div className="bg-indigo-50 px-4 py-2 flex items-center">
          <span className="text-sm text-indigo-700 font-medium mr-2">Selected Order:</span>
          <Badge className="bg-indigo-100 text-indigo-800">{selectedOrderId}</Badge>
          <Button 
            variant="ghost" 
            size="sm" 
            className="ml-2 h-6 text-xs text-indigo-600 hover:text-indigo-800"
            onClick={() => setSelectedOrderId(null)}
          >
            Clear
          </Button>
        </div>
      )}
      
      {/* Main Content */}
      <div className={`flex-1 p-3 bg-gray-50 overflow-auto ${selectedOrderId ? 'pt-0' : ''}`}>
        <div className="flex flex-col gap-3">
          {renderStageContent()}
        </div>
      </div>
    </div>
  );
}