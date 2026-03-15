export interface AvailableJobDto {
  id: string;
  jobRequestType: 'instant' | 'scheduled' | 'recurring';
  jobDescription: string;
  status: 'draft' | 'open' | 'expired' | 'assigned' | 'in_progress' | 'completed' | 'cancelled';
  budgetMin: string | null;
  budgetMax: string | null;
  currency: string;
  requiredAt: string | null;
  validOpenTill: string;
  distance: number;
  createdAt: string;
}
