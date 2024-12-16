import api from './http-client';
import {
    Cow,
    MedicalCheck,
    Birth,
    MilkProduction,
    User,
    MilkProductionRespsonse,
} from '../types';
import { setCookie } from 'cookies-next';
// Cow handlers
export const fetchCows = async (): Promise<Cow[]> => {
    const response = await api.get('/cows');
    return response.data;
};

export const addCow = async (cowData: Omit<Cow, 'id'>): Promise<Cow> => {
    const response = await api.post('/cows', cowData);
    return response.data;
};

export const updateCow = async ({ id, ...cowData }: Cow): Promise<Cow> => {
    const response = await api.put(`/cows/${id}`, cowData);
    return response.data;
};

export const deleteCow = async (id: string): Promise<void> => {
    const response = await api.delete(`/cows/${id}`);
    return response.data;
};

// Medical check handlers
export const fetchMedicalChecks = async (): Promise<MedicalCheck[]> => {
    const response = await api.get('/medical-checks');
    return response.data;
};

export const addMedicalCheck = async (
    checkData: Omit<MedicalCheck, 'id'>
): Promise<MedicalCheck> => {
    const response = await api.post('/medical-checks', checkData);
    return response.data;
};

export const updateMedicalCheck = async ({
    id,
    ...checkData
}: MedicalCheck): Promise<MedicalCheck> => {
    const response = await api.put(`/medical-checks/${id}`, checkData);
    return response.data;
};

export const deleteMedicalCheck = async (id: string): Promise<void> => {
    const response = await api.delete(`/medical-checks/${id}`);
    return response.data;
};

// Birth handlers
export const fetchBirths = async (): Promise<Birth[]> => {
    const response = await api.get('/births');
    return response.data;
};

export const addBirth = async (
    birthData: Omit<Birth, 'id'>
): Promise<Birth> => {
    const response = await api.post('/births', birthData);
    return response.data;
};

export const updateBirth = async ({
    id,
    ...birthData
}: Birth): Promise<Birth> => {
    const response = await api.put(`/births/${id}`, birthData);
    return response.data;
};

export const deleteBirth = async (id: string): Promise<void> => {
    const response = await api.delete(`/births/${id}`);
    return response.data;
};

// Milk production handlers
export const fetchMilkProduction =
    async (): Promise<MilkProductionRespsonse> => {
        const response = await api.get('/milk-production');
        return response.data;
    };

export const addMilkProduction = async (
    productionData: Omit<MilkProduction, 'id'>
): Promise<MilkProduction> => {
    const response = await api.post('/milk-production', productionData);
    return response.data;
};

export const updateMilkProduction = async ({
    id,
    ...productionData
}: MilkProduction): Promise<MilkProduction> => {
    const response = await api.put(`/milk-production/${id}`, productionData);
    return response.data;
};

export const deleteMilkProduction = async (id: string): Promise<void> => {
    const response = await api.delete(`/milk-production/${id}`);
    return response.data;
};

// Authentication handler
export const login = async (
    credentials: Pick<User, 'username' | 'password'>
): Promise<{ token: string }> => {
    const response = await api.post('/auth/login', credentials);
    const user = response.data;

    localStorage.setItem('token', response.data.token);
    setCookie('user', user, {
        httpOnly: false,
        secure: false,
        maxAge: 60 * 60 * 24 * 7,
        path: '/', // Available throughout the site
    });

    return response.data;
};
