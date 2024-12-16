import { MilkProductionList } from './components/milk-production-list';
import { AddMilkProductionForm } from './components/add-milk-production-form';

export default function MilkProductionPage() {
    return (
        <div className='space-y-6'>
            <h1 className='text-3xl font-bold'>Milk Production</h1>
            {/* <MilkProductionChart data={milkProduction} /> */}
            <AddMilkProductionForm />
            <MilkProductionList />
        </div>
    );
}
