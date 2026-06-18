
export enum TrainingType {
  MANDATORY = 'Mandatory',
  FUNCTIONAL = 'Functional',
  SOFT_SKILL = 'Soft Skill',
  LEADERSHIP = 'Leadership'
}

export enum TrainingStatus {
  PLANNED = 'Planned',
  IN_PROGRESS = 'In Progress',
  COMPLETED = 'Completed',
  CANCELLED = 'Cancelled'
}

export enum SkillStatus {
  PASSED = 'Passed',
  WAITING = 'Waiting',
  NOT_TRAINED = 'Not Trained'
}

export interface Employee {
  id: string;
  name: string;
  department: string;
  position: string;
}

export interface TrainingCourse {
  id: string;
  title: string;
  type: TrainingType;
}

export interface TrainingPlan {
  id: string;
  month: string;
  date: string; // ISO format: YYYY-MM-DD
  courseId: string;
  targetGroup: string;
  expectedTrainees: number;
  budget: number;
  actualSpent: number;
  instructor: string;
  format: 'Online' | 'Onsite';
  status: TrainingStatus;
}

export interface TrainingRecord {
  employeeId: string;
  courseId: string;
  status: SkillStatus;
  preScore?: number;
  postScore?: number;
  satisfaction?: number;
  completionDate?: string;
}

export interface BudgetSummary {
  year: number;
  totalBudget: number;
  allocated: number;
  actual: number;
}
