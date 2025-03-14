import { useContext } from 'react'
import '../css/MovieCard.css'
import { MovieContext } from '../contexts/MovieContext'
function MovieCard({movie}){
     const {addToFavourites,removeFromFavourites,isFavourite, session} = useContext(MovieContext)
     const favourite = isFavourite(movie.id)
    function onFavouriteClick(){
        if(favourite) removeFromFavourites(movie.id)
        else addToFavourites(movie)
    }
    return(
        <div className="movie-card">
            <div className="movie-poster">
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt=""/>
                <div className="movie-overlay">
                    {session && (
                        <button onClick={onFavouriteClick} className={`favorite-btn ${favourite ? "active":""}`}>
                        ♥
                    </button>
                    )}
                </div>
            </div>
            <div className="movie-info">
                <h3>{movie.title}</h3>
                <p>{movie.release_date?.split('-')[0]}</p>
            </div>
        </div>
    )
}

export default MovieCard