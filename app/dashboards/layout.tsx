"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Home, Menu, X } from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="w-full py-3 px-6 flex justify-between items-center bg-indigo-950 shadow-md sticky top-0 z-50">
        <div className="flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 mr-4 rounded-full hover:bg-indigo-900 transition-colors md:hidden"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-white" />
            ) : (
              <Menu className="h-6 w-6 text-white" />
            )}
          </button>

          <div className="relative h-10 w-32">
            <Image
              src="/agnext-white-png.png"
              alt="AgNext Logo"
              fill
              sizes="128px"
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>

        <div className="flex items-center">
          <Link 
            href="/"
            className="p-2 mr-4 rounded-full hover:bg-indigo-900 transition-colors flex items-center"
          >
            <Home className="h-5 w-5 text-white" />
            <span className="ml-2 text-white hidden md:inline">Home</span>
          </Link>
          <div className="relative h-8 w-32">
            <Image
              src="/agrovision logo.png"
              alt="Agrovision Logo"
              fill
              sizes="128px"
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-indigo-950 z-40 transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:hidden`}
        style={{ top: "60px", height: "calc(100vh - 60px)" }}
      >
        <div className="p-6 space-y-4">
          <Link
            href="/"
            className="block py-2 px-4 text-white hover:bg-indigo-900 rounded-md"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/dashboards/ceo"
            className="block py-2 px-4 text-white hover:bg-indigo-900 rounded-md"
            onClick={() => setIsMenuOpen(false)}
          >
            CEO Dashboard
          </Link>
          <Link
            href="/dashboards/cfo"
            className="block py-2 px-4 text-white hover:bg-indigo-900 rounded-md"
            onClick={() => setIsMenuOpen(false)}
          >
            CFO Dashboard
          </Link>
          <Link
            href="/dashboards/governance"
            className="block py-2 px-4 text-white hover:bg-indigo-900 rounded-md"
            onClick={() => setIsMenuOpen(false)}
          >
            Governance Dashboard
          </Link>
          <Link
            href="/dashboards/crm-sales"
            className="block py-2 px-4 text-white hover:bg-indigo-900 rounded-md"
            onClick={() => setIsMenuOpen(false)}
          >
            CRM & Sales Dashboard
          </Link>
          <Link
            href="/dashboards/quality"
            className="block py-2 px-4 text-white hover:bg-indigo-900 rounded-md"
            onClick={() => setIsMenuOpen(false)}
          >
            Quality Dashboard
          </Link>
          <Link
            href="/dashboards/operations"
            className="block py-2 px-4 text-white hover:bg-indigo-900 rounded-md"
            onClick={() => setIsMenuOpen(false)}
          >
            Operations Dashboard
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50">
        {children}
      </main>
    </div>
  );
} 