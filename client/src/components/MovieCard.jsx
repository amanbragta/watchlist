import '../css/MovieCard.css'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { failedOptimisticSave, getUser, optimisticSave } from '../../store/userSlice'
import {useMutation} from '@tanstack/react-query'

function MovieCard({movie}){
    const selector = useSelector(state=>state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isFavourite = selector?.saved?.some(savedMovie=>savedMovie.id===movie.id)
    const {mutate} = useMutation({
        mutationFn: (movie)=>{
            return axios.patch(`${import.meta.env.VITE_API_URL}/save/toggle`,{...movie},{withCredentials:true})
        },
        onMutate:()=>{
            const staleData = selector.saved
            dispatch(optimisticSave(movie))
            return staleData
        },
        onError:(_error,_movie,context)=>{
            dispatch(failedOptimisticSave(context))
        },
        onSettled:()=>{
            dispatch(getUser())
        }
    })
    async function onFavouriteClick(){
        // await axios.patch(`${import.meta.env.VITE_API_URL}/save/toggle`,{...movie},{withCredentials:true})
        // dispatch(getUser())
        mutate(movie)
    }
    return(
        <div className="movie-card">
            <div className="movie-poster">
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt=""/>
                <div className="movie-overlay">
                    {selector.user && (
                        <button onClick={onFavouriteClick} className={`favorite-btn ${isFavourite ? "active":""}`}>
                        ♥
                    </button>
                    )}
                </div>
            </div>
            <div className="movie-info">
                <div className='movie-info-title'>
                    <div>
                    <Link to={'/movie/'+ movie.id}> <h3>{movie.title}</h3> </Link>
                    </div>
                    <div className='save-icon' onClick={selector.user?onFavouriteClick:()=>navigate('/login')}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill={isFavourite?"#646cff":"none"} viewBox="0 0 24 24" strokeWidth={1.5} stroke="#646cff" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                        </svg>
                    </div>
                </div>
                <p>{movie.release_date?.split('-')[0]}</p>
            </div>
        </div>
    )
}

export default MovieCard