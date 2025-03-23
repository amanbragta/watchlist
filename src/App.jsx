import { Route, Routes } from 'react-router-dom'
import './css/App.css'
import Home from './pages/Home'
import Favourites from './pages/Favourites'
import NavBar from './components/NavBar'
import { MovieProvider } from './contexts/MovieContext'
import MovieInfo from './pages/MovieInfo'

function App() {
  return (
    <MovieProvider>
      <NavBar/>
      <main className='main-content'>
        <Routes>
          <Route path={'/'} element={<Home/>}/>
          <Route path={'/watchlist'} element={<Favourites/>}/>
          <Route path={'/details/:id'} element={<MovieInfo/>}/>
        </Routes>
      </main>
    </MovieProvider>
      
  )
}

export default App
