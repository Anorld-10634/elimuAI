export type LearningStyle = 'visual' | 'auditory' | 'kinesthetic' | 'reading/writing';

export interface UserProfile {
  name: string;
  learningStyle: LearningStyle;
  streak: number;
  progress: Record<string, number>; // conceptId -> percentage
  completedAssessments: string[]; 
}

export interface Message {
  id: string;
  sender: 'ai' | 'user' | string; // userId if group chat
  text: string;
  timestamp: number;
}

export interface Concept {
  id: string;
  title: string;
  subject: 'Physics' | 'Chemistry' | 'Biology' | 'Mathematics';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
}

export interface Assessment {
  id: string;
  conceptId: string;
  questions: {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  }[];
}
