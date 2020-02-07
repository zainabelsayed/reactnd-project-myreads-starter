import React,{ Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Book from './Book'

class ListBooks extends Component{

    static propTypes={
        books:PropTypes.array.isRequired,
        updateShelf:PropTypes.func.isRequired
    }
    
    render(){
        const { books , updateShelf}= this.props;
        return(
            <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <Book
                    books={books.filter((book)=>(
                        book.shelf==='currentlyReading'
                    ))}
                    updateShelf={updateShelf}
                   />
                </div>
                </div>
                <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want To Read</h2>
                  <Book
                    books={books.filter((book)=>(
                        book.shelf==='wantToRead'
                    ))}
                    updateShelf={updateShelf}
                   />
                </div>
                </div>
                <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <Book
                    books={books.filter((book)=>(
                        book.shelf==='read'
                    ))}
                    updateShelf={updateShelf}
                   />
                </div>
                </div>
            </div>
            
            <Link 
            className='open-search' 
            to='/search'>
                <button>Add a Book</button>
                </Link>
            
        </div>
        )
    }
}
export default ListBooks