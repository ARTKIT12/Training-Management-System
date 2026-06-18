import React from 'react';
import { TrainingPlan } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart, Line } from 'recharts';
import { DollarSign, ArrowUpRight, CreditCard } from 'lucide-react';

interface Props {
  plans: TrainingPlan[];
}

const BudgetPage: React.FC<Props> = ({ plans }) => {
  const totalBudget = plans.reduce((acc, p) => acc + p.budget, 0);
  const totalActual = plans.reduce((acc, p) => acc + p.actualSpent, 0);
  const remaining = totalBudget - totalActual;
  
  const budgetData = [
    { name: 'Jan', budget: 30000, actual: 22000 },
    { name: 'Feb', budget: 45000, actual: 0 },
    { name: 'Mar', budget: 35000, actual: 0 },
    { name: 'Apr', budget: 25000, actual: 0 },
    { name: 'May', budget: 50000, actual: 0 },
    { name: 'Jun', budget: 40000, actual: 0 }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Budget Management</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <BudgetCard 
          label="Total Budget (Plan)" 
          value={`฿${totalBudget.toLocaleString()}`} 
          icon={<DollarSign className="text-blue-600" />} 
          subText="Updated: 15 Jun 2024"
        />
        <BudgetCard 
          label="Total Actual Spent" 
          value={`฿${totalActual.toLocaleString()}`} 
          icon={<CreditCard className="text-orange-600" />} 
          subText="48.5% of total budget used"
        />
        <BudgetCard 
          label="Remaining Balance" 
          value={`฿${remaining.toLocaleString()}`} 
          icon={<ArrowUpRight className="text-green-600" />} 
          subText="Ready for Q3-Q4 operations"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="font-bold text-gray-700 mb-6">Budget vs Actual (Monthly Comparison)</h3>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={budgetData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="budget" name="Planned Budget" fill="#3c8dbc" radius={[4, 4, 0, 0]} />
                <Line type="monotone" dataKey="actual" name="Actual Spent" stroke="#dc3545" strokeWidth={3} dot={{ r: 6 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="font-bold text-gray-700 mb-4 text-center">Budget Distribution</h3>
          <div className="space-y-6">
            <ProgressBar label="Mandatory Training" percent={35} color="bg-red-500" value="฿245,000" />
            <ProgressBar label="Functional Skills" percent={45} color="bg-blue-500" value="฿315,000" />
            <ProgressBar label="Soft Skills" percent={15} color="bg-yellow-500" value="฿105,000" />
            <ProgressBar label="Leadership Development" percent={5} color="bg-teal-500" value="฿35,000" />
          </div>
          <div className="mt-8 pt-6 border-t">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">Overall Efficiency</span>
              <span className="text-sm font-bold text-green-600">High (+12%)</span>
            </div>
            <p className="text-xs text-gray-500 italic">"Actual spending is currently 12% below budget due to internal training efficiency."</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const BudgetCard: React.FC<{ label: string; value: string; icon: React.ReactNode; subText: string }> = ({ label, value, icon, subText }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 relative overflow-hidden group">
    <div className="absolute -right-4 -top-4 opacity-10 group-hover:scale-110 transition-transform">
      {React.cloneElement(icon as React.ReactElement, { size: 100 })}
    </div>
    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{label}</p>
    <h3 className="text-2xl font-black text-gray-800 mb-2">{value}</h3>
    <p className="text-[10px] text-gray-500 flex items-center gap-1">
      {subText}
    </p>
  </div>
);

const ProgressBar: React.FC<{ label: string; percent: number; color: string; value: string }> = ({ label, percent, color, value }) => (
  <div className="space-y-1">
    <div className="flex justify-between text-xs font-medium">
      <span className="text-gray-700">{label}</span>
      <span className="text-gray-900">{value}</span>
    </div>
    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
      <div className={`h-full ${color}`} style={{ width: `${percent}%` }}></div>
    </div>
  </div>
);

export default BudgetPage;