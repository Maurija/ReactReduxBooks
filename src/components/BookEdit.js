import React, { useState } from "react";

import useBooksContext from "../hooks/use-hooks-context";
const BookEdit = ({book,onSubmit}) => {

    const [text,setText] = useState(book.title);
    const {editBookById} = useBooksContext();
    
   
    const handleSubmit = (event) => {
        event.preventDefault();
        editBookById(book.id,text);   
        onSubmit(); 
    }

    return (
        <form className="book-edit" onSubmit={handleSubmit}>
            <label>Title</label>
            <input className="input" onChange={(e) => setText(e.target.value)} value={text}/>
            <button className="button is-primary">
                Save
            </button>
        </form>
    ); 
}

export default BookEdit;