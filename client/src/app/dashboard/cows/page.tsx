import { Metadata } from 'next';
import { CowList } from './components/cow-list';
import { AddCowForm } from './components/add-cow-form';

export const metadata: Metadata = {
    title: 'Cows Management',
    description: "Manage your farm's cows",
};

export default function CowsPage() {
    return (
        <div className='space-y-6'>
            <h1 className='text-3xl font-bold'>Cows Management</h1>
            <AddCowForm />
            <CowList />
        </div>
    );
}
