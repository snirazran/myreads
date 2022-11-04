import { search } from "../../BooksAPI.js";

const SearchPage = ({
  allBooks,
  setShowSearchpage,
  showSearchPage,
  update,
  newSearch,
  setNewSearch,
  getInfo,
}) => {
  const findValue = (searchedBook) => {
    const value = allBooks.find((book) => book.id === searchedBook.id);
    if (typeof value === "object" && value.shelf) {
      return value.shelf;
    }
    return null;
  };
  return (
    <div className="search-books">
      <div className="search-books-bar">
        <a
          className="close-search"
          onClick={() => setShowSearchpage(!showSearchPage)}
        >
          Close
        </a>
        <div className="search-books-input-wrapper">
          <input
            onChange={(e) => {
              let target = e.target.value;
              search(target).then((res) => {
                if (res instanceof Array) {
                  console.log(res);
                  setNewSearch(res);
                }
              });
            }}
            type="text"
            placeholder="Search by title, author, or ISBN"
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {newSearch &&
            newSearch.map((book) => (
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div
                      className="book-cover"
                      style={{
                        width: 128,
                        height: 192,
                        backgroundImage: book.imageLinks
                          ? `url(${book.imageLinks.thumbnail})`
                          : "",
                      }}
                    ></div>
                    <div className="book-shelf-changer">
                      <select
                        onChange={(e) => {
                          const newShelf = e.target.value;
                          update(book, newShelf);
                          getInfo();
                        }}
                        defaultValue={
                          findValue(book) ? findValue(book) : "none"
                        }
                      >
                        <option value="none" disabled>
                          Move to...
                        </option>
                        <option value="currentlyReading">
                          Currently Reading
                        </option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">{book.authors}</div>
                </div>
              </li>
            ))}
        </ol>
      </div>
    </div>
  );
};

export default SearchPage;
