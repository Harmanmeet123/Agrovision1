import Image from "next/image";
import Link from "next/link";
import { 
  LineChart, 
  BarChartBig, 
  Wallet, 
  ShieldCheck, 
  Users, 
  Microscope, 
  Building, 
  ChevronRight 
} from "lucide-react";

import { Card } from "@/components/ui/card";

export default function Home() {
  const roles = [
    {
      title: "CEO",
      description: "Executive overview and strategic insights.",
      icon: <LineChart className="h-6 w-6 text-blue-600" />,
      href: "/dashboards/ceo",
    },
    {
      title: "CFO",
      description: "Financial overview and analytics dashboard.",
      icon: <Wallet className="h-6 w-6 text-blue-600" />,
      href: "/dashboards/cfo",
    },
    {
      title: "Governance",
      description: "Compliance and regulatory dashboard.",
      icon: <ShieldCheck className="h-6 w-6 text-blue-600" />,
      href: "/dashboards/governance",
    },
    {
      title: "CRM and Sales",
      description: "Customer relationship and sales analytics.",
      icon: <Users className="h-6 w-6 text-blue-600" />,
      href: "/dashboards/crm",
    },
    {
      title: "Quality Officer",
      description: "Quality control and standards dashboard.",
      icon: <Microscope className="h-6 w-6 text-blue-600" />,
      href: "/dashboards/quality",
    },
    {
      title: "Operations Team",
      description: "Operational metrics and efficiency tracking.",
      icon: <Building className="h-6 w-6 text-blue-600" />,
      href: "/dashboards/operations",
    },
  ];

  return (
    <main className="flex h-screen flex-col overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="fixed inset-0 -z-10">
        <Image
          src="/background.png"
          alt="Blueberry Background"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
        <div className="absolute inset-0 bg-indigo-950/40" />
      </div>

      {/* Header */}
      <header className="w-full py-4 px-6 flex justify-between items-center bg-indigo-950/70 shadow-md backdrop-blur-sm">
        <div className="relative h-12 w-40">
          <Image
            src="/agnext-white-png.png"
            alt="AgNext Logo"
            fill
            sizes="160px"
            style={{ objectFit: "contain" }}
          />
        </div>
        <div className="relative h-10 w-40">
          <Image
            src="/agrovision logo.png"
            alt="Agrovision Logo"
            fill
            sizes="160px"
            style={{ objectFit: "contain" }}
          />
        </div>
      </header>

      {/* Main Content - With responsive adjustments */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-7xl w-full backdrop-blur-sm bg-white/10 rounded-xl p-4 shadow-xl">
          <div className="text-center mb-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              Welcome to Agrovision Dashboards
            </h1>
            <p className="text-base sm:text-lg text-indigo-100">
              Select your role to access your personalized dashboard.
            </p>
          </div>

          {/* Role Grid - Responsive columns */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
            {roles.map((role, index) => (
              <Link href={role.href} key={index}>
                <Card className="h-full bg-white/90 hover:bg-white transition-all duration-300 hover:shadow-lg border-0 group">
                  <div className="p-3 flex flex-col h-full">
                    <div className="flex items-center">
                      <div className="mr-2 sm:mr-3 p-1.5 sm:p-2 bg-indigo-100 rounded-full">
                        {role.icon}
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-indigo-950 truncate">
                        {role.title}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 mt-1 flex-grow line-clamp-2">{role.description}</p>
                    <div className="flex justify-end">
                      <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-700 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
