import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateState } from "../../store/searchSlice";

function Search() {
   
    const dispatch = useDispatch()
    const [searchQuery,setSearchQuery] = useState('')
    const navigate = useNavigate()

    const handleForm = (e)=>{
        e.preventDefault();
        dispatch(updateState(searchQuery))
        navigate('/search')
    }
  return (
    <div>
         <form onSubmit={handleForm} className="search-form">
            <input type="text" placeholder="Search for movies" className="search-input" value={searchQuery} onChange={e=>setSearchQuery(e.target.value)}/>
            <button className="search-button" type="submit">Search</button>
        </form>
    </div>
  )
}

export default Search