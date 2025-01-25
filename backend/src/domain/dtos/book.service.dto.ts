export interface CreateBookDTO {
  title: string;
  author: string;
  isbn: string;
  quantity: number;
  categoryId: number;
  createdBy: number;
  description?: string;
  publisher?: string;
  publishYear?: number;
} 