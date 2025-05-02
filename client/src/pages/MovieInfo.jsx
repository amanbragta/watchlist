import '../css/MovieInfo.css'
import { useNavigate, useParams } from "react-router-dom"
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../store/userSlice';

function MovieInfo(){
    const selector = useSelector(state=>state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {movieId} = useParams()
    const isFavourite = selector.saved.some(movie => movie.id==movieId)
    const {data} = useQuery({
        queryKey:["movie",movieId],
        queryFn:()=>{
            return axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
                headers:{
                    Authorization: import.meta.env.VITE_MOVIEDB_BEARER_TOKEN
                }
            })
        }
    })
    async function onFavouriteClick(){
        await axios.patch(`${import.meta.env.VITE_API_URL}/save/toggle`,{...data.data},{withCredentials:true})
        dispatch(getUser())
    }
    


    return(
        <div className="">
            {data?.data? (
                <div className='thumbnail-area'>
                <h1 className='movie-title'>{data?.data.title} </h1>
                <div className='main-area'>
                    <div className='main-image'>
                    <img src={`https://image.tmdb.org/t/p/w500${data?.data.poster_path}`} alt=""/>
                    </div>
                    <div className="desc-area">
                    <p>
                    {data?.data.overview}
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
                            <div>{data?.data.runtime} mins</div>
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
                            <div>{data?.data.release_date}</div>
                            </div>
                            </div>
                    </div>
                    {!selector.user ? (
                         <div className='sign-in-area'>
                         Sign in to add to watchlist.
                         <button onClick={()=>navigate('/login')} className='btn-sign-in'>Sign In</button>
                    </div>
                    ): !isFavourite ? (
                        <button className='btn' onClick={onFavouriteClick}>Add to Watch-list</button>
                    ):(<button className='btn' onClick={onFavouriteClick}>Remove from Watch-list</button>)}
                    </div>
                </div>
                </div>
            ): <div>Loading</div>}
            
       
        </div>
    )
}

export default MovieInfo