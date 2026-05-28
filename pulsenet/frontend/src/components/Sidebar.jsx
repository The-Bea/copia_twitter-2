import { Link, useNavigate, useLocation } from 'react-router-dom'

function Sidebar() {
    const navigate = useNavigate()
    const location = useLocation()

    function logout() {
        localStorage.removeItem('token')
        navigate('/')
    }

    const isActive = (path) => location.pathname === path

    return (
        <aside className="sidebar">

            <div className="logo">DizConect</div>

            <nav className="nav">

                <Link className={`nav-item ${isActive('/feed') ? 'active' : ''}`} to="/feed">
                    <span>🏠</span> Home
                </Link>

                <Link className={`nav-item ${isActive('/trends') ? 'active' : ''}`} to="/trends">
                    <span>🔥</span> Trends
                </Link>

                <Link className={`nav-item ${isActive('/perfil') ? 'active' : ''}`} to="/perfil">
                    <span>👤</span> Perfil
                </Link>

            </nav>

            <button className="logout-btn" onClick={logout}>
                Sair
            </button>

        </aside>
    )
}

export default Sidebar