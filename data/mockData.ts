import { FinancialData } from '@/types/financeTypes';

export const mockFinancialData: FinancialData = {
  revenue: [
    { month: 'Jan', revenue: 125000, year: 2024 },
    { month: 'Feb', revenue: 132000, year: 2024 },
    { month: 'Mar', revenue: 148000, year: 2024 },
    { month: 'Apr', revenue: 156000, year: 2024 },
    { month: 'May', revenue: 165000, year: 2024 },
    { month: 'Jun', revenue: 178000, year: 2024 },
    { month: 'Jul', revenue: 145000, year: 2024 },
    { month: 'Aug', revenue: 152000, year: 2024 },
    { month: 'Sep', revenue: 168000, year: 2024 },
    { month: 'Oct', revenue: 175000, year: 2024 },
    { month: 'Nov', revenue: 182000, year: 2024 },
    { month: 'Dec', revenue: 195000, year: 2024 },
  ],
  expenses: [
    { category: 'Salaries', amount: 85000, color: '#3B82F6' },
    { category: 'Rent', amount: 15000, color: '#EF4444' },
    { category: 'Utilities', amount: 8000, color: '#10B981' },
    { category: 'Marketing', amount: 12000, color: '#F59E0B' },
    { category: 'Equipment', amount: 7000, color: '#8B5CF6' },
    { category: 'Software', amount: 5000, color: '#EC4899' },
  ],
  profitMargins: [
    { 
      department: 'Sales', 
      profitMargin: 32, 
      revenue: 450000, 
      expenses: 306000 
    },
    { 
      department: 'HR', 
      profitMargin: 18, 
      revenue: 120000, 
      expenses: 98400 
    },
    { 
      department: 'Marketing', 
      profitMargin: 25, 
      revenue: 280000, 
      expenses: 210000 
    },
    { 
      department: 'Operations', 
      profitMargin: 28, 
      revenue: 380000, 
      expenses: 273600 
    },
  ],
};

// Simulate API call with network latency
export const fetchFinancialData = async (): Promise<FinancialData> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return mockFinancialData;
};

// Simulate API call to update data
export const updateFinancialData = async (data: Partial<FinancialData>): Promise<FinancialData> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return { ...mockFinancialData, ...data };
};