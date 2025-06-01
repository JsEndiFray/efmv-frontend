export interface WorkExperience {
  id: number;
  position: string;
  company: string;
  companyType?: string;
  location: string;
  startDate: string;
  endDate: string | 'Actualidad';
  duration: string;
  responsibilities?: string[];
  achievements?: string[];
  isCurrentJob: boolean;
  category: 'sales' | 'hospitality' | 'logistics' | 'management' | 'cleaning' | 'promotion';
}
