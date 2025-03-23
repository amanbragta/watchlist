import '../css/MovieInfo.css'
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import { getMovieDetails } from "../services/api";
import { MovieContext } from '../contexts/MovieContext';
import { supabase } from '../services/client';

function MovieInfo(){
    const {pathname} = useLocation();
    const [movie,setMovie] = useState()
    const {addToFavourites,
        removeFromFavourites,
        isFavourite,session} = useContext(MovieContext)
    const [fav,setFav] = useState()
    async function signIn(){
            await supabase.auth.signInWithOAuth({
                provider: 'google',
              })
        }
    useEffect(()=>{
       const movieDetails = async ()=>{
        try{
            const res = await getMovieDetails(pathname.split('/')[2])
            setMovie(res)
            const isFav = isFavourite(res.id)
            setFav(isFav)
        } catch(err){
            console.log(err)
        }
       }
        movieDetails()
    },[])

    return(
        <div className="">
            {movie? (
                <div className='thumbnail-area'>
                <h1>{movie?.title} </h1>
                <div className='main-area'>
                    <div>
                    <img src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`} alt=""/>
                    </div>
                    <div className="desc-area">
                    <p>
                    {movie?.overview}
                    </p>
                    <div className='specs-area'>
                        <div className='specs'>
                            <div className='icon'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
                            </div>
                            <div>
                                <span className='spec-heading'>Runtime:</span>
                            <div>{movie?.runtime} mins</div>
                            </div>
                             </div>
                        <div className='specs'>
                            <div className='icon'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
    </svg>
                            </div>
                            <div>
                                <span className='spec-heading'>Release date:</span>
                            <div>{movie?.release_date}</div>
                            </div>
                            </div>
                    </div>
                    {!session ? (
                         <div className='sign-in-area'>
                         Sign in to add to watchlist.
                         <button onClick={signIn} className='btn-sign-in'>Sign In</button>
                    </div>
                    ): !fav ? (
                        <button className='btn' onClick={()=>{
                            setFav(true)
                            addToFavourites(movie)
                        }}>Add to Watch-list</button>
                    ):(<button className='btn' onClick={()=>{
                        setFav(false)
                        removeFromFavourites(movie?.id)
                    }}>Remove from Watch-list</button>)}
                    </div>
                </div>
                </div>
            ): <div>Loading</div>}
            
       
        </div>
    )
}

export default MovieInfo