import { useContext } from 'react'
import '../css/Favourites.css'
import { MovieContext } from '../contexts/MovieContext'
import MovieCard from '../components/MovieCard'
import { supabase } from '../services/client'
function Favourites(){
    const {favourites,session,setSession} = useContext(MovieContext)
    async function signIn(){
        await supabase.auth.signInWithOAuth({
            provider: 'google',
          })
    }
    function signOut(){
       supabase.auth.signOut().then(()=> setSession(null))
    }
    return(
        <div>
            {!session ? (
                <div>
                     Sign in to save or view your watchlist.
                     <button onClick={signIn}>Sign In</button>
                </div>
            ):(
                <div>
                <button onClick={signOut}>Sign out</button>
                {
                    (favourites?.length>0 ? (
                        <div className='favorites'>
                        <h2>Your favourites</h2>
                    <div className="movies-grid">
                    {favourites.map(favourite=><MovieCard key={favourite.movie.id} movie={favourite.movie}/>)}
                   </div>
                   </div>
                    ): (<div className='favorites-empty'>
                        <h2>No favourite movies yet</h2>
                        <p>Start adding movies to your favourites and they will appear here!</p>
                    </div>))
                }
                </div>
            )}
        </div>
    )
}
export default Favourites