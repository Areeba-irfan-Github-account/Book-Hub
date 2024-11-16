import { NextResponse } from "next/server";

interface Book {
  id: number;
  title: string;
  author: string;
  available: boolean;
}

let books: Book[] = [
    {
        id: 1,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        available: true,
      },
      {
        id: 2,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        available: true,
      },
      {
        id: 3,
        title: "1984",
        author: "George Orwell",
        available: true,
      },
      {
        id: 4,
        title: "Pride and Prejudice",
        author: "Jane Austen",
        available: true,
      },
      {
        id: 5,
        title: "The Catcher in the Rye",
        author: "J.D. Salinger",
        available: true,
      },
      {
        id: 6,
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        available: true,
      },
];

// GET Method
export async function GET() {
  return NextResponse.json(books, { status: 200 });
}

// POST Method
export async function POST(req: Request) {
  try {
    const newBook: Book = await req.json();
    books.push({ ...newBook, id: books.length + 1 });
    return NextResponse.json({ message: "Book added successfully!" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error adding book!",error }, { status: 500 });
  }
}

// PUT Method
export async function PUT(req: Request) {
  try {
    const updatedBook: Book = await req.json();
    books = books.map((book) =>
      book.id === updatedBook.id ? { ...book, ...updatedBook } : book
    );
    return NextResponse.json({ message: "Book updated successfully!" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error updating book!",error }, { status: 500 });
  }
}

// DELETE Method
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    books = books.filter((book) => book.id !== id);
    return NextResponse.json({ message: "Book deleted successfully!" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error deleting book!",error }, { status: 500 });
  }
}