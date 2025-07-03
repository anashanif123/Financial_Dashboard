export interface RevenueData {
  month: string;
  revenue: number;
  year: number;
}

export interface ExpenseData {
  category: string;
  amount: number;
  color: string;
}

export interface ProfitMarginData {
  department: string;
  profitMargin: number;
  revenue: number;
  expenses: number;
}

export interface FinancialData {
  revenue: RevenueData[];
  expenses: ExpenseData[];
  profitMargins: ProfitMarginData[];
}

export interface FilterState {
  dateRange: {
    startMonth: number;
    startYear: number;
    endMonth: number;
    endYear: number;
  };
  department: string;
}

export interface FormData {
  month: string;
  year: number;
  revenue: number;
  salaries: number;
  rent: number;
  utilities: number;
  department: string;
  departmentRevenue: number;
  departmentExpenses: number;
}