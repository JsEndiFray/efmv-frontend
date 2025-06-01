export interface Formation {
  id: number;
  title: string;
  institution: string;
  location: string;
  year: number;
  logo: string;
  description?: string;
  type: 'secondary' | 'professional' | 'certification' | 'bootcamp';
}
