import { Link } from 'react-router-dom'

function Sidebar() {
    return (
        <div className="sidebar">
        <h1>PulseNet</h1>

        <nav>
            <Link to="/">Home</Link>
            <Link to="/perfil">Perfil</Link>
        </nav>
        </div>
    )
}

export default Sidebar