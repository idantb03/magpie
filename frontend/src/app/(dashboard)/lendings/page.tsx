import { LendingsList } from "@/components/feature/lending/lending-list";
import { CreateLendingButton } from "@/components/feature/lending/create-lending-button";

export default function LendingPage() {
  return (
    <main>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Lending Management</h1>
        <CreateLendingButton />
      </div>
      <LendingsList />
    </main>
  );
}
