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

export interface BirthListProps {
    births?: Birth[];
    isLoading?: boolean;
    isError?: boolean;
}

export interface CowListProps {
    cows?: Cow[];
    isLoading?: boolean;
    isError?: boolean;
}

export interface MedicalCheckListProps {
    medicalChecks?: MedicalCheck[];
    isLoading?: boolean;
    isError?: boolean;
}

export interface MilkProductionRespsonse {
    productions: MilkProduction[];
    totalMilk: number;
}

// State types for selected items
export type SelectedBirth = Birth | null;
export type SelectedCow = Cow | null;
export type SelectedMedicalCheck = MedicalCheck | null;
export type SelectedMilkProduction = MilkProduction | null;
