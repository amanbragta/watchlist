import { useInfiniteQuery } from "@tanstack/react-query"
import axios from "axios"
import MovieCard from "../components/MovieCard"
import { useSelector } from "react-redux"
import { useState } from "react"

function SearchPage() {
    const searchState = useSelector(state=>state.search)
    const [searchQuery,setSearchQuery] = useState(searchState)
    const {data, refetch,fetchNextPage, hasNextPage} = useInfiniteQuery({
        queryKey:["search"],
        queryFn: ({pageParam}) => {
            return axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_MOVIEDB_API_KEY}&query=${searchQuery.replaceAll(" ","+")}&page=${pageParam}`)
        },
        initialPageParam:1,
        getNextPageParam: (lastPage, allPages)=>{
            if(lastPage.data.total_pages > allPages.length){
                return allPages.length + 1
            } else{
                return undefined
            }
        }
    })
    function handleFetch(e){
        e.preventDefault()
        refetch()
    }
  return (
    <div>
        <form onSubmit={handleFetch} className="search-form">
            <input type="text" placeholder="Search for movies" className="search-input" value={searchQuery} onChange={e=>setSearchQuery(e.target.value)}/>
            <button className="search-button" type="submit">Search</button>
        </form>
        <div className="movies-grid">
        {data?.pages.map(page=>{
                return page.data.results.map(movie=><MovieCard key={movie.id} movie={movie}/>)
            })}
        </div>
        <button onClick={fetchNextPage} disabled={!hasNextPage}>Next</button>
    </div>
  )
}

export default SearchPage