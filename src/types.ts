
export enum View {
  DASHBOARD = 'dashboard',
  PROFILE = 'profile',
  AI_ASSISTANT = 'ai_assistant',
  ANALYTICS = 'analytics',
  SETTINGS = 'settings'
}

export interface UserProfile {
  name: string;
  email: string;
  role: string;
  avatar: string;
  bio: string;
  location: string;
}

export interface StatItem {
  label: string;
  value: string;
  change: number;
  trend: 'up' | 'down';
}

export interface Activity {
  id: string;
  type: string;
  description: string;
  timestamp: string;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}
