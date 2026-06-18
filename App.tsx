
import React, { useState } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CalendarRange, 
  Grid3X3, 
  Wallet, 
  FileCheck, 
  Bell, 
  Menu, 
  Target,
  Calendar,
  Settings
} from 'lucide-react';

import { TrainingPlan, TrainingRecord } from './types';
import { INITIAL_PLANS, INITIAL_RECORDS } from './mockData';

// Pages
import Dashboard from './pages/Dashboard';
import TrainingPlanPage from './pages/TrainingPlanPage';
import SkillMatrixPage from './pages/SkillMatrixPage';
import BudgetPage from './pages/BudgetPage';
import EvaluationPage from './pages/EvaluationPage';
import TNAPage from './pages/TNAPage';
import CalendarPage from './pages/CalendarPage';

const App: React.FC = () => {
  const [plans, setPlans] = useState<TrainingPlan[]>(INITIAL_PLANS);
  const [records] = useState<TrainingRecord[]>(INITIAL_RECORDS);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <HashRouter>
      <div className="flex h-screen overflow-hidden bg-gray-100">
        {/* Sidebar - Desktop */}
        <aside className={`admin-lte-sidebar w-64 transition-all duration-300 hidden md:flex flex-col text-white ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full absolute'}`}>
          <div className="p-4 flex items-center gap-3 border-b border-gray-700 bg-[#343a40]">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center font-bold text-white">TMS</div>
            <span className="font-semibold text-lg">TMS Admin</span>
          </div>
          <div className="flex-1 overflow-y-auto py-4">
            <nav className="space-y-1 px-2">
              <SidebarLink to="/" icon={<LayoutDashboard size={20} />} label="แผงควบคุม" />
              <SidebarLink to="/tna" icon={<Target size={20} />} label="วิเคราะห์ความต้องการ" />
              <SidebarLink to="/plan" icon={<CalendarRange size={20} />} label="แผนการอบรมประจำปี" />
              <SidebarLink to="/calendar" icon={<Calendar size={20} />} label="ปฏิทินการอบรม" />
              <SidebarLink to="/matrix" icon={<Grid3X3 size={20} />} label="ตารางทักษะพนักงาน" />
              <SidebarLink to="/budget" icon={<Wallet size={20} />} label="งบประมาณ" />
              <SidebarLink to="/evaluation" icon={<FileCheck size={20} />} label="การประเมินผล" />
            </nav>
          </div>
          <div className="p-4 border-t border-gray-700 text-xs text-gray-400">
            © 2024 Corporate TMS
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
          {/* Header */}
          <header className="bg-white border-b h-14 flex items-center justify-between px-4 sticky top-0 z-10">
            <div className="flex items-center gap-4">
              <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="hidden md:block p-1 hover:bg-gray-100 rounded text-gray-600">
                <Menu size={20} />
              </button>
              <h1 className="text-lg font-bold text-gray-800 md:block hidden">Training Management System</h1>
              <h1 className="text-lg font-bold text-gray-800 md:hidden font-sarabun">ระบบจัดการอบรม</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative cursor-pointer group">
                <Bell size={20} className="text-gray-600" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">3</span>
                <div className="absolute right-0 top-full mt-2 w-64 bg-white shadow-xl rounded-md border hidden group-hover:block p-2 z-50">
                  <div className="font-bold p-2 border-b text-sm">การแจ้งเตือน</div>
                  <div className="text-xs p-2 text-red-600">อีก 7 วันเริ่ม "ISO 9001"</div>
                  <div className="text-xs p-2 text-yellow-600">แผนก IT อบรมต่ำกว่า 60%</div>
                  <div className="text-xs p-2 text-blue-600">มี TNA ใหม่รอการอนุมัติ</div>
                </div>
              </div>
              <div className="flex items-center gap-2 cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden">
                  <img src="https://picsum.photos/32/32?random=1" alt="Profile" />
                </div>
                <span className="text-sm font-medium hidden sm:inline text-gray-700">ฝ่ายบุคคล (HR)</span>
              </div>
            </div>
          </header>

          {/* Content */}
          <main className="flex-1 overflow-y-auto p-4 pb-24 md:pb-4">
            <Routes>
              <Route path="/" element={<Dashboard plans={plans} records={records} />} />
              <Route path="/tna" element={<TNAPage />} />
              <Route path="/plan" element={<TrainingPlanPage plans={plans} setPlans={setPlans} />} />
              <Route path="/calendar" element={<CalendarPage plans={plans} />} />
              <Route path="/matrix" element={<SkillMatrixPage records={records} />} />
              <Route path="/budget" element={<BudgetPage plans={plans} />} />
              <Route path="/evaluation" element={<EvaluationPage records={records} />} />
            </Routes>
          </main>

          {/* Bottom Navigation - Mobile only */}
          <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around items-center py-2 px-1 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] z-40">
            <BottomNavLink to="/" icon={<LayoutDashboard size={24} />} label="แผงควบคุม" />
            <BottomNavLink to="/plan" icon={<CalendarRange size={24} />} label="แผนงาน" />
            <BottomNavLink to="/calendar" icon={<Calendar size={24} />} label="ปฏิทิน" />
            <BottomNavLink to="/matrix" icon={<Grid3X3 size={24} />} label="ทักษะ" />
            <BottomNavLink to="/budget" icon={<Wallet size={24} />} label="งบประมาณ" />
          </nav>
        </div>
      </div>
    </HashRouter>
  );
};

const SidebarLink: React.FC<{ to: string; icon: React.ReactNode; label: string }> = ({ to, icon, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link to={to} className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${isActive ? 'sidebar-active text-white' : 'text-gray-300 hover:bg-gray-700'}`}>
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </Link>
  );
};

const BottomNavLink: React.FC<{ to: string; icon: React.ReactNode; label: string }> = ({ to, icon, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link to={to} className={`flex flex-col items-center gap-1 flex-1 ${isActive ? 'text-blue-600 font-bold' : 'text-gray-500'}`}>
      {icon}
      <span className="text-[10px] whitespace-nowrap">{label}</span>
    </Link>
  );
};

export default App;
