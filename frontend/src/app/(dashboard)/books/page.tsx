import { BooksList } from "@/components/feature/book/book-list";
import { CreateBookButton } from "@/components/feature/book/create-book-button";


export default function BooksPage() {
  return (
    <main>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Books Management</h1>
        <CreateBookButton />
      </div>
      <BooksList />
    </main>
  );
}
