import { create } from 'zustand';
import { FinancialData, FilterState, RevenueData, ExpenseData, ProfitMarginData } from '@/types/financeTypes';
import { fetchFinancialData } from '@/data/mockData';

interface FinanceStore {
  data: FinancialData;
  filteredData: FinancialData;
  filters: FilterState;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  initializeData: () => Promise<void>;
  updateRevenue: (revenue: RevenueData) => void;
  updateExpenses: (expenses: ExpenseData[]) => void;
  updateProfitMargin: (profitMargin: ProfitMarginData) => void;
  setFilters: (filters: Partial<FilterState>) => void;
  filterByDate: (startMonth: number, startYear: number, endMonth: number, endYear: number) => void;
  filterByDepartment: (department: string) => void;
  resetFilters: () => void;
}

const initialFilters: FilterState = {
  dateRange: {
    startMonth: 1,
    startYear: 2024,
    endMonth: 12,
    endYear: 2024,
  },
  department: 'All',
};

const applyFilters = (data: FinancialData, filters: FilterState): FinancialData => {
  const { dateRange, department } = filters;
  
  // Filter revenue by date range
  const filteredRevenue = data.revenue.filter(item => {
    const monthNum = new Date(Date.parse(item.month + " 1, 2024")).getMonth() + 1;
    const isInDateRange = 
      (item.year > dateRange.startYear || 
       (item.year === dateRange.startYear && monthNum >= dateRange.startMonth)) &&
      (item.year < dateRange.endYear || 
       (item.year === dateRange.endYear && monthNum <= dateRange.endMonth));
    return isInDateRange;
  });

  // Filter profit margins by department
  const filteredProfitMargins = department === 'All' 
    ? data.profitMargins 
    : data.profitMargins.filter(item => item.department === department);

  return {
    revenue: filteredRevenue,
    expenses: data.expenses, // Expenses are not filtered by date/department in this implementation
    profitMargins: filteredProfitMargins,
  };
};

export const useFinanceStore = create<FinanceStore>((set, get) => ({
  data: {
    revenue: [],
    expenses: [],
    profitMargins: [],
  },
  filteredData: {
    revenue: [],
    expenses: [],
    profitMargins: [],
  },
  filters: initialFilters,
  isLoading: false,
  error: null,

  initializeData: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await fetchFinancialData();
      const filteredData = applyFilters(data, get().filters);
      set({ data, filteredData, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to load financial data', isLoading: false });
    }
  },

  updateRevenue: (newRevenue: RevenueData) => {
    const { data, filters } = get();
    const updatedRevenue = [...data.revenue];
    const existingIndex = updatedRevenue.findIndex(
      item => item.month === newRevenue.month && item.year === newRevenue.year
    );
    
    if (existingIndex >= 0) {
      updatedRevenue[existingIndex] = newRevenue;
    } else {
      updatedRevenue.push(newRevenue);
    }
    
    const newData = { ...data, revenue: updatedRevenue };
    const filteredData = applyFilters(newData, filters);
    set({ data: newData, filteredData });
  },

  updateExpenses: (newExpenses: ExpenseData[]) => {
    const { data, filters } = get();
    const newData = { ...data, expenses: newExpenses };
    const filteredData = applyFilters(newData, filters);
    set({ data: newData, filteredData });
  },

  updateProfitMargin: (newProfitMargin: ProfitMarginData) => {
    const { data, filters } = get();
    const updatedProfitMargins = [...data.profitMargins];
    const existingIndex = updatedProfitMargins.findIndex(
      item => item.department === newProfitMargin.department
    );
    
    if (existingIndex >= 0) {
      updatedProfitMargins[existingIndex] = newProfitMargin;
    } else {
      updatedProfitMargins.push(newProfitMargin);
    }
    
    const newData = { ...data, profitMargins: updatedProfitMargins };
    const filteredData = applyFilters(newData, filters);
    set({ data: newData, filteredData });
  },

  setFilters: (newFilters: Partial<FilterState>) => {
    const { data, filters } = get();
    const updatedFilters = { ...filters, ...newFilters };
    const filteredData = applyFilters(data, updatedFilters);
    set({ filters: updatedFilters, filteredData });
  },

  filterByDate: (startMonth: number, startYear: number, endMonth: number, endYear: number) => {
    const { data, filters } = get();
    const newFilters = {
      ...filters,
      dateRange: { startMonth, startYear, endMonth, endYear },
    };
    const filteredData = applyFilters(data, newFilters);
    set({ filters: newFilters, filteredData });
  },

  filterByDepartment: (department: string) => {
    const { data, filters } = get();
    const newFilters = { ...filters, department };
    const filteredData = applyFilters(data, newFilters);
    set({ filters: newFilters, filteredData });
  },

  resetFilters: () => {
    const { data } = get();
    const filteredData = applyFilters(data, initialFilters);
    set({ filters: initialFilters, filteredData });
  },
}));