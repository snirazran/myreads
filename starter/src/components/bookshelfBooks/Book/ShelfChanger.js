const ShelfChanger = ({ shelf, book, update, getInfo }) => {
  return (
    <div className="book-shelf-changer">
      {
        <select
          onChange={(e) => {
            const newShelf = e.target.value;
            update(book, newShelf);
            getInfo();
          }}
          defaultValue={shelf[0].shelf}
        >
          <option value="none" disabled>
            Move to...
          </option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      }
    </div>
  );
};

export default ShelfChanger;
