import { Link } from "react-router-dom";
import '../css/NavBar.css'

function NavBar(){
    return(
        <nav className="navbar">
            <div className="navbar-brand">
                <a href='/'>Movie App</a>
            </div>
            <div className="navbar-links">
                <a href='/' className="nav-link">Home</a>
                <Link to={'/watchlist'} className="nav-link">Watch-list</Link>
            </div>
        </nav>
    )
}

export default NavBar