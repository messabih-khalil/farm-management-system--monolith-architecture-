// src/types/index.ts
export interface Cow {
  id: string;
  entryDate: string;
  breed: 'Holstein' | 'Montbeliarde';
}

export interface MedicalCheck {
  id: string;
  cowId: string;
  checkDate: string;
  disease?: string;
}

export interface Birth {
  id: string;
  motherCowId: string;
  birthDate: string;
}

export interface MilkProduction {
  id: string;
  date: string;
  milkQuantityLiters: number;
}

export interface User {
  id: string;
  username: string;
  password: string;
  role: 'admin' | 'user';
}
