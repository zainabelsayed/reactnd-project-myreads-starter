import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Book from './Book'



class SearchBook extends Component{
    static propTypes={
        updateShelf:PropTypes.func.isRequired
    }
    state={
        query:'', // the search query
        results:[] // search results
    }
    //if there is asearch query this function call the search function 
    updateQuery=(query)=>{
       if(query!==''){
            this.setState({
                query:query,
                results:[]
            })
            this.search(query);
       }
       else{
           this.clearQuery()
       }
        
    }
    //this functions clears the search query  
    clearQuery=()=>{
        this.setState(()=>({
            results:[],
            query:''
        }))
    }
    // this function calls the BookAPI search method and then call the updateBook function
    search=(query)=>{
        BooksAPI.search(query)
        .then((searchResult)=>{
            this.setState(()=>({
                results:this.updateBook(searchResult)
            }))
        })
    }
    // this function takes the search results and compare it with the myBookShelf and add the new books
    updateBook=(searchResult)=>{
            const myBookShelf=this.props.books;
        const addBook=searchResult.filter((result)=>(
            myBookShelf.find((book)=>{
                if(book.id===result.id){
                    book.shelf=result.shelf
                    return result
                }
            })
        ))
        myBookShelf.concat(addBook);
        return searchResult
    }

    render(){
        const { query, results }= this.state;
        const { updateShelf }=this.props;
        console.log(results);
        return(
            <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search"
                    to='/'>
                  Close</Link>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author"
                value={query}
                onChange={(event)=> this.updateQuery(event.target.value)}/>

              </div>
            </div>
            <div className="search-books-results">
                 {results?
                 (<Book
                 books={results}
                 updateShelf={updateShelf}
               />):
               (
                   <p>No results for this quers</p>
               )
               } 
            </div>
          </div>
        )
    }
}

export default SearchBook