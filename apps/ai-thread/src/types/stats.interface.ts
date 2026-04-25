export interface StatsUsage {
  identifier: string;
  totalMessages: number;
  lastActive: string;
  createdAt: string;
  updatedAt: string;
}

export interface StatsDaily {
  date: string;
  count: number;
  createdAt: string;
  updatedAt: string;
}
