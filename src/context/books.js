import { createContext, useCallback, useState } from "react";
import axios from "axios";

const BooksContext = createContext();


function Provider({children}){
    const [books,setBooks] = useState([]);

    //Se utiliza useCallback para que no entre en un loop infinito 
    //ek useEffect de App. Ya que por cada renderización se asociaría una nueva
    //arrow function y en sí siempre es la misma. 
    //SOLUCIÓN AL WARNING DE esLint . UseEffect has missing dependencies
    const fetchBooks = useCallback(async () =>{
        const {data} = await axios.get('http://localhost:3001/books');
        setBooks(data);
    },[]);

    const deleteBookById = async (id) => {
        await axios.delete(`http://localhost:3001/books/${id}`);
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
    const valueToShare = {
        books,
        fetchBooks,
        createBook,
        editBookById,
        deleteBookById
    };

    return <BooksContext.Provider value={valueToShare}>
            {children}
    </BooksContext.Provider>;

}

export { Provider };
export default BooksContext;
