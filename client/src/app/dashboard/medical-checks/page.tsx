import { Metadata } from 'next';
import { MedicalCheckList } from './components/medical-check-list';
import { AddMedicalCheckForm } from './components/add-medical-check-form';
import { useQuery } from '@tanstack/react-query';
import { fetchMedicalChecks } from '@/lib/api';

export const metadata: Metadata = {
    title: 'Medical Checks',
    description: 'Manage medical checks for your cows',
};

export default function MedicalChecksPage() {
    return (
        <div className='space-y-6'>
            <h1 className='text-3xl font-bold'>Medical Checks</h1>
            <AddMedicalCheckForm />
            <MedicalCheckList />
        </div>
    );
}
