export type Role = 'ADMIN' | 'MANAGER' | 'EMPLOYEE'
export type AppraisalStatus = 'PENDING' | 'IN_REVIEW' | 'COMPLETED' | 'APPROVED'

export interface Employee {
  id: string
  name: string
  email: string
  role: Role
  department?: string
  position?: string
  image?: string
  joinedAt: Date
}

export interface Appraisal {
  id: string
  employeeId: string
  reviewerId?: string
  period: string
  status: AppraisalStatus
  performance?: number
  productivity?: number
  teamwork?: number
  leadership?: number
  innovation?: number
  communication?: number
  overallScore?: number
  mlScore?: number
  mlInsights?: string
  comments?: string
  goals?: string
  createdAt: Date
  updatedAt: Date
  employee?: Employee
  reviewer?: Employee
}

export interface MLScoreResult {
  score: number
  insights: string
  grade: string
}

export interface DashboardStats {
  totalEmployees: number
  completedAppraisals: number
  avgMLScore: number
  pendingReviews: number
}
