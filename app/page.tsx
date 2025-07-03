'use client';

import { useEffect } from 'react';
import { useFinanceStore } from '@/store/useFinanceStore';
import { Toaster } from '@/components/ui/sonner';
import Navbar from '@/components/Navbar';
import RevenueLineChart from '@/components/Chart/LineChart';
import ExpensePieChart from '@/components/Chart/PieChart';
import ProfitMarginBarChart from '@/components/Chart/BarChart';
import FilterComponent from '@/components/Filter';
import DataInputForm from '@/components/Form';
import DataTable from '@/components/DataTable';

export default function Home() {
  const { initializeData, isLoading, error } = useFinanceStore();

  useEffect(() => {
    initializeData();
  }, [initializeData]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-red-600">
            <p className="text-lg font-medium">Error loading data</p>
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Page Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Financial Analytics Dashboard
            </h1>
            <p className="text-lg text-gray-600">
              Comprehensive financial insights and real-time data management
            </p>
          </div>

          {/* Filters */}
          <FilterComponent />

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2">
              <RevenueLineChart />
            </div>
            <div>
              <ExpensePieChart />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ProfitMarginBarChart />
            <div className="lg:col-span-1">
              <DataTable />
            </div>
          </div>

          {/* Input Forms */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Data Management
            </h2>
            <DataInputForm />
          </div>
        </div>
      </div>

      <Toaster />
    </div>
  );
}