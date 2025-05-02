import { useEffect } from "react"
import MovieCard from "../components/MovieCard"
import '../css/Home.css'
import {useInfiniteQuery} from '@tanstack/react-query'
import axios from 'axios'
import { useInView } from "react-intersection-observer";
import Search from "../components/Search"


function Home(){
    const {ref, inView} = useInView()
    const {data, fetchNextPage, isFetchingNextPage} = useInfiniteQuery({
        queryKey: ['movies'],
        queryFn:({pageParam})=>{
            return axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_MOVIEDB_API_KEY}&page=${pageParam}`)
        },
        initialPageParam:1,
        getNextPageParam:(_lastPage,allPages)=>{
            if(allPages.length < 100){
                return allPages.length+1;
            } else{
                return undefined
            }
        },
        staleTime: 60000 * 60 * 24
    })

    useEffect(()=>{
        if(inView) fetchNextPage();
    },[inView,fetchNextPage])


    return(
    <div className="home">
        <Search clickFn={'dispatch'}/>
        <h1 className="main-heading">Popular movies</h1>
         <div className="movies-grid">
            {data?.pages.map(page=>{
                return page.data.results.map(movie=><MovieCard key={movie.id} movie={movie}/>)
            })}
        <div ref={ref}>{isFetchingNextPage && <span>Loading...</span>}</div>
        </div>
    </div>
    )
}

export default Home