"use client";
import Image from "next/image";
import React, { useEffect, useState } from 'react'
import Navbar from "../components/Navbar";
type Book = {
    id: number;
    title: string;
    author: string;
    image: string;
    available: boolean;
};


const CreateBook = () => {
    const [books, setBooks] = useState<Book[]>([]);

    const [newBook, setNewBook] = useState<{
        title: string;
        author: string;
        image: string | File;
        available: boolean;
    }>({
        title: "",
        author: "",
        image: "",
        available: true,
    });
    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const res = await fetch("/api/books");
            const data = await res.json();
            setBooks(data);
        } catch (error) {
            console.error("Error fetching books:", error);
        }
    };


    const addBook = async () => {

        try {
            const formData = new FormData();
            formData.append("title", newBook.title);
            formData.append("author", newBook.author);
            formData.append("image", newBook.image);
            formData.append("available", newBook.available.toString());

            await fetch("/api/books", {
                method: "POST",
                body: JSON.stringify(newBook),
                headers: { "Content-Type": "application/json" },
            });
            setNewBook({ title: "", author: "", image: "", available: true });
            fetchBooks();
        } catch (error) {
            console.error("Error adding book:", error);
        }
    };

    const handleImageUpload = (
        e: React.ChangeEvent<HTMLInputElement>,
        setState: React.Dispatch<
            React.SetStateAction<{
                title: string;
                author: string;
                image: string | File;
                available: boolean;
            }>
        >
    ) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setState((prev) => ({ ...prev, image: reader.result as string }));
            };
            reader.readAsDataURL(file); // Convert the file to a base64 string
        }
    };
    return (
        <div>
            <Navbar />
            <div className=" max-w-3xl mx-auto ">
                <div className="my-[20px] flex flex-col justify-center items-center w-full">
                    <h2 className="text-2xl my-3 font-bold">Add a New Book</h2>
                    <input
                        type="file"
                        onChange={(e) => handleImageUpload(e, setNewBook)}
                        className="md:w-[50%] w-[100%] p-3 my-2 bg-white"
                    />

                    <input
                        type="text"
                        placeholder="Title"
                        value={newBook.title}
                        onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                        className="md:w-[50%] w-[100%] py-1 px-4 rounded-md border"
                    />
                    <input
                        type="text"
                        placeholder="Author"
                        value={newBook.author}
                        onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                        className="md:w-[50%] w-[100%] py-1 px-4 mt-4 rounded-md border"
                    />
                    <button
                        className="bg-black text-white mx-auto  py-3 text-xl rounded my-2 md:w-[20%] w-[90%]"
                        onClick={addBook}
                    >
                        Add Book
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CreateBook