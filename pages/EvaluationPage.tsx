
import React from 'react';
import { TrainingRecord } from '../types';
import { EMPLOYEES, COURSES } from '../mockData';
import { Star, TrendingUp, TrendingDown, FileText } from 'lucide-react';

interface Props {
  records: TrainingRecord[];
}

const EvaluationPage: React.FC<Props> = ({ records }) => {
  const completedRecords = records.filter(r => r.postScore !== undefined);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Evaluation Report</h2>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold">
           <FileText size={18} /> Annual Report
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-600 border-b">
              <tr>
                <th className="px-6 py-4 font-bold">พนักงาน</th>
                <th className="px-6 py-4 font-bold">หลักสูตร</th>
                <th className="px-6 py-4 font-bold text-center">Pre-Test</th>
                <th className="px-6 py-4 font-bold text-center">Post-Test</th>
                <th className="px-6 py-4 font-bold text-center">พัฒนาการ (%)</th>
                <th className="px-6 py-4 font-bold text-center">ความพึงพอใจ</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {completedRecords.map((record, idx) => {
                const emp = EMPLOYEES.find(e => e.id === record.employeeId);
                const course = COURSES.find(c => c.id === record.courseId);
                const progress = record.preScore && record.postScore ? Math.round(((record.postScore - record.preScore) / record.preScore) * 100) : 0;
                
                return (
                  <tr key={idx} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center font-bold text-xs">
                          {emp?.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">{emp?.name}</p>
                          <p className="text-[10px] text-gray-400 uppercase">{emp?.department}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-blue-600">{course?.title}</td>
                    <td className="px-6 py-4 text-center text-gray-500 font-mono">{record.preScore}</td>
                    <td className="px-6 py-4 text-center text-gray-800 font-bold font-mono">{record.postScore}</td>
                    <td className="px-6 py-4 text-center">
                       <div className="flex items-center justify-center gap-1 font-bold">
                          {progress >= 0 ? (
                            <TrendingUp size={14} className="text-green-500" />
                          ) : (
                            <TrendingDown size={14} className="text-red-500" />
                          )}
                          <span className={progress >= 0 ? 'text-green-600' : 'text-red-600'}>
                            {progress > 0 ? `+${progress}` : progress}%
                          </span>
                       </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-0.5 text-yellow-400">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} size={14} fill={i < (record.satisfaction || 0) ? "currentColor" : "none"} stroke="currentColor" />
                        ))}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {completedRecords.length === 0 && (
            <div className="p-12 text-center text-gray-400 italic">ยังไม่มีข้อมูลการวัดผลหลังอบรม</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EvaluationPage;
