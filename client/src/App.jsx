import { Route, Routes } from 'react-router-dom'
import './css/App.css'
import Home from './pages/Home'
import Favourites from './pages/Favourites'
import NavBar from './components/NavBar'
import MovieInfo from './pages/MovieInfo'
import Register from './pages/Register'
import Login from './pages/Login'
import SearchPage from './pages/SearchPage'

function App() {
  return (
    <>
      <NavBar/>
      <main className='main-content'>
        <Routes>
          <Route path={'/'} element={<Home/>}/>
          <Route path={'/watchlist'} element={<Favourites/>}/>
          <Route path={'/movie/:movieId'} element={<MovieInfo/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/search' element={<SearchPage/>}/>
        </Routes>
      </main>
      </>
      
  )
}

export default App
