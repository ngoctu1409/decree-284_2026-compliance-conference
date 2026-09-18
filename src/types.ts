export type Language = 'en' | 'vi';

export interface AgendaSession {
  id: string;
  time: string;
  duration: string;
  badges: { text: string; variant: 'primary' | 'gold' | 'danger' | 'slate' }[];
  title: string;
  titleVi: string;
  description: string;
  descriptionVi: string;
  location: string;
  locationVi: string;
  category: 'checkin' | 'keynote' | 'regulatory' | 'networking' | 'panel' | 'closing';
}

export interface Speaker {
  id: string;
  badge: string;
  badgeVi: string;
  name: string;
  role: string;
  roleVi: string;
  bio: string;
  bioVi: string;
  keynoteTopic: string;
  keynoteTopicVi: string;
  avatarUrl: string;
  organization: string;
}

export interface PenaltyItem {
  id: string;
  violation: string;
  violationVi: string;
  legalReference: string;
  legalReferenceVi: string;
  applicableEntity: string;
  applicableEntityVi: string;
  monetaryPenalty: string;
  monetaryPenaltyVi: string;
  penaltyType: 'gold' | 'red';
  remedialTag: string;
  remedialTagVi: string;
  remedialMeasure: string;
  remedialMeasureVi: string;
}

export interface DocumentItem {
  id: string;
  badge: string;
  badgeVi: string;
  title: string;
  titleVi: string;
  description: string;
  descriptionVi: string;
  fileFormat: string;
  fileSize: string;
  buttonLabel: string;
  buttonLabelVi: string;
  variant: 'gold' | 'outline';
}

export interface FaqItem {
  id: string;
  num: string;
  question: string;
  questionVi: string;
  answer: string;
  answerVi: string;
  legalBasis: string;
}

export interface RegistrationData {
  fullName: string;
  organization: string;
  workEmail: string;
  phone: string;
  attendanceMode: string;
  sector: string;
  advanceQuestion?: string;
  confirmed: boolean;
  registrationId?: string;
  seatNumber?: string;
  timestamp?: string;
}
