'use client';

import { useState, useMemo } from 'react';
import { useFinanceStore } from '@/store/useFinanceStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowUpDown, ArrowUp, ArrowDown, Search } from 'lucide-react';
import { formatCurrency, formatPercent } from '@/utils/format';

type SortField = 'department' | 'revenue' | 'expenses' | 'profitMargin';
type SortDirection = 'asc' | 'desc';

const DataTable = () => {
  const { filteredData } = useFinanceStore();
  const [sortField, setSortField] = useState<SortField>('department');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [searchTerm, setSearchTerm] = useState('');

  const sortedAndFilteredData = useMemo(() => {
    let data = [...filteredData.profitMargins];

    // Apply search filter
    if (searchTerm) {
      data = data.filter(item =>
        item.department.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply sorting
    data.sort((a, b) => {
      let aValue: string | number = a[sortField];
      let bValue: string | number = b[sortField];

      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = (bValue as string).toLowerCase();
      }

      if (sortDirection === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    return data;
  }, [filteredData.profitMargins, searchTerm, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="w-4 h-4" />;
    }
    return sortDirection === 'asc' ? 
      <ArrowUp className="w-4 h-4" /> : 
      <ArrowDown className="w-4 h-4" />;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">
          Financial Data Table
        </CardTitle>
        <div className="flex items-center space-x-2 mt-4">
          <Search className="w-4 h-4 text-gray-500" />
          <Input
            placeholder="Search departments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort('department')}
                    className="flex items-center space-x-1 p-0 h-auto font-medium"
                  >
                    <span>Department</span>
                    {getSortIcon('department')}
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort('revenue')}
                    className="flex items-center space-x-1 p-0 h-auto font-medium"
                  >
                    <span>Revenue</span>
                    {getSortIcon('revenue')}
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort('expenses')}
                    className="flex items-center space-x-1 p-0 h-auto font-medium"
                  >
                    <span>Expenses</span>
                    {getSortIcon('expenses')}
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort('profitMargin')}
                    className="flex items-center space-x-1 p-0 h-auto font-medium"
                  >
                    <span>Profit Margin</span>
                    {getSortIcon('profitMargin')}
                  </Button>
                </TableHead>
                <TableHead>Profit Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedAndFilteredData.map((item) => (
                <TableRow key={item.department}>
                  <TableCell className="font-medium">{item.department}</TableCell>
                  <TableCell>{formatCurrency(item.revenue)}</TableCell>
                  <TableCell>{formatCurrency(item.expenses)}</TableCell>
                  <TableCell>
                    <span className={`font-medium ${
                      item.profitMargin > 25 ? 'text-green-600' : 
                      item.profitMargin > 15 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {formatPercent(item.profitMargin)}
                    </span>
                  </TableCell>
                  <TableCell className="font-medium text-green-600">
                    {formatCurrency(item.revenue - item.expenses)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {sortedAndFilteredData.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No data found matching your search criteria.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DataTable;