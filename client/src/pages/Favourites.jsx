import '../css/Favourites.css'
import MovieCard from '../components/MovieCard'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { resetUser } from '../../store/userSlice'

function Favourites(){
    const navigate = useNavigate()
    const selector = useSelector(state=>state.user)
    const dispatch = useDispatch()

    async function signOut(){
        try{
            await axios.post(`${import.meta.env.VITE_API_URL}/auth/logout`,{},{withCredentials:true})
            dispatch(resetUser())
            navigate('/')
        } catch(err){
            console.log(err)
        }
    }

    return(
        <div>
            {!selector.user ? (
                <div>
                     Sign in to save or view your watchlist.
                     <button onClick={()=>navigate('/login')} className='btn-sign-in'>LogIn / SignUp</button>
                </div>
            ):(
                <div>
                    <div className='title-section'>
                        <h1>{`Hello ${selector.user}!`}</h1>
                        <div>
                            <button onClick={signOut}>Sign out</button>
                        </div>
                    </div>
                {
                    (selector.saved.length > 0 ? (
                        <div className='favorites'>
                        <h2>Your watchlist</h2>
                    <div className="movies-grid">
                    {selector.saved.map(savedMovie=><MovieCard key={savedMovie.id} movie={savedMovie}/>)}
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