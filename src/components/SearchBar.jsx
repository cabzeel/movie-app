import React, { useEffect } from 'react'


const SearchBar = ({searchTerm, setSearchTerm, handleSubmit}) => {

   useEffect(() => {
         
      }, [])
   
  return (
    <div className='search'>
      <div>
         <img src='search.svg' alt='search' />
         <input 
            type='text'
            placeholder='search through thousands of movies'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
         />
         <button 
            onClick={handleSubmit} className='text-white'
         >
            Search
         </button>
        
      </div>
    </div>
  )
}

export default SearchBar