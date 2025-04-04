"use client";

import { useState, useEffect } from "react";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  UserPlus,
  PieChart,
  AlertTriangle,
  Award,
  PercentCircle,
  RefreshCw,
  Settings,
  X,
  Plus,
  RotateCcw,
  Store as StoreIcon,
  ShoppingCart,
  UserMinus,
  FileText as FileContract,
  Clock,
  ShieldAlert,
  CheckCircle,
  Sprout,
  PackageCheck
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

// Define the shape of a metric
interface KpiMetric {
  value: number;
  change: number;
  trend: string;
  unit?: string;
  icon: React.ReactNode;
  color: string;
}

export default function CEODashboard() {
  const [timeRange, setTimeRange] = useState("Last 30 Days");
  const [showSettings, setShowSettings] = useState(false);
  const [activeTab, setActiveTab] = useState("metrics");
  
  // Available metrics for customization
  const allMetrics = [
    { id: "totalRevenue", name: "Total Revenue", default: true },
    { id: "roi", name: "ROI (Return on Investment)", default: true },
    { id: "marketShare", name: "Market Share", default: true },
    { id: "newCustomers", name: "New Customers", default: true },
    { id: "totalCustomers", name: "Total Customers", default: true },
    { id: "grossMargin", name: "Gross Margin", default: false },
    { id: "totalStores", name: "Total Stores", default: false },
    { id: "onlineSales", name: "Online Sales", default: false },
    { id: "churnRate", name: "Churn Rate", default: false },
    { id: "activeSupplyContracts", name: "Active Supply Contracts", default: false },
    { id: "pendingApproval", name: "Pending Approval", default: false },
    { id: "highRiskAlerts", name: "High-Risk Alerts", default: false },
    { id: "verifiedEntities", name: "Verified Entities", default: false },
    { id: "averageYield", name: "Average Yield per Hectare", default: false },
    { id: "ordersFulfilled", name: "Orders Fulfilled", default: false },
    { id: "inventoryTurnover", name: "Inventory Turnover Rate", default: false },
    { id: "averageTransitTime", name: "Average Transit Time", default: false }
  ] as const;
  
  // Available charts for customization
  const allCharts = [
    { id: "revenueByChannel", name: "Revenue Contribution by Channel (Pie Chart)", default: true },
    { id: "salesProfitOverview", name: "Sales and Profit Overview (Multi-Line Chart)", default: true },
    { id: "revenueOverTime", name: "Revenue Over Time (Line Graph)", default: false },
    { id: "revenueByBrand", name: "Revenue Distribution by Brand (Pie Chart)", default: true },
    { id: "storeDistribution", name: "Sales Distribution Across Stores (Heatmap)", default: false },
    { id: "qualityPerformance", name: "Overall Quality Performance (Bar Chart)", default: false },
    { id: "yieldPerAcre", name: "Yield Per Acre Graph (Line Chart)", default: false },
    { id: "contractLifecycle", name: "Contract Lifecycle Overview (Progress Summary)", default: false }
  ] as const;
  
  // Available tables and panels for customization
  const allTables = [
    { id: "highRiskBuyers", name: "High-Risk Buyers Table", default: true },
    { id: "topBrands", name: "Top Performing Brands List", default: false },
    { id: "bestQualityFarm", name: "Best Quality Farm (Card)", default: true },
    { id: "leastQualityFarm", name: "Least Quality Farm (Card)", default: true },
    { id: "kycStatus", name: "KYC & Verification Status Table", default: false },
    { id: "topStores", name: "Top Stores Table", default: false },
    { id: "newCustomerTable", name: "New Customer Table", default: false },
    { id: "qualityAlerts", name: "Quality Alerts Panel", default: false },
    { id: "farmQualityScores", name: "Farm Quality Scores Table", default: false },
    { id: "recentOrders", name: "Recent Orders Table", default: false }
  ] as const;
  
  // Define types based on available options
  type MetricId = typeof allMetrics[number]['id'];
  type ChartId = typeof allCharts[number]['id'];
  type TableId = typeof allTables[number]['id'];
  
  // State to track which elements are visible
  const [visibleMetrics, setVisibleMetrics] = useState<MetricId[]>(
    allMetrics.filter(m => m.default).map(m => m.id)
  );
  
  const [visibleCharts, setVisibleCharts] = useState<ChartId[]>(
    allCharts.filter(c => c.default).map(c => c.id)
  );
  
  const [visibleTables, setVisibleTables] = useState<TableId[]>(
    allTables.filter(t => t.default).map(t => t.id)
  );
  
  // Load preferences from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedMetrics = localStorage.getItem('ceo-dashboard-metrics');
        const savedCharts = localStorage.getItem('ceo-dashboard-charts');
        const savedTables = localStorage.getItem('ceo-dashboard-tables');
        
        if (savedMetrics) {
          const parsedMetrics = JSON.parse(savedMetrics);
          if (Array.isArray(parsedMetrics)) {
            setVisibleMetrics(parsedMetrics);
          }
        }
        if (savedCharts) {
          const parsedCharts = JSON.parse(savedCharts);
          if (Array.isArray(parsedCharts)) {
            setVisibleCharts(parsedCharts);
          }
        }
        if (savedTables) {
          const parsedTables = JSON.parse(savedTables);
          if (Array.isArray(parsedTables)) {
            setVisibleTables(parsedTables);
          }
        }
      } catch (error) {
        console.error("Error loading dashboard preferences:", error);
        // If there's an error, we'll just use the defaults
      }
    }
  }, []);
  
  // Save preferences when they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('ceo-dashboard-metrics', JSON.stringify(visibleMetrics));
        localStorage.setItem('ceo-dashboard-charts', JSON.stringify(visibleCharts));
        localStorage.setItem('ceo-dashboard-tables', JSON.stringify(visibleTables));
      } catch (error) {
        console.error("Error saving dashboard preferences:", error);
      }
    }
  }, [visibleMetrics, visibleCharts, visibleTables]);
  
  // Toggle visibility functions
  const toggleMetric = (metricId: MetricId): void => {
    if (visibleMetrics.includes(metricId)) {
      setVisibleMetrics(visibleMetrics.filter(id => id !== metricId));
    } else {
      setVisibleMetrics([...visibleMetrics, metricId]);
    }
  };
  
  const toggleChart = (chartId: ChartId): void => {
    if (visibleCharts.includes(chartId)) {
      setVisibleCharts(visibleCharts.filter(id => id !== chartId));
    } else {
      setVisibleCharts([...visibleCharts, chartId]);
    }
  };
  
  const toggleTable = (tableId: TableId): void => {
    if (visibleTables.includes(tableId)) {
      setVisibleTables(visibleTables.filter(id => id !== tableId));
    } else {
      setVisibleTables([...visibleTables, tableId]);
    }
  };
  
  // Reset to default functions
  const resetToDefault = () => {
    setVisibleMetrics(allMetrics.filter(m => m.default).map(m => m.id));
    setVisibleCharts(allCharts.filter(c => c.default).map(c => c.id));
    setVisibleTables(allTables.filter(t => t.default).map(t => t.id));
  };
  
  const resetMetricsToDefault = () => {
    setVisibleMetrics(allMetrics.filter(m => m.default).map(m => m.id));
  };
  
  const resetChartsToDefault = () => {
    setVisibleCharts(allCharts.filter(c => c.default).map(c => c.id));
  };
  
  const resetTablesToDefault = () => {
    setVisibleTables(allTables.filter(t => t.default).map(t => t.id));
  };
  
  // KPI metrics data with extended metrics
  const kpiMetrics: Record<MetricId, KpiMetric> = {
    totalRevenue: {
      value: 24850000,
      change: 12.7,
      trend: "up",
      unit: "USD",
      icon: <DollarSign className="h-5 w-5 text-blue-600" />,
      color: "bg-blue-100"
    },
    roi: {
      value: 18.5,
      change: 2.3,
      trend: "up",
      unit: "%",
      icon: <PercentCircle className="h-5 w-5 text-purple-600" />,
      color: "bg-purple-100"
    },
    marketShare: {
      value: 27.3,
      change: 1.7,
      trend: "up",
      unit: "%",
      icon: <PieChart className="h-5 w-5 text-indigo-600" />,
      color: "bg-indigo-100"
    },
    totalCustomers: {
      value: 532,
      change: 8.5,
      trend: "up",
      icon: <Users className="h-5 w-5 text-green-600" />,
      color: "bg-green-100"
    },
    newCustomers: {
      value: 48,
      change: 15.2,
      trend: "up",
      icon: <UserPlus className="h-5 w-5 text-amber-600" />,
      color: "bg-amber-100"
    },
    // Additional metrics for all the new options
    grossMargin: {
      value: 32.5,
      change: 1.8,
      trend: "up",
      unit: "%",
      icon: <PercentCircle className="h-5 w-5 text-emerald-600" />,
      color: "bg-emerald-100"
    },
    totalStores: {
      value: 78,
      change: 5.4,
      trend: "up",
      icon: <StoreIcon className="h-5 w-5 text-cyan-600" />,
      color: "bg-cyan-100"
    },
    onlineSales: {
      value: 3720000,
      change: 24.6,
      trend: "up",
      unit: "USD",
      icon: <ShoppingCart className="h-5 w-5 text-rose-600" />,
      color: "bg-rose-100"
    },
    churnRate: {
      value: 3.2,
      change: -0.5,
      trend: "down",
      unit: "%",
      icon: <UserMinus className="h-5 w-5 text-red-600" />,
      color: "bg-red-100"
    },
    activeSupplyContracts: {
      value: 87,
      change: 12.3,
      trend: "up",
      icon: <FileContract className="h-5 w-5 text-violet-600" />,
      color: "bg-violet-100"
    },
    pendingApproval: {
      value: 14,
      change: -8.2,
      trend: "down",
      icon: <Clock className="h-5 w-5 text-orange-600" />,
      color: "bg-orange-100"
    },
    highRiskAlerts: {
      value: 5,
      change: -2,
      trend: "down",
      icon: <ShieldAlert className="h-5 w-5 text-pink-600" />,
      color: "bg-pink-100"
    },
    verifiedEntities: {
      value: 463,
      change: 7.8,
      trend: "up",
      icon: <CheckCircle className="h-5 w-5 text-teal-600" />,
      color: "bg-teal-100"
    },
    averageYield: {
      value: 4.7,
      change: 3.3,
      trend: "up",
      unit: "tons/ha",
      icon: <Sprout className="h-5 w-5 text-lime-600" />,
      color: "bg-lime-100"
    },
    ordersFulfilled: {
      value: 246,
      change: 15.5,
      trend: "up",
      icon: <PackageCheck className="h-5 w-5 text-sky-600" />,
      color: "bg-sky-100"
    },
    inventoryTurnover: {
      value: 12.8,
      change: 1.3,
      trend: "up",
      icon: <RefreshCw className="h-5 w-5 text-amber-600" />,
      color: "bg-amber-100"
    },
    averageTransitTime: {
      value: 3.4,
      change: -0.8,
      trend: "down",
      unit: "days",
      icon: <Clock className="h-5 w-5 text-indigo-600" />,
      color: "bg-indigo-100"
    }
  };
  
  // Revenue contribution by channel data
  const revenueByChannel = [
    { channel: "Retail", value: 38 },
    { channel: "Wholesale", value: 27 },
    { channel: "Direct Sales", value: 18 },
    { channel: "B2B", value: 12 },
    { channel: "Online", value: 5 }
  ];
  
  // Revenue distribution by brand data
  const revenueByBrand = [
    { brand: "Fruitist Jumbo", value: 42 },
    { brand: "Fruitist", value: 35 },
    { brand: "Fresh Harvest", value: 15 },
    { brand: "Berry Bros", value: 8 }
  ];
  
  // High-risk buyers data
  const highRiskBuyers = [
    { 
      name: "Mega Foods Inc.", 
      paymentDelay: 32, 
      contractBreaches: 2, 
      totalValue: 1450000, 
      riskLevel: "Critical" 
    },
    { 
      name: "Global Groceries", 
      paymentDelay: 25, 
      contractBreaches: 1, 
      totalValue: 980000, 
      riskLevel: "High" 
    },
    { 
      name: "Fresh Mart Chain", 
      paymentDelay: 18, 
      contractBreaches: 1, 
      totalValue: 1250000, 
      riskLevel: "Medium" 
    },
    { 
      name: "Organic Stores Ltd", 
      paymentDelay: 15, 
      contractBreaches: 0, 
      totalValue: 750000, 
      riskLevel: "Medium" 
    },
    { 
      name: "Deluxe Markets", 
      paymentDelay: 12, 
      contractBreaches: 0, 
      totalValue: 890000, 
      riskLevel: "Low" 
    }
  ];
  
  // Farm quality data
  const farmQualityMetrics = {
    best: {
      name: "Washington Valley Farm",
      qualityScore: 98.7,
      defectRate: 0.3,
      yield: 5.2
    },
    worst: {
      name: "Dr Zmel Farm",
      qualityScore: 76.4,
      defectRate: 5.8,
      yield: 3.8
    }
  };
  
  // Function to format currency
  const formatCurrency = (value: number): string => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}K`;
    }
    return `$${value.toFixed(2)}`;
  };
  
  // Function to get risk level badge color
  const getRiskColor = (riskLevel: string): string => {
    switch(riskLevel) {
      case "Critical": return "bg-red-100 text-red-800";
      case "High": return "bg-orange-100 text-orange-800";
      case "Medium": return "bg-amber-100 text-amber-800";
      case "Low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <div className="border-b border-gray-200 bg-indigo-950 px-6 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-white">CEO Dashboard</h1>
          </div>

          <div className="flex items-center space-x-2">
            <Select
              value={timeRange}
              onValueChange={setTimeRange}
            >
              <SelectTrigger className="h-9 w-[180px] bg-white border-none text-gray-900 text-sm">
                <SelectValue placeholder="Select Time Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Last 30 Days">Last 30 Days</SelectItem>
                <SelectItem value="Last Quarter">Last Quarter</SelectItem>
                <SelectItem value="Year to Date">Year to Date</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="sm" className="bg-white border-none hover:bg-gray-100 text-gray-900">
              <RefreshCw className="h-4 w-4 mr-1" />
              Refresh
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="bg-white border-none hover:bg-gray-100 text-gray-900"
              onClick={() => setShowSettings(!showSettings)}
            >
              <Settings className="h-4 w-4 mr-1" />
              Customize
            </Button>
          </div>
        </div>
      </div>

      {/* Settings Panel - Enhanced with categories */}
      {showSettings && (
        <div className="bg-white border-b border-gray-200 p-5 shadow-md">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-xl font-semibold text-indigo-950">Customize Dashboard</h2>
            <div className="flex space-x-3">
              <Button 
                variant="outline" 
                size="sm"
                onClick={resetToDefault}
                className="flex items-center"
              >
                <RotateCcw className="h-4 w-4 mr-1" />
                Reset All
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowSettings(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          {/* Tab Navigation for Categories */}
          <div className="mb-6">
            <div className="flex space-x-1 p-1 bg-gray-100 rounded-lg">
              <button
                onClick={() => setActiveTab("metrics")}
                className={`py-2 px-4 rounded-md flex-1 font-medium text-sm flex justify-center items-center ${activeTab === "metrics" 
                  ? "bg-white shadow-sm text-indigo-600" 
                  : "text-gray-600 hover:bg-gray-50"}`}
              >
                📊 Metrics
              </button>
              <button
                onClick={() => setActiveTab("charts")}
                className={`py-2 px-4 rounded-md flex-1 font-medium text-sm flex justify-center items-center ${activeTab === "charts" 
                  ? "bg-white shadow-sm text-indigo-600" 
                  : "text-gray-600 hover:bg-gray-50"}`}
              >
                📈 Charts & Graphs
              </button>
              <button
                onClick={() => setActiveTab("tables")}
                className={`py-2 px-4 rounded-md flex-1 font-medium text-sm flex justify-center items-center ${activeTab === "tables" 
                  ? "bg-white shadow-sm text-indigo-600" 
                  : "text-gray-600 hover:bg-gray-50"}`}
              >
                📋 Tables & Panels
              </button>
            </div>
          </div>
          
          {/* Tab Content */}
          {activeTab === "metrics" && (
            <>
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-base font-semibold text-gray-800">📊 Metrics</h3>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={resetMetricsToDefault}
                  className="text-xs h-7"
                >
                  Reset Metrics
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-h-[400px] overflow-y-auto pr-1">
                {allMetrics.map((metric) => (
                  <div 
                    key={metric.id} 
                    className={`flex items-center p-3 border rounded-md cursor-pointer transition-all ${
                      visibleMetrics.includes(metric.id as MetricId) 
                        ? 'border-indigo-300 bg-indigo-50 shadow-sm' 
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                    onClick={() => toggleMetric(metric.id as MetricId)}
                  >
                    <div className={`w-5 h-5 mr-2 flex items-center justify-center rounded-sm ${
                      visibleMetrics.includes(metric.id as MetricId) ? 'bg-indigo-600 text-white' : 'bg-gray-200'
                    }`}>
                      {visibleMetrics.includes(metric.id as MetricId) ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <Plus className="h-3 w-3" />
                      )}
                    </div>
                    <span className="text-sm font-medium">{metric.name}</span>
                  </div>
                ))}
              </div>
            </>
          )}
          
          {activeTab === "charts" && (
            <>
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-base font-semibold text-gray-800">📈 Charts & Graphs</h3>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={resetChartsToDefault}
                  className="text-xs h-7"
                >
                  Reset Charts
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[400px] overflow-y-auto pr-1">
                {allCharts.map((chart) => (
                  <div 
                    key={chart.id} 
                    className={`flex items-center p-3 border rounded-md cursor-pointer transition-all ${
                      visibleCharts.includes(chart.id as ChartId) 
                        ? 'border-indigo-300 bg-indigo-50 shadow-sm' 
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                    onClick={() => toggleChart(chart.id as ChartId)}
                  >
                    <div className={`w-5 h-5 mr-2 flex items-center justify-center rounded-sm ${
                      visibleCharts.includes(chart.id as ChartId) ? 'bg-indigo-600 text-white' : 'bg-gray-200'
                    }`}>
                      {visibleCharts.includes(chart.id as ChartId) ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <Plus className="h-3 w-3" />
                      )}
                    </div>
                    <span className="text-sm font-medium">{chart.name}</span>
                  </div>
                ))}
              </div>
            </>
          )}
          
          {activeTab === "tables" && (
            <>
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-base font-semibold text-gray-800">📋 Tables & Panels</h3>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={resetTablesToDefault}
                  className="text-xs h-7"
                >
                  Reset Tables
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[400px] overflow-y-auto pr-1">
                {allTables.map((table) => (
                  <div 
                    key={table.id} 
                    className={`flex items-center p-3 border rounded-md cursor-pointer transition-all ${
                      visibleTables.includes(table.id as TableId) 
                        ? 'border-indigo-300 bg-indigo-50 shadow-sm' 
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                    onClick={() => toggleTable(table.id as TableId)}
                  >
                    <div className={`w-5 h-5 mr-2 flex items-center justify-center rounded-sm ${
                      visibleTables.includes(table.id as TableId) ? 'bg-indigo-600 text-white' : 'bg-gray-200'
                    }`}>
                      {visibleTables.includes(table.id as TableId) ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <Plus className="h-3 w-3" />
                      )}
                    </div>
                    <span className="text-sm font-medium">{table.name}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* Main Content */}
      <div className="p-6">
        {/* KPI Overview Section - Dynamic based on visible metrics */}
        <div className={`grid grid-cols-1 ${
          visibleMetrics.length > 4 
            ? 'md:grid-cols-3 lg:grid-cols-5' 
            : visibleMetrics.length > 2 
              ? 'md:grid-cols-2 lg:grid-cols-4' 
              : 'md:grid-cols-2'
        } gap-4 mb-6`}>
          {visibleMetrics.map(metricId => {
            const metric = kpiMetrics[metricId];
            if (!metric) return null;
            
            return (
              <Card 
                key={metricId} 
                className={`hover:shadow-md transition-shadow duration-300 bg-gradient-to-r from-${metric.color.split('-')[1]}-50 to-white`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs font-medium text-gray-500">
                        {allMetrics.find(m => m.id === metricId)?.name || metricId}
                      </p>
                      <div className="flex items-baseline mt-1">
                        <h3 className="text-2xl font-bold text-indigo-950">
                          {metricId === 'totalRevenue' || metricId === 'onlineSales' 
                            ? formatCurrency(metric.value)
                            : metric.value
                          }
                        </h3>
                        {metric.unit && (
                          <span className="ml-1 text-sm text-gray-500">{metric.unit}</span>
                        )}
                      </div>
                      <div className="flex items-center mt-1">
                        <Badge className={`px-1.5 py-0.5 text-xs ${
                          (metric.trend === "up" && metricId !== 'churnRate') || (metric.trend === "down" && metricId === 'churnRate')
                            ? "bg-green-100 text-green-800" 
                            : "bg-red-100 text-red-800"
                        }`}>
                          {metric.trend === "up" ? 
                            <TrendingUp className="h-3 w-3 mr-0.5" /> : 
                            <TrendingDown className="h-3 w-3 mr-0.5" />
                          }
                          {Math.abs(metric.change)}%
                        </Badge>
                        <span className="ml-1.5 text-xs text-gray-500">vs. last period</span>
                      </div>
                    </div>
                    <div className={`p-2 rounded-full ${metric.color}`}>
                      {metric.icon}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
          
          {/* Empty State - if no metrics are selected */}
          {visibleMetrics.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
              <PieChart className="h-10 w-10 text-gray-400 mb-3" />
              <h3 className="text-base font-medium text-gray-700">No metrics selected</h3>
              <p className="text-sm text-gray-500 text-center mt-1">Click the Customize button to add metrics to your dashboard.</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => setShowSettings(true)}
              >
                <Settings className="h-4 w-4 mr-1" />
                Customize Dashboard
              </Button>
            </div>
          )}
        </div>

        {/* Charts and Tables Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Revenue by Channel Pie Chart */}
          <Card>
            <CardHeader className="border-b border-gray-200 p-4">
              <CardTitle className="text-lg text-indigo-950">Revenue Contribution by Channel</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex justify-center items-center h-[300px] relative">
                {/* Simplified Pie Chart Representation */}
                <div className="w-[200px] h-[200px] relative">
                  {/* Pie Slices - using conic-gradient to represent data */}
                  <div 
                    className="w-full h-full rounded-full"
                    style={{ 
                      background: `conic-gradient(
                        #4f46e5 0% ${revenueByChannel[0].value}%, 
                        #06b6d4 ${revenueByChannel[0].value}% ${revenueByChannel[0].value + revenueByChannel[1].value}%, 
                        #10b981 ${revenueByChannel[0].value + revenueByChannel[1].value}% ${revenueByChannel[0].value + revenueByChannel[1].value + revenueByChannel[2].value}%, 
                        #f59e0b ${revenueByChannel[0].value + revenueByChannel[1].value + revenueByChannel[2].value}% ${revenueByChannel[0].value + revenueByChannel[1].value + revenueByChannel[2].value + revenueByChannel[3].value}%,
                        #ec4899 ${revenueByChannel[0].value + revenueByChannel[1].value + revenueByChannel[2].value + revenueByChannel[3].value}% 100%
                      )`
                    }}
                  >
                  </div>
                  {/* Center white circle to create donut effect */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120px] h-[120px] bg-white rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-500">{timeRange}</span>
                  </div>
                </div>

                {/* Legend */}
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 flex flex-col space-y-2">
                  {revenueByChannel.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-sm" 
                        style={{ 
                          backgroundColor: 
                            index === 0 ? '#4f46e5' : 
                            index === 1 ? '#06b6d4' : 
                            index === 2 ? '#10b981' : 
                            index === 3 ? '#f59e0b' : '#ec4899'
                        }}
                      ></div>
                      <span className="text-xs text-gray-600">{item.channel}: {item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Revenue by Brand Pie Chart */}
          <Card>
            <CardHeader className="border-b border-gray-200 p-4">
              <CardTitle className="text-lg text-indigo-950">Revenue Distribution by Brand</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex justify-center items-center h-[300px] relative">
                {/* Simplified Pie Chart Representation */}
                <div className="w-[200px] h-[200px] relative">
                  {/* Pie Slices - using conic-gradient to represent data */}
                  <div 
                    className="w-full h-full rounded-full"
                    style={{ 
                      background: `conic-gradient(
                        #3b82f6 0% ${revenueByBrand[0].value}%, 
                        #8b5cf6 ${revenueByBrand[0].value}% ${revenueByBrand[0].value + revenueByBrand[1].value}%, 
                        #14b8a6 ${revenueByBrand[0].value + revenueByBrand[1].value}% ${revenueByBrand[0].value + revenueByBrand[1].value + revenueByBrand[2].value}%,
                        #f97316 ${revenueByBrand[0].value + revenueByBrand[1].value + revenueByBrand[2].value}% 100%
                      )`
                    }}
                  >
                  </div>
                  {/* Center white circle to create donut effect */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120px] h-[120px] bg-white rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-500">{timeRange}</span>
                  </div>
                </div>

                {/* Legend */}
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 flex flex-col space-y-2">
                  {revenueByBrand.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-sm" 
                        style={{ 
                          backgroundColor: 
                            index === 0 ? '#3b82f6' : 
                            index === 1 ? '#8b5cf6' : 
                            index === 2 ? '#14b8a6' : '#f97316'
                        }}
                      ></div>
                      <span className="text-xs text-gray-600">{item.brand}: {item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* High-Risk Buyers and Farm Quality Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* High-Risk Buyers Table */}
          <Card>
            <CardHeader className="border-b border-gray-200 p-4">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg text-indigo-950 flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2 text-red-500" />
                  High-Risk Buyers
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-gray-50">
                  <TableRow className="hover:bg-gray-100 border-gray-200">
                    <TableHead className="text-xs">Buyer Name</TableHead>
                    <TableHead className="text-xs">Payment Delay (Days)</TableHead>
                    <TableHead className="text-xs">Contract Breaches</TableHead>
                    <TableHead className="text-xs">Total Value</TableHead>
                    <TableHead className="text-xs">Risk Level</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {highRiskBuyers.map((buyer, index) => (
                    <TableRow key={index} className="hover:bg-gray-100 border-gray-200">
                      <TableCell className="font-medium">{buyer.name}</TableCell>
                      <TableCell>{buyer.paymentDelay}</TableCell>
                      <TableCell>{buyer.contractBreaches}</TableCell>
                      <TableCell>{formatCurrency(buyer.totalValue)}</TableCell>
                      <TableCell>
                        <Badge className={getRiskColor(buyer.riskLevel)}>
                          {buyer.riskLevel}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Farm Quality Metrics */}
          <Card>
            <CardHeader className="border-b border-gray-200 p-4">
              <CardTitle className="text-lg text-indigo-950">Best & Least Quality Farms</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Best Farm */}
                <div className="bg-gradient-to-r from-green-50 to-white p-4 rounded-md border border-green-100">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-700 flex items-center">
                        <Award className="h-4 w-4 mr-1 text-green-600" />
                        Best Performing Farm
                      </h3>
                      <p className="text-base font-bold text-indigo-950 mt-1">{farmQualityMetrics.best.name}</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Top Quality</Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">Quality Score:</span>
                      <span className="text-xs font-medium text-green-700">{farmQualityMetrics.best.qualityScore}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">Defect Rate:</span>
                      <span className="text-xs font-medium text-green-700">{farmQualityMetrics.best.defectRate}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">Yield (tons/ha):</span>
                      <span className="text-xs font-medium text-green-700">{farmQualityMetrics.best.yield}</span>
                    </div>
                  </div>
                </div>
                
                {/* Worst Farm */}
                <div className="bg-gradient-to-r from-red-50 to-white p-4 rounded-md border border-red-100">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-700 flex items-center">
                        <AlertTriangle className="h-4 w-4 mr-1 text-red-600" />
                        Lowest Performing Farm
                      </h3>
                      <p className="text-base font-bold text-indigo-950 mt-1">{farmQualityMetrics.worst.name}</p>
                    </div>
                    <Badge className="bg-red-100 text-red-800">Needs Improvement</Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">Quality Score:</span>
                      <span className="text-xs font-medium text-red-700">{farmQualityMetrics.worst.qualityScore}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">Defect Rate:</span>
                      <span className="text-xs font-medium text-red-700">{farmQualityMetrics.worst.defectRate}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">Yield (tons/ha):</span>
                      <span className="text-xs font-medium text-red-700">{farmQualityMetrics.worst.yield}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 