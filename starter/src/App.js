import "./App.css";
import { useState, useEffect } from "react";
import SearchPage from "./components/SearchPage/SearchPage";
import { getAll, update, search } from "../src/BooksAPI";
import BookshelfBooks from "../src/components/bookshelfBooks/Book/BookshelfBooks";

function App() {
  //Use Effect - Fetching All Books

  //All Use States
  const [allBooks, setAllBooks] = useState([]);
  const [currentlyReading, setCurrentlyReading] = useState([]);
  const [wantToRead, setWantToRead] = useState([]);
  const [read, setRead] = useState([]);
  const [showSearchPage, setShowSearchpage] = useState(false);
  const [newSearch, setNewSearch] = useState([]);

  const getInfo = () => {
    getAll().then((res) => setAllBooks(res));
    getAll()
      .then((res) => res.filter((book) => book.shelf === "currentlyReading"))
      .then((data) => {
        setCurrentlyReading(data);
      });
    getAll()
      .then((res) => res.filter((book) => book.shelf === "wantToRead"))
      .then((data) => {
        setWantToRead(data);
      });
    getAll()
      .then((res) => res.filter((book) => book.shelf === "read"))
      .then((data) => {
        setRead(data);
      });
  };

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <div className="app">
      {showSearchPage ? (
        <SearchPage
          getInfo={getInfo}
          allBooks={allBooks}
          setShowSearchpage={setShowSearchpage}
          showSearchPage={showSearchPage}
          update={update}
          setNewSearch={setNewSearch}
          newSearch={newSearch}
        />
      ) : (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <div className="bookshelf-books">
                  <BookshelfBooks
                    getInfo={getInfo}
                    shelf={currentlyReading}
                    update={update}
                  />
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Want to Read</h2>
                <div className="bookshelf-books">
                  <BookshelfBooks
                    getInfo={getInfo}
                    shelf={wantToRead}
                    update={update}
                  />
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                  <BookshelfBooks
                    getInfo={getInfo}
                    shelf={read}
                    update={update}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="open-search">
            <a onClick={() => setShowSearchpage(!showSearchPage)}>Add a book</a>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
