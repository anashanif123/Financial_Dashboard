# Financial Analytics Dashboard

A comprehensive financial analytics dashboard built with modern web technologies, featuring real-time data visualization, interactive charts, and dynamic filtering capabilities.

## 🚀 Live Demo

[View Live Dashboard](https://your-deployment-url.netlify.app)

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Charts**: Recharts
- **UI Components**: shadcn/ui
- **Icons**: Lucide React

## 📋 Features

### Core Functionality
- **Mock API Simulation**: Realistic financial data with network latency simulation
- **Global State Management**: Zustand store for seamless data management
- **Interactive Charts**: Line charts for revenue trends, pie charts for expense distribution, bar charts for profit margins
- **Real-time Filtering**: Date range and department-based filtering with instant updates
- **Data Input Forms**: Add/update revenue, expenses, and profit margins with live chart updates
- **Sortable Data Table**: Comprehensive financial data with search and sort capabilities
- **Responsive Design**: Mobile-first approach with perfect adaptation across all devices

### Data Management
- **Revenue Tracking**: Monthly revenue trends over time
- **Expense Analysis**: Detailed breakdown of company expenses
- **Profit Margin Analysis**: Department-wise performance metrics
- **Real-time Updates**: Instant chart and table updates when data changes

## 📁 Project Structure

```
/app
  layout.tsx          # Root layout with metadata
  page.tsx           # Main dashboard page
/components
  Navbar.tsx         # Top navigation bar
  /Chart
    LineChart.tsx    # Revenue trend line chart
    PieChart.tsx     # Expense distribution pie chart
    BarChart.tsx     # Profit margin bar chart
  Filter.tsx         # Date range and department filters
  Form.tsx           # Data input forms
  DataTable.tsx      # Financial data table
/data
  mockData.ts        # Mock API and financial data
/store
  useFinanceStore.ts # Zustand global state management
/types
  financeTypes.ts    # TypeScript type definitions
/utils
  format.ts          # Currency and date formatting utilities
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone [your-repo-url]
   cd financial-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

### Building for Production

```bash
npm run build
npm run start
```

## 💡 Key Features Explained

### State Management
The dashboard uses Zustand for global state management, providing:
- Centralized data store
- Automatic UI updates when data changes
- Efficient filtering and sorting
- Async data loading with proper error handling

### Charts and Visualizations
- **Revenue Line Chart**: Shows monthly revenue trends with interactive tooltips
- **Expense Pie Chart**: Visualizes expense distribution by category
- **Profit Margin Bar Chart**: Compares department performance

### Filtering System
- **Date Range**: Filter data by month/year ranges
- **Department**: Filter by specific departments or view all
- **Real-time Updates**: Charts and tables update instantly when filters change

### Data Input
- **Revenue Form**: Add/update monthly revenue data
- **Expense Form**: Update expense breakdowns by category
- **Department Form**: Modify department-specific financial data

## 🔧 API Integration Ready

The dashboard is designed for easy API integration:
- Mock data functions simulate real API calls
- Async/await patterns throughout
- Error handling and loading states
- Simply replace mock functions with real API endpoints

## 📱 Responsive Design

- **Mobile-first**: Optimized for mobile devices
- **Tablet-friendly**: Adapted layouts for medium screens
- **Desktop**: Full-featured layout for large screens
- **Touch-friendly**: All interactive elements work on touch devices

## 🎨 Design Philosophy

- **Clean and Professional**: Modern financial dashboard aesthetics
- **Intuitive Navigation**: Easy-to-use interface with clear visual hierarchy
- **Consistent Styling**: Uniform design language throughout
- **Accessibility**: Proper contrast ratios and keyboard navigation support

## 🔄 Future Enhancements

- Real-time data synchronization
- Export functionality (PDF, CSV)
- Advanced analytics and forecasting
- Multi-currency support
- Team collaboration features
- Custom dashboard layouts

## 📄 License

This project is licensed under the MuhammadAnas License.