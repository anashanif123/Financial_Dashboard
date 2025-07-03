'use client';

import { useState } from 'react';
import { useFinanceStore } from '@/store/useFinanceStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Save } from 'lucide-react';
import { toast } from 'sonner';

const DataInputForm = () => {
  const { updateRevenue, updateExpenses, updateProfitMargin, data } = useFinanceStore();
  const [formData, setFormData] = useState({
    month: '',
    year: 2024,
    revenue: '',
    salaries: '',
    rent: '',
    utilities: '',
    marketing: '',
    equipment: '',
    software: '',
    department: '',
    departmentRevenue: '',
    departmentExpenses: '',
  });

  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const departments = ['Sales', 'HR', 'Marketing', 'Operations'];

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmitRevenue = () => {
    if (!formData.month || !formData.revenue) {
      toast.error('Please fill in month and revenue');
      return;
    }

    updateRevenue({
      month: formData.month,
      year: formData.year,
      revenue: parseFloat(formData.revenue),
    });

    toast.success('Revenue updated successfully!');
    setFormData(prev => ({ ...prev, month: '', revenue: '' }));
  };

  const handleSubmitExpenses = () => {
    const { salaries, rent, utilities, marketing, equipment, software } = formData;
    
    if (!salaries || !rent || !utilities || !marketing || !equipment || !software) {
      toast.error('Please fill in all expense fields');
      return;
    }

    const newExpenses = [
      { category: 'Salaries', amount: parseFloat(salaries), color: '#3B82F6' },
      { category: 'Rent', amount: parseFloat(rent), color: '#EF4444' },
      { category: 'Utilities', amount: parseFloat(utilities), color: '#10B981' },
      { category: 'Marketing', amount: parseFloat(marketing), color: '#F59E0B' },
      { category: 'Equipment', amount: parseFloat(equipment), color: '#8B5CF6' },
      { category: 'Software', amount: parseFloat(software), color: '#EC4899' },
    ];

    updateExpenses(newExpenses);
    toast.success('Expenses updated successfully!');
    setFormData(prev => ({ 
      ...prev, 
      salaries: '', 
      rent: '', 
      utilities: '', 
      marketing: '', 
      equipment: '', 
      software: '' 
    }));
  };

  const handleSubmitProfitMargin = () => {
    const { department, departmentRevenue, departmentExpenses } = formData;
    
    if (!department || !departmentRevenue || !departmentExpenses) {
      toast.error('Please fill in all department fields');
      return;
    }

    const revenue = parseFloat(departmentRevenue);
    const expenses = parseFloat(departmentExpenses);
    const profitMargin = ((revenue - expenses) / revenue) * 100;

    updateProfitMargin({
      department,
      revenue,
      expenses,
      profitMargin,
    });

    toast.success('Profit margin updated successfully!');
    setFormData(prev => ({ 
      ...prev, 
      department: '', 
      departmentRevenue: '', 
      departmentExpenses: '' 
    }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Revenue Form */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add Revenue
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="month">Month</Label>
              <Select 
                value={formData.month} 
                onValueChange={(value) => handleInputChange('month', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select month" />
                </SelectTrigger>
                <SelectContent>
                  {months.map(month => (
                    <SelectItem key={month} value={month}>{month}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="year">Year</Label>
              <Input
                id="year"
                type="number"
                value={formData.year}
                onChange={(e) => handleInputChange('year', parseInt(e.target.value))}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="revenue">Revenue ($)</Label>
            <Input
              id="revenue"
              type="number"
              value={formData.revenue}
              onChange={(e) => handleInputChange('revenue', e.target.value)}
              placeholder="Enter revenue amount"
            />
          </div>
          <Button onClick={handleSubmitRevenue} className="w-full">
            <Save className="w-4 h-4 mr-2" />
            Update Revenue
          </Button>
        </CardContent>
      </Card>

      {/* Expenses Form */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Update Expenses
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="salaries">Salaries ($)</Label>
            <Input
              id="salaries"
              type="number"
              value={formData.salaries}
              onChange={(e) => handleInputChange('salaries', e.target.value)}
              placeholder="Enter salaries"
            />
          </div>
          <div>
            <Label htmlFor="rent">Rent ($)</Label>
            <Input
              id="rent"
              type="number"
              value={formData.rent}
              onChange={(e) => handleInputChange('rent', e.target.value)}
              placeholder="Enter rent"
            />
          </div>
          <div>
            <Label htmlFor="utilities">Utilities ($)</Label>
            <Input
              id="utilities"
              type="number"
              value={formData.utilities}
              onChange={(e) => handleInputChange('utilities', e.target.value)}
              placeholder="Enter utilities"
            />
          </div>
          <div>
            <Label htmlFor="marketing">Marketing ($)</Label>
            <Input
              id="marketing"
              type="number"
              value={formData.marketing}
              onChange={(e) => handleInputChange('marketing', e.target.value)}
              placeholder="Enter marketing"
            />
          </div>
          <div>
            <Label htmlFor="equipment">Equipment ($)</Label>
            <Input
              id="equipment"
              type="number"
              value={formData.equipment}
              onChange={(e) => handleInputChange('equipment', e.target.value)}
              placeholder="Enter equipment"
            />
          </div>
          <div>
            <Label htmlFor="software">Software ($)</Label>
            <Input
              id="software"
              type="number"
              value={formData.software}
              onChange={(e) => handleInputChange('software', e.target.value)}
              placeholder="Enter software"
            />
          </div>
          <Button onClick={handleSubmitExpenses} className="w-full">
            <Save className="w-4 h-4 mr-2" />
            Update Expenses
          </Button>
        </CardContent>
      </Card>

      {/* Profit Margin Form */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Update Department
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="department">Department</Label>
            <Select 
              value={formData.department} 
              onValueChange={(value) => handleInputChange('department', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map(dept => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="departmentRevenue">Department Revenue ($)</Label>
            <Input
              id="departmentRevenue"
              type="number"
              value={formData.departmentRevenue}
              onChange={(e) => handleInputChange('departmentRevenue', e.target.value)}
              placeholder="Enter department revenue"
            />
          </div>
          <div>
            <Label htmlFor="departmentExpenses">Department Expenses ($)</Label>
            <Input
              id="departmentExpenses"
              type="number"
              value={formData.departmentExpenses}
              onChange={(e) => handleInputChange('departmentExpenses', e.target.value)}
              placeholder="Enter department expenses"
            />
          </div>
          <Button onClick={handleSubmitProfitMargin} className="w-full">
            <Save className="w-4 h-4 mr-2" />
            Update Department
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataInputForm;