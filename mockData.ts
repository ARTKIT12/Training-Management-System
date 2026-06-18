
import { TrainingType, TrainingStatus, SkillStatus, Employee, TrainingCourse, TrainingPlan, TrainingRecord } from './types';

export const DEPARTMENTS = ['HR', 'IT', 'Marketing', 'Sales', 'Production', 'Logistics'];

export const EMPLOYEES: Employee[] = [
  { id: 'EMP001', name: 'สมชาย รักดี', department: 'IT', position: 'Senior Developer' },
  { id: 'EMP002', name: 'สมหญิง ขยันงาน', department: 'HR', position: 'Manager' },
  { id: 'EMP003', name: 'ประหยัด มีชัย', department: 'Production', position: 'Staff' },
  { id: 'EMP004', name: 'วิชัย ชัยชนะ', department: 'Sales', position: 'Executive' },
  { id: 'EMP005', name: 'อนันต์ ตั้งใจ', department: 'IT', position: 'Support' }
];

export const COURSES: TrainingCourse[] = [
  { id: 'C001', title: 'ISO 9001:2015 Awareness', type: TrainingType.MANDATORY },
  { id: 'C002', title: 'Advanced React Development', type: TrainingType.FUNCTIONAL },
  { id: 'C003', title: 'Communication Skills', type: TrainingType.SOFT_SKILL },
  { id: 'C004', title: 'Strategic Leadership', type: TrainingType.LEADERSHIP },
  { id: 'C005', title: 'Cyber Security Essentials', type: TrainingType.MANDATORY }
];

export const INITIAL_PLANS: TrainingPlan[] = [
  {
    id: 'P001',
    month: 'January',
    date: '2024-01-15',
    courseId: 'C001',
    targetGroup: 'All Staff',
    expectedTrainees: 50,
    budget: 25000,
    actualSpent: 22000,
    instructor: 'Ajarn Somsak',
    format: 'Onsite',
    status: TrainingStatus.COMPLETED
  },
  {
    id: 'P002',
    month: 'February',
    date: '2024-02-12',
    courseId: 'C002',
    targetGroup: 'IT Dept',
    expectedTrainees: 10,
    budget: 45000,
    actualSpent: 0,
    instructor: 'External Agency',
    format: 'Online',
    status: TrainingStatus.IN_PROGRESS
  },
  {
    id: 'P003',
    month: 'March',
    date: '2024-03-20',
    courseId: 'C003',
    targetGroup: 'Managers',
    expectedTrainees: 15,
    budget: 30000,
    actualSpent: 0,
    instructor: 'Internal Trainer',
    format: 'Onsite',
    status: TrainingStatus.PLANNED
  },
  {
    id: 'P004',
    month: 'March',
    date: '2024-03-22',
    courseId: 'C005',
    targetGroup: 'All Staff',
    expectedTrainees: 40,
    budget: 15000,
    actualSpent: 0,
    instructor: 'Safety Officer',
    format: 'Onsite',
    status: TrainingStatus.PLANNED
  }
];

export const INITIAL_RECORDS: TrainingRecord[] = [
  { employeeId: 'EMP001', courseId: 'C001', status: SkillStatus.PASSED, preScore: 40, postScore: 85, satisfaction: 5 },
  { employeeId: 'EMP001', courseId: 'C002', status: SkillStatus.WAITING },
  { employeeId: 'EMP002', courseId: 'C001', status: SkillStatus.PASSED, preScore: 50, postScore: 90, satisfaction: 4 },
  { employeeId: 'EMP003', courseId: 'C001', status: SkillStatus.NOT_TRAINED },
  { employeeId: 'EMP004', courseId: 'C004', status: SkillStatus.WAITING }
];
