export interface CreateLendingDTO {
  bookId: number;
  memberId: number;
  borrowedDate: Date;
  dueDate: Date;
  status: string;
  notes?: string;
  createdBy: number;
}

export interface ReturnBookDTO {
  returnDate: Date;
  notes?: string;
} 