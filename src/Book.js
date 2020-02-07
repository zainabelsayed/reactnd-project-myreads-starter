import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Book extends Component{
    static propTypes={
        books:PropTypes.array.isRequired,
        updateShelf:PropTypes.func.isRequired
    }
    render(){
        const { books, updateShelf }=this.props;
        return(
            <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.map((book)=>(
                            <li key={book.id}>
                            <div className="book">
                              <div className="book-top">
                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                                <div className="book-shelf-changer">
                                  <select value={book.shelf ? book.shelf : 'none'} onChange={(e)=>{updateShelf(book,e.target.value)}}>
                                    <option value="move" disabled>Move to...</option>
                                    <option value="currentlyReading">Currently Reading</option>
                                    <option value="wantToRead">Want to Read</option>
                                    <option value="read">Read</option>
                                    <option value="none">None</option>
                                  </select>
                                </div>
                              </div>
                              <div className="book-title">{book.title}</div>
                              {book.authors?( book.authors.map((author)=>(
                                <div className='book-authors'key={author}>{author}</div>
                              ))) :
                              (<div className='book-authors'>Unknown Author</div>)
                              }
                            </div>
                          </li>
                        ))}
                        
                      
                    </ol>
                </div>
        )
    }
}
export default Book