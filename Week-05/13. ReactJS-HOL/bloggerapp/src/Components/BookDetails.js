import React from "react";
export const books = [
    { id: 101, bname: "Master React", price: 670 },
    { id: 102, bname: "Deep Dive into Angular 11", price: 800 },
    { id: 103, bname: "Mongo Essentials", price: 450 }
];
function BookDetails(props) {
    return (
        <div className="section">
            <h1>Book Details</h1>
            {
                props.books.map((book) => (
                    <div key={book.id}>
                        <h3>{book.bname}</h3>
                        <h4>{book.price}</h4>
                    </div>
               ))
            }
        </div>
    );
}

export default BookDetails;