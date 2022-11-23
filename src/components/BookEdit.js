import React, { useState } from "react";

const BookEdit = ({book, onSubmit}) => {

    const [text,setText] = useState(book.title);
    
   
    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(text);
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