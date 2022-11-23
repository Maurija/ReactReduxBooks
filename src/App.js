import React from "react";
import { useState  } from "react";
import BookCreate from "./components/BookCreate";
import BookList from "./components/BookList";


const App = () => {
    const [books,setBooks] = useState([]);

    

    const deleteBookById = (id) => {
        const updatedBooks = books.filter((book) => book.id!==id);
        setBooks(updatedBooks);        
    }
    const editBookById = (id,title) => {        
        const updatedBooks = books.map((book) => {
            if (book.id===id){
                return {...book,title}
            }
            return book;
        });
        setBooks(updatedBooks);
    }

    const createBook = (title) => {
        const newId = Math.round(Math.random() * 9999);
        console.log(newId)
        const updatedBooks = [...books,{id: newId, title}];
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