import { Metadata } from 'next';
import { BirthList } from './components/birth-list';
import { AddBirthForm } from './components/add-birth-form';

export const metadata: Metadata = {
    title: 'Births',
    description: 'Manage birth records for your cows',
};

export default function BirthsPage() {
    return (
        <div className='space-y-6'>
            <h1 className='text-3xl font-bold'>Births</h1>
            <AddBirthForm />
            <BirthList />
        </div>
    );
}
