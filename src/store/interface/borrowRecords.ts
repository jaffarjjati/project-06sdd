interface Book {
  id: string;
  cover: string;
  title: string;
  author: string;
  isbn: string;
  published_date: string;
  publisher: string;
  description: string | null;
  language: string;
  genres: string[];
}

interface BorrowRecord {
  id: string;
  borrow_date: string;
  due_date: string;
  return_date: string | null;
  book: Book;
  user_name: string;
}
