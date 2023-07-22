import { Link } from 'react-router-dom'
import App from '../App'

const Navbar = () => {
    return (
        <header>
            <div className='container'>
                <Link to='/'>
                    <h1>Child Care Copilot</h1>
                </Link>
            </div>
        </header>
    )
}

export default Navbar;