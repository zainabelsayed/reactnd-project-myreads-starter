import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks'
import SearchBook from './SearchBook'
import { Route } from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    books:[],
    
  }
  // gets the books array from the BookAPI 
  componentDidMount(){
    BooksAPI.getAll()
    .then((books)=>{
      this.setState(()=>({
        books
      }))
    })
  }

  // updates the book shelf state
  updateShelf=(book,shelf)=>{
    const  sameBook=this.state.books.find((s)=>(s.id===book.id))
      if(sameBook){
        sameBook.shelf=shelf;
        BooksAPI.update(book,shelf)
        .then(this.setState((currentState)=>({
          books: currentState.books
        })))
      }
      else{
        book.shelf=shelf;
        BooksAPI.update(book,shelf)
        .then(this.setState((currentState)=>({
          books: currentState.books.concat(book)
        })))
      }
  }
  /*updateShelf=(book,shelf)=>{

    BooksAPI.update(book,shelf)

   BooksAPI.getAll().then(data=>{
    this.setState({
      books:data
    })
  })
  }*/
  
  render() {
    console.log(this.state.books)
    return (
      <div className="app">
          <Route exact path='/' render={()=>(
            <ListBooks
            books={this.state.books}
            updateShelf={this.updateShelf}
          />
          )}/>
          
          <Route exact path='/search' render={()=>(
          <SearchBook
          books={this.state.books}
          updateShelf={this.updateShelf}
          
          />
          )}/>
          
          
      </div>
      
    )
  }
}

export default BooksApp
