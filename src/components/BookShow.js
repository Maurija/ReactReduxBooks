import React, { useState } from "react";
import BookEdit from "./BookEdit";

const BookShow = ({book,onDelete,onEdit}) => {
    const [edit,setEdit] = useState(false);
    
    const handleDelete = () =>{
        onDelete(book.id);
    }

    const handleEdit = () =>{
        setEdit(!edit);
    }

    const onHandleSubmit = (title) => {
        setEdit(false);
        onEdit(book.id,title);        
    }

    const isEdit = () => {
        if (!edit){
            return book.title;
        }
        return <BookEdit book={book} onSubmit={onHandleSubmit} />
    }
    return (
        <div className="book-show">
            <img 
                alt="books"
                src={`https://picsum.photos/seed/${book.id}/300/200`}
            />
            {isEdit()}
            <div className="actions">
                <button className="edit" onClick={handleEdit}>Edit</button>
                <button className="delete" onClick={handleDelete}>
                    Delete
                </button>
            </div>
           
        </div>
        
    );
}

export default BookShow;