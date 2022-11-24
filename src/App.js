import React, { useEffect } from "react";
import axios from "axios";
import { useState  } from "react";
import BookCreate from "./components/BookCreate";
import BookList from "./components/BookList";


const App = () => {
    const [books,setBooks] = useState([]);

    const fetchBooks = async () =>{
        const {data} = await axios.get('http://localhost:3001/books');
        setBooks(data);
    }

    useEffect(()=>{
        fetchBooks();
    },[]);

    const deleteBookById = async (id) => {
        const response = await axios.delete(`http://localhost:3001/books/${id}`);
        const updatedBooks = books.filter((book) => book.id!==id);
        setBooks(updatedBooks);        
    }
    const editBookById = async (id,title) => {    
        const response = await axios.put(`http://localhost:3001/books/${id}`,{title});
        
        const updatedBooks = books.map((book) => {
            if (book.id===id){
                return {...book,...response.data}
            }
            return book;
        });
        setBooks(updatedBooks);
    }

    const createBook = async (title) => {
        const {data} = await axios.post('http://localhost:3001/books',{
            title
        });
        
        const updatedBooks = [...books,data];
        setBooks(updatedBooks);
    };

    return (
        <div className="app">
            <h1>Reading List</h1>
            <BookList books={books} onDelete={deleteBookById} onEdit={editBookById}/>
            <BookCreate onCreate={createBook} />
        </div>
        
    );
};

export default App;