import { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Calendar,
  Sprout,
  DollarSign,
  TrendingUp,
  FileText
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  ReferenceLine
} from 'recharts';
import api from '../services/api';
import toast from 'react-hot-toast';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const Reports = () => {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState({
    totalCrops: 0,
    totalIncome: 0,
    totalExpenses: 0,
    totalProfit: 0,
    monthlyExpense: 0,
    monthlyIncome: 0
  });
  const [crops, setCrops] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    fetchData();
  }, [selectedYear]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [summaryRes, cropsRes, expensesRes] = await Promise.all([
        api.get('/dashboard/summary'),
        api.get('/crop/all'),
        api.get(`/expense/date?from=${selectedYear}-01-01&to=${selectedYear}-12-31`)
      ]);

      setSummary(summaryRes.data);
      setCrops(cropsRes.data);
      setExpenses(expensesRes.data);
    } catch (error) {
      console.error('Failed to fetch report data:', error);
      toast.error('Failed to fetch report data');
    } finally {
      setLoading(false);
    }
  };

  // FIXED: Crop profit data with proper formatting for losses
  const cropProfitData = crops.map(crop => ({
    name: crop.cropName || 'Unknown',
    income: crop.income || 0,
    expenses: crop.totalExpenses || 0,
    profit: crop.profit || 0
  }));

  const monthlyData = [
    { month: 'Jan', income: 45000, expense: 32000 },
    { month: 'Feb', income: 52000, expense: 28000 },
    { month: 'Mar', income: 48000, expense: 35000 },
    { month: 'Apr', income: 61000, expense: 42000 },
    { month: 'May', income: 58000, expense: 38000 },
    { month: 'Jun', income: 63000, expense: 45000 },
    { month: 'Jul', income: 59000, expense: 41000 },
    { month: 'Aug', income: 67000, expense: 48000 },
    { month: 'Sep', income: 72000, expense: 51000 },
    { month: 'Oct', income: 68000, expense: 47000 },
    { month: 'Nov', income: 55000, expense: 39000 },
    { month: 'Dec', income: 60000, expense: 43000 }
  ];

  const expenseByType = expenses.reduce((acc, expense) => {
    const type = expense.type || 'Other';
    acc[type] = (acc[type] || 0) + (expense.amount || 0);
    return acc;
  }, {});

  const expenseTypeData = Object.entries(expenseByType).map(([name, value]) => ({
    name,
    value
  }));

  const COLORS = ['#2E7D32', '#FF8F00', '#0277BD', '#C62828', '#6A1B9A', '#2C3E50'];

  // FIXED: Custom tooltip for the bar chart
  const CustomBarTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 shadow-lg rounded-lg border border-gray-200">
          <p className="font-semibold text-gray-800 mb-2">{data.name}</p>
          <div className="space-y-1">
            <p className="text-sm">
              <span className="text-green-600 font-medium">Income:</span> ₹{data.income.toLocaleString('en-IN')}
            </p>
            <p className="text-sm">
              <span className="text-orange-600 font-medium">Expenses:</span> ₹{data.expenses.toLocaleString('en-IN')}
            </p>
            <p className={`text-sm font-medium ${data.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {data.profit >= 0 ? 'Profit: ' : 'Loss: '}
              ₹{Math.abs(data.profit).toLocaleString('en-IN')}
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  // FIXED: Safe number extraction - handles all formats
  const getSafeNumber = (value) => {
    if (value === undefined || value === null) return 0;
    
    // If it's already a number, return it
    if (typeof value === 'number') return value;
    
    // If it's a string, clean it thoroughly
    if (typeof value === 'string') {
      // Remove all non-numeric characters except decimal point and minus sign
      const cleaned = value.replace(/[^\d.-]/g, '');
      const num = parseFloat(cleaned);
      return isNaN(num) ? 0 : num;
    }
    
    return 0;
  };

  // FIXED: Format number with proper Indian numbering
  const formatIndianNumber = (value) => {
    const num = getSafeNumber(value);
    if (num === 0) return '0';
    
    // Convert to Indian numbering format (lakhs, crores)
    return num.toLocaleString('en-IN');
  };

  // Generate PDF Report - COMPLETELY FIXED
  const generatePDF = () => {
    try {
      // Create new PDF document
      const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      });
      
      // Add Logo and Title
      doc.setFontSize(24);
      doc.setTextColor(46, 125, 50);
      doc.text('CROP CORE', 148, 20, { align: 'center' });
      
      doc.setFontSize(16);
      doc.setTextColor(0, 0, 0);
      doc.text(`Annual Report - ${selectedYear}`, 148, 30, { align: 'center' });
      
      doc.setFontSize(10);
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 148, 38, { align: 'center' });
      
      // Extract all numbers safely
      const totalCrops = getSafeNumber(summary.totalCrops);
      const totalIncome = getSafeNumber(summary.totalIncome);
      const totalExpenses = getSafeNumber(summary.totalExpenses);
      const totalProfit = getSafeNumber(summary.totalProfit);
      const monthlyIncome = getSafeNumber(summary.monthlyIncome);
      const monthlyExpense = getSafeNumber(summary.monthlyExpense);
      
      // FINANCIAL SUMMARY TABLE - FIXED
      doc.setFontSize(14);
      doc.setTextColor(46, 125, 50);
      doc.text('Financial Summary', 20, 50);
      
      const summaryData = [
        ['Total Crops', totalCrops.toString()],
        ['Total Income', `₹ ${formatIndianNumber(totalIncome)}`],
        ['Total Expenses', `₹ ${formatIndianNumber(totalExpenses)}`],
        ['Net Profit', `₹ ${formatIndianNumber(totalProfit)}`],
        ['Monthly Income', `₹ ${formatIndianNumber(monthlyIncome)}`],
        ['Monthly Expenses', `₹ ${formatIndianNumber(monthlyExpense)}`]
      ];
      
      autoTable(doc, {
        startY: 55,
        head: [['Metric', 'Value']],
        body: summaryData,
        theme: 'striped',
        headStyles: { fillColor: [46, 125, 50] },
        styles: { fontSize: 11 },
        columnStyles: {
          0: { cellWidth: 70 },
          1: { cellWidth: 70, halign: 'right' }
        },
        margin: { left: 20, right: 20 }
      });
      
      let finalY = doc.lastAutoTable.finalY + 15;
      
      // CROP PERFORMANCE TABLE - FIXED
      if (crops.length > 0) {
        doc.setFontSize(14);
        doc.setTextColor(46, 125, 50);
        doc.text('Crop Performance', 20, finalY);
        
        const cropTableData = crops.map(crop => {
          const income = getSafeNumber(crop.income);
          const expenses = getSafeNumber(crop.totalExpenses);
          const profit = getSafeNumber(crop.profit);
          
          return [
            crop.cropName || 'Unknown',
            `₹ ${formatIndianNumber(income)}`,
            `₹ ${formatIndianNumber(expenses)}`,
            `₹ ${formatIndianNumber(profit)}`,
            profit >= 0 ? 'Profit' : 'Loss'
          ];
        });
        
        autoTable(doc, {
          startY: finalY + 5,
          head: [['Crop', 'Income', 'Expenses', 'Profit', 'Status']],
          body: cropTableData,
          theme: 'striped',
          headStyles: { fillColor: [46, 125, 50] },
          styles: { fontSize: 10 },
          columnStyles: {
            0: { cellWidth: 45 },
            1: { cellWidth: 40, halign: 'right' },
            2: { cellWidth: 40, halign: 'right' },
            3: { cellWidth: 45, halign: 'right' },
            4: { cellWidth: 30, halign: 'center' }
          },
          margin: { left: 20, right: 20 }
        });
        
        finalY = doc.lastAutoTable.finalY + 15;
      }
      
      // EXPENSE BREAKDOWN TABLE - FIXED
      if (expenseTypeData.length > 0) {
        doc.setFontSize(14);
        doc.setTextColor(46, 125, 50);
        doc.text('Expense Breakdown', 20, finalY);
        
        const totalExpensesValue = getSafeNumber(summary.totalExpenses) || 1;
        
        const expenseTableData = expenseTypeData.map(item => {
          const amount = getSafeNumber(item.value);
          const percentage = totalExpensesValue > 0 ? (amount / totalExpensesValue) * 100 : 0;
          
          return [
            item.name,
            `₹ ${formatIndianNumber(amount)}`,
            `${percentage.toFixed(1)}%`
          ];
        });
        
        autoTable(doc, {
          startY: finalY + 5,
          head: [['Expense Type', 'Amount', 'Percentage']],
          body: expenseTableData,
          theme: 'striped',
          headStyles: { fillColor: [46, 125, 50] },
          styles: { fontSize: 11 },
          columnStyles: {
            0: { cellWidth: 70 },
            1: { cellWidth: 55, halign: 'right' },
            2: { cellWidth: 40, halign: 'right' }
          },
          margin: { left: 20, right: 20 }
        });
        
        finalY = doc.lastAutoTable.finalY + 15;
      }
      
      // Add Footer
      const pageCount = doc.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(128, 128, 128);
        doc.text(
          `CropCore - Smart Farming Platform | Page ${i} of ${pageCount}`,
          148,
          doc.internal.pageSize.height - 10,
          { align: 'center' }
        );
      }
      
      // Save PDF
      doc.save(`CropCore-Report-${selectedYear}.pdf`);
      toast.success('PDF Report downloaded successfully!');
      
    } catch (error) {
      console.error('PDF generation error:', error);
      toast.error('Failed to generate PDF: ' + error.message);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Reports & Analytics</h1>
        <div className="flex items-center space-x-4">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
          >
            {[2026, 2025, 2024, 2023, 2022].map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
          
          <button
            onClick={generatePDF}
            className="inline-flex items-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            <FileText size={20} className="mr-2" />
            Download PDF Report
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Crops</p>
              <p className="text-3xl font-bold mt-1">{getSafeNumber(summary.totalCrops)}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <Sprout className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Income</p>
              <p className="text-3xl font-bold mt-1 text-green-600">
                ₹ {formatIndianNumber(getSafeNumber(summary.totalIncome))}
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Expenses</p>
              <p className="text-3xl font-bold mt-1 text-orange-600">
                ₹ {formatIndianNumber(getSafeNumber(summary.totalExpenses))}
              </p>
            </div>
            <div className="p-3 bg-orange-100 rounded-full">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Net Profit</p>
              <p className={`text-3xl font-bold mt-1 ${getSafeNumber(summary.totalProfit) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ₹ {formatIndianNumber(getSafeNumber(summary.totalProfit))}
              </p>
            </div>
            <div className={`p-3 rounded-full ${getSafeNumber(summary.totalProfit) >= 0 ? 'bg-green-100' : 'bg-red-100'}`}>
              <BarChart3 className={`w-6 h-6 ${getSafeNumber(summary.totalProfit) >= 0 ? 'text-green-600' : 'text-red-600'}`} />
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trends */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Monthly Trends - {selectedYear}</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="income" stroke="#2E7D32" name="Income" />
                <Line type="monotone" dataKey="expense" stroke="#FF8F00" name="Expense" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Crop Profit Comparison */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Crop Profit Comparison</h2>
          <div className="h-80">
            {cropProfitData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={cropProfitData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip content={<CustomBarTooltip />} />
                  <ReferenceLine y={0} stroke="#666" strokeWidth={1} />
                  
                  <Bar 
                    dataKey="income" 
                    fill="#2E7D32" 
                    name="Income" 
                    radius={[4, 4, 0, 0]}
                  />
                  
                  <Bar 
                    dataKey="expenses" 
                    fill="#FF8F00" 
                    name="Expenses" 
                    radius={[4, 4, 0, 0]}
                  />
                  
                  <Bar 
                    dataKey="profit" 
                    name="Profit/Loss"
                    radius={[4, 4, 0, 0]}
                  >
                    {cropProfitData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.profit >= 0 ? '#0277BD' : '#C62828'} 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500">
                No crop data available
              </div>
            )}
          </div>
          
          <div className="flex items-center justify-center space-x-6 mt-4 pt-2 border-t border-gray-200">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-[#0277BD] rounded mr-2"></div>
              <span className="text-sm text-gray-600">Profit</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-[#C62828] rounded mr-2"></div>
              <span className="text-sm text-gray-600">Loss</span>
            </div>
          </div>
        </div>

        {/* Expense Distribution */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Expense Distribution</h2>
          <div className="h-80">
            {expenseTypeData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={expenseTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {expenseTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500">
                No expense data available
              </div>
            )}
          </div>
        </div>

        {/* Crop Performance Table */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Crop Performance</h2>
          <div className="overflow-x-auto">
            {crops.length > 0 ? (
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Crop</th>
                    <th className="text-right py-2">Income</th>
                    <th className="text-right py-2">Expenses</th>
                    <th className="text-right py-2">Profit/Loss</th>
                  </tr>
                </thead>
                <tbody>
                  {crops.map(crop => {
                    const income = getSafeNumber(crop.income);
                    const expenses = getSafeNumber(crop.totalExpenses);
                    const profit = getSafeNumber(crop.profit);
                    
                    return (
                      <tr key={crop.id} className="border-b hover:bg-gray-50">
                        <td className="py-2 font-medium">{crop.cropName || 'Unknown'}</td>
                        <td className="text-right text-green-600">₹ {formatIndianNumber(income)}</td>
                        <td className="text-right text-orange-600">₹ {formatIndianNumber(expenses)}</td>
                        <td className={`text-right font-semibold ${profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          ₹ {formatIndianNumber(profit)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No crops added yet
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;