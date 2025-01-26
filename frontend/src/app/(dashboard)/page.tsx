import { MostBorrowedBooks } from '@/components/dashboard/MostBorrowedBooks';
import { MonthlyTrends } from '@/components/dashboard/MonthlyTrends';
import { CategoryDistribution } from '@/components/dashboard/CategoryDistribution';

export default function DashboardPage() {
  return (
    <main className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <MostBorrowedBooks />
        <MonthlyTrends />
      </div>
      <CategoryDistribution />
    </main>
  );
}