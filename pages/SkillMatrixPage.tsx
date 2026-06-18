
import React, { useState } from 'react';
import { EMPLOYEES, COURSES } from '../mockData';
import { TrainingRecord, SkillStatus } from '../types';
import { Filter, Check, Clock, X, Info } from 'lucide-react';

interface Props {
  records: TrainingRecord[];
}

const SkillMatrixPage: React.FC<Props> = ({ records }) => {
  const [deptFilter, setDeptFilter] = useState('All');

  const filteredEmployees = deptFilter === 'All' 
    ? EMPLOYEES 
    : EMPLOYEES.filter(e => e.department === deptFilter);

  const getRecord = (empId: string, courseId: string) => {
    return records.find(r => r.employeeId === empId && r.courseId === courseId);
  };

  const calculateProgress = (empId: string) => {
    const empRecords = records.filter(r => r.employeeId === empId && r.status === SkillStatus.PASSED);
    return Math.round((empRecords.length / COURSES.length) * 100);
  };

  const getProgressBarColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Skill Matrix</h2>
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-gray-500" />
          <select 
            className="border p-2 rounded text-sm outline-none"
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
          >
            <option value="All">All Departments</option>
            {Array.from(new Set(EMPLOYEES.map(e => e.department))).map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex gap-6 mb-4 text-xs">
          <div className="flex items-center gap-1"><div className="w-3 h-3 bg-green-100 border border-green-500 rounded-sm flex items-center justify-center"><Check size={8} className="text-green-600"/></div> Passed</div>
          <div className="flex items-center gap-1"><div className="w-3 h-3 bg-yellow-100 border border-yellow-500 rounded-sm flex items-center justify-center"><Clock size={8} className="text-yellow-600"/></div> Waiting</div>
          <div className="flex items-center gap-1"><div className="w-3 h-3 bg-red-100 border border-red-500 rounded-sm flex items-center justify-center"><X size={8} className="text-red-600"/></div> Not Trained</div>
        </div>

        <div className="overflow-x-auto matrix-scroll border rounded-lg">
          <table className="w-full text-left text-sm border-collapse">
            <thead className="bg-gray-100 text-gray-700 sticky top-0">
              <tr>
                <th className="px-4 py-4 border-b border-r bg-gray-100 z-10 sticky left-0 font-bold min-w-[200px]">Employee / Course</th>
                {COURSES.map(course => (
                  <th key={course.id} className="px-4 py-4 border-b text-center min-w-[150px] font-bold">
                    <p className="text-[10px] text-gray-500 uppercase">{course.type}</p>
                    <p className="truncate w-full">{course.title}</p>
                  </th>
                ))}
                <th className="px-4 py-4 border-b border-l bg-gray-100 sticky right-0 font-bold min-w-[120px] text-center">Progress %</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredEmployees.map(emp => {
                const progress = calculateProgress(emp.id);
                return (
                  <tr key={emp.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 border-r bg-white sticky left-0 z-10 shadow-[2px_0_5px_rgba(0,0,0,0.05)]">
                      <p className="font-semibold text-gray-800">{emp.name}</p>
                      <p className="text-[10px] text-gray-400 uppercase">{emp.department} • {emp.position}</p>
                    </td>
                    {COURSES.map(course => {
                      const record = getRecord(emp.id, course.id);
                      return (
                        <td key={course.id} className="px-4 py-3 text-center border-r last:border-r-0">
                          <div className="flex justify-center">
                            {record?.status === SkillStatus.PASSED ? (
                              <div className="w-6 h-6 bg-green-100 border border-green-500 rounded text-green-600 flex items-center justify-center shadow-sm">
                                <Check size={14} strokeWidth={3} />
                              </div>
                            ) : record?.status === SkillStatus.WAITING ? (
                              <div className="w-6 h-6 bg-yellow-100 border border-yellow-500 rounded text-yellow-600 flex items-center justify-center shadow-sm">
                                <Clock size={14} strokeWidth={3} />
                              </div>
                            ) : (
                              <div className="w-6 h-6 bg-red-100 border border-red-500 rounded text-red-600 flex items-center justify-center shadow-sm">
                                <X size={14} strokeWidth={3} />
                              </div>
                            )}
                          </div>
                        </td>
                      );
                    })}
                    <td className="px-4 py-3 bg-white sticky right-0 border-l text-center z-10 shadow-[-2px_0_5px_rgba(0,0,0,0.05)]">
                      <div className="flex flex-col items-center gap-1">
                        <span className={`text-xs font-bold ${progress >= 80 ? 'text-green-600' : progress >= 50 ? 'text-yellow-600' : 'text-red-600'}`}>
                          {progress}%
                        </span>
                        <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div className={`h-full ${getProgressBarColor(progress)}`} style={{ width: `${progress}%` }}></div>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
         <div className="bg-white p-4 rounded-lg shadow-sm border border-l-4 border-l-blue-500">
           <h4 className="text-gray-500 text-xs font-bold uppercase mb-1">Company Coverage</h4>
           <p className="text-2xl font-bold">64.5%</p>
           <div className="w-full h-1 bg-gray-100 rounded mt-2">
             <div className="h-full bg-blue-500" style={{ width: '64.5%' }}></div>
           </div>
         </div>
         <div className="bg-white p-4 rounded-lg shadow-sm border border-l-4 border-l-green-500">
           <h4 className="text-gray-500 text-xs font-bold uppercase mb-1">Mandatory Compliance</h4>
           <p className="text-2xl font-bold">82.0%</p>
           <div className="w-full h-1 bg-gray-100 rounded mt-2">
             <div className="h-full bg-green-500" style={{ width: '82%' }}></div>
           </div>
         </div>
         <div className="bg-white p-4 rounded-lg shadow-sm border border-l-4 border-l-purple-500 flex items-center gap-3">
           <Info size={32} className="text-purple-500 opacity-20" />
           <div>
             <h4 className="text-gray-500 text-xs font-bold uppercase mb-1">Upcoming Milestone</h4>
             <p className="text-sm font-semibold">Q3 Target: 75% Coverage</p>
           </div>
         </div>
      </div>
    </div>
  );
};

export default SkillMatrixPage;
