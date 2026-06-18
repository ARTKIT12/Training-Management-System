
import React, { useState } from 'react';
import { TrainingPlan, TrainingType, TrainingStatus } from '../types';
import { Plus, Edit2, Trash2, FileDown, Search } from 'lucide-react';
import { COURSES } from '../mockData';

interface Props {
  plans: TrainingPlan[];
  setPlans: React.Dispatch<React.SetStateAction<TrainingPlan[]>>;
}

const TrainingPlanPage: React.FC<Props> = ({ plans, setPlans }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPlans = plans.filter(p => 
    p.courseId.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.instructor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string) => {
    if (window.confirm('ยืนยันการลบแผนการอบรมนี้?')) {
      setPlans(prev => prev.filter(p => p.id !== id));
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Training Plan 2024</h2>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition shadow-sm text-sm">
            <Plus size={18} /> Add Plan
          </button>
          <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition shadow-sm text-sm">
            <FileDown size={18} /> Export
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b bg-gray-50 flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by course or instructor..." 
              className="pl-10 pr-4 py-2 w-full border rounded-md text-sm outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-100 text-gray-700 border-b">
              <tr>
                <th className="px-4 py-3 font-bold">เดือน</th>
                <th className="px-4 py-3 font-bold">หลักสูตร</th>
                <th className="px-4 py-3 font-bold">กลุ่มเป้าหมาย</th>
                <th className="px-4 py-3 font-bold text-center">จำนวนคน</th>
                <th className="px-4 py-3 font-bold text-right">งบประมาณ</th>
                <th className="px-4 py-3 font-bold">รูปแบบ</th>
                <th className="px-4 py-3 font-bold">สถานะ</th>
                <th className="px-4 py-3 font-bold text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredPlans.map(plan => (
                <tr key={plan.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-medium">{plan.month}</td>
                  <td className="px-4 py-3">
                    <p className="font-semibold text-blue-600">{COURSES.find(c => c.id === plan.courseId)?.title || plan.courseId}</p>
                    <p className="text-xs text-gray-500">{plan.instructor}</p>
                  </td>
                  <td className="px-4 py-3 text-xs">{plan.targetGroup}</td>
                  <td className="px-4 py-3 text-center">{plan.expectedTrainees}</td>
                  <td className="px-4 py-3 text-right">฿{plan.budget.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-[10px] uppercase font-bold ${plan.format === 'Online' ? 'bg-purple-100 text-purple-700' : 'bg-orange-100 text-orange-700'}`}>
                      {plan.format}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={plan.status} />
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"><Edit2 size={16} /></button>
                      <button onClick={() => handleDelete(plan.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredPlans.length === 0 && (
            <div className="p-12 text-center text-gray-500">
              <Search className="mx-auto mb-2 opacity-20" size={48} />
              <p>ไม่พบข้อมูลแผนการอบรม</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const StatusBadge: React.FC<{ status: TrainingStatus }> = ({ status }) => {
  const styles = {
    [TrainingStatus.PLANNED]: 'bg-gray-100 text-gray-600 border-gray-200',
    [TrainingStatus.IN_PROGRESS]: 'bg-blue-100 text-blue-600 border-blue-200',
    [TrainingStatus.COMPLETED]: 'bg-green-100 text-green-600 border-green-200',
    [TrainingStatus.CANCELLED]: 'bg-red-100 text-red-600 border-red-200',
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${styles[status]}`}>
      {status}
    </span>
  );
};

export default TrainingPlanPage;
