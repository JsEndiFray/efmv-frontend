export interface Skill {
  id: number;
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'tools' | 'other';
  technologies: string[];
  logo: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'learning';
  description?: string;
  yearsOfExperience?: number;
}
