
import React from 'react';
import { TrainingPlan, TrainingRecord, TrainingStatus } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, BookOpen, Percent, Wallet, AlertCircle, CheckCircle } from 'lucide-react';

interface Props {
  plans: TrainingPlan[];
  records: TrainingRecord[];
}

const Dashboard: React.FC<Props> = ({ plans, records }) => {
  const totalCourses = plans.length;
  const totalEmployees = 50;
  const trainedEmployees = new Set(records.map(r => r.employeeId)).size;
  const coveragePercent = Math.round((trainedEmployees / totalEmployees) * 100);
  
  const totalBudget = plans.reduce((acc, p) => acc + p.budget, 0);
  const actualSpent = plans.reduce((acc, p) => acc + p.actualSpent, 0);

  const monthlyData = [
    { name: 'Jan', courses: 2 },
    { name: 'Feb', courses: 1 },
    { name: 'Mar', courses: 3 },
    { name: 'Apr', courses: 2 },
    { name: 'May', courses: 4 },
    { name: 'Jun', courses: 2 }
  ];

  const typeData = [
    { name: 'Mandatory', value: 40, color: '#dc3545' },
    { name: 'Functional', value: 30, color: '#007bff' },
    { name: 'Soft Skill', value: 20, color: '#ffc107' },
    { name: 'Leadership', value: 10, color: '#17a2b8' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
        <span className="text-sm text-gray-500">Year: 2024</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={<BookOpen className="text-white" />} bg="bg-blue-500" label="จำนวนหลักสูตร" value={totalCourses} />
        <StatCard icon={<Users className="text-white" />} bg="bg-green-500" label="พนักงานที่เข้าอบรม" value={trainedEmployees} />
        <StatCard icon={<Percent className="text-white" />} bg="bg-yellow-500" label="% การเข้าอบรมรวม" value={`${coveragePercent}%`} />
        <StatCard icon={<Wallet className="text-white" />} bg="bg-red-500" label="งบประมาณคงเหลือ" value={`฿${(totalBudget - actualSpent).toLocaleString()}`} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-white p-4 rounded-lg shadow-sm border border-gray-200 h-full">
          <div className="flex items-center justify-between mb-4 border-b pb-2">
            <h3 className="font-bold text-gray-700">การแจ้งเตือนเดือนนี้</h3>
            <span className="text-xs text-blue-600 cursor-pointer font-medium">ดูทั้งหมด</span>
          </div>
          <div className="space-y-3 max-h-[400px] overflow-y-auto">
            {plans.map(plan => (
              <div key={plan.id} className="flex items-center gap-3 p-3 border rounded-md hover:bg-gray-50 transition-colors">
                {plan.status === TrainingStatus.COMPLETED ? (
                  <CheckCircle className="text-green-500 shrink-0" size={20} />
                ) : (
                  <AlertCircle className="text-red-500 shrink-0" size={20} />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate">{plan.courseId}</p>
                  <p className="text-xs text-gray-500">{plan.month}</p>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${plan.status === TrainingStatus.COMPLETED ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {plan.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <h3 className="font-bold text-gray-700 mb-4">จำนวนการอบรมรายเดือน</h3>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip />
                  <Bar dataKey="courses" fill="#3c8dbc" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <h3 className="font-bold text-gray-700 mb-4">ประเภทการอบรม (Course Types)</h3>
            <div className="h-[250px] w-full flex flex-col md:flex-row items-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={typeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {typeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex md:flex-col gap-2 mt-4 md:mt-0 md:pl-4">
                {typeData.map((t) => (
                  <div key={t.name} className="flex items-center gap-2 text-xs">
                    <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: t.color }}></div>
                    <span>{t.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ icon: React.ReactNode; bg: string; label: string; value: string | number }> = ({ icon, bg, label, value }) => (
  <div className="bg-white rounded-lg shadow-sm border overflow-hidden flex h-24">
    <div className={`${bg} w-24 flex items-center justify-center shrink-0`}>
      {React.cloneElement(icon as React.ReactElement, { size: 40 })}
    </div>
    <div className="flex-1 p-3 flex flex-col justify-center">
      <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{label}</p>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  </div>
);

export default Dashboard;
