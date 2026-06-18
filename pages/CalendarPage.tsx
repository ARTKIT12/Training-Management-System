
import React, { useState } from 'react';
import { TrainingPlan, TrainingType } from '../types';
import { COURSES } from '../mockData';
import { ChevronLeft, ChevronRight, MapPin, Monitor } from 'lucide-react';

interface Props {
  plans: TrainingPlan[];
}

const CalendarPage: React.FC<Props> = ({ plans }) => {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 2, 1)); // Default to March 2024 for demo

  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
    'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
  ];

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const getEventsForDay = (day: number) => {
    const formattedDay = day < 10 ? `0${day}` : day;
    const dateStr = `${year}-${(month + 1).toString().padStart(2, '0')}-${formattedDay}`;
    return plans.filter(p => p.date === dateStr);
  };

  const getBadgeColor = (type: string) => {
    switch (type) {
      case TrainingType.MANDATORY: return 'bg-red-500 text-white';
      case TrainingType.FUNCTIONAL: return 'bg-blue-500 text-white';
      case TrainingType.SOFT_SKILL: return 'bg-yellow-500 text-gray-800';
      case TrainingType.LEADERSHIP: return 'bg-teal-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const renderCalendarDays = () => {
    const totalDays = daysInMonth(year, month);
    const startDay = firstDayOfMonth(year, month);
    const days = [];

    // Empty slots before first day
    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 md:h-32 bg-gray-50 border-b border-r border-gray-100"></div>);
    }

    // Actual days
    for (let day = 1; day <= totalDays; day++) {
      const dayEvents = getEventsForDay(day);
      days.push(
        <div key={day} className="h-24 md:h-32 border-b border-r bg-white p-1 hover:bg-gray-50 transition-colors">
          <span className="text-xs font-bold text-gray-400">{day}</span>
          <div className="mt-1 space-y-1 overflow-y-auto max-h-[80%] custom-scrollbar">
            {dayEvents.map(event => {
              const course = COURSES.find(c => c.id === event.courseId);
              return (
                <div 
                  key={event.id} 
                  className={`text-[9px] md:text-[10px] p-1 rounded-sm border-l-2 truncate cursor-pointer ${getBadgeColor(course?.type || '')}`}
                  title={course?.title}
                >
                  <div className="flex items-center gap-1">
                    {event.format === 'Online' ? <Monitor size={8} /> : <MapPin size={8} />}
                    <span className="truncate">{course?.title}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    return days;
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">ปฏิทินการอบรม</h2>
          <p className="text-sm text-gray-500">ตารางแสดงการจองและแผนงานรายเดือน</p>
        </div>
        <div className="flex items-center gap-4 bg-white p-2 rounded-lg border shadow-sm">
          <button onClick={prevMonth} className="p-1 hover:bg-gray-100 rounded"><ChevronLeft size={20}/></button>
          <span className="font-bold text-gray-700 min-w-[120px] text-center">{monthNames[month]} {year + 543}</span>
          <button onClick={nextMonth} className="p-1 hover:bg-gray-100 rounded"><ChevronRight size={20}/></button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="grid grid-cols-7 bg-blue-600 text-white text-center py-2 text-xs md:text-sm font-bold">
          <div>อา.</div>
          <div>จ.</div>
          <div>อ.</div>
          <div>พ.</div>
          <div>พฤ.</div>
          <div>ศ.</div>
          <div>ส.</div>
        </div>
        <div className="grid grid-cols-7 border-l">
          {renderCalendarDays()}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {Object.values(TrainingType).map(type => (
          <div key={type} className="flex items-center gap-2 text-xs">
            <div className={`w-3 h-3 rounded-full ${getBadgeColor(type)}`}></div>
            <span className="text-gray-600">{type === TrainingType.MANDATORY ? 'บังคับ (Mandatory)' : 
                                             type === TrainingType.FUNCTIONAL ? 'ทักษะงาน (Functional)' :
                                             type === TrainingType.SOFT_SKILL ? 'ซอฟต์สกิล (Soft Skill)' : 'ผู้นำ (Leadership)'}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarPage;
