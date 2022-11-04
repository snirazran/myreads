import ShelfChanger from "./ShelfChanger";

const BookshelfBooks = ({ shelf, update, getInfo }) => {
  return (
    <ol className="books-grid">
      {shelf.map((book) => (
        <li key={book.id}>
          <div className="book">
            <div className="book-top">
              <div
                className="book-cover"
                style={{
                  width: 128,
                  height: 192,
                  backgroundImage: "url(" + book.imageLinks.thumbnail + ")",
                }}
              ></div>
              <ShelfChanger
                getInfo={getInfo}
                shelf={shelf}
                book={book}
                update={update}
              />
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{book.authors}</div>
          </div>
        </li>
      ))}
    </ol>
  );
};

export default BookshelfBooks;
