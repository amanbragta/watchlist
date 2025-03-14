import { createContext, useEffect, useState } from "react";
import { supabase } from "../services/client";

export const MovieContext = createContext()

export const MovieProvider = ({children})=>{
    const [favourites,setFavourites] = useState([])
    const [session,setSession] = useState()

    useEffect(()=>{
        supabase.auth.getSession()
        .then(result=>{
            const currSession = result.data?.session?.user?.id
            setSession(currSession)
            if(currSession){
                supabase.from('saved_movies')
            .select('movie')
            .eq('user_id',currSession)
            .then((result)=>{
                setFavourites(result.data)}
            )
            }
        })
    },[])

    const addToFavourites = (movie)=>{
        supabase.from('saved_movies')
        .insert({
            user_id:session,
            movie,
            movie_id:movie.id
        }).then(()=>{
            setFavourites([...favourites,movie={movie}])
        })
    }

    const removeFromFavourites = (movieId)=>{
        supabase.from('saved_movies')
        .delete()
        .eq('user_id',session)
        .eq('movie_id',movieId)
        .then(()=>{
            setFavourites((prev)=>prev.filter(favourite=>(favourite.movie.id!==movieId)))
        })
    }

    const isFavourite = (movieId)=>{
        return favourites.some(favourite=>{
             return favourite.movie.id===movieId 
            })
    }

    const value = {
        favourites,
        addToFavourites,
        removeFromFavourites,
        isFavourite,
        session,
        setSession
    }

    return(
        <MovieContext.Provider value={value}>
            {children}
        </MovieContext.Provider>
    )
}