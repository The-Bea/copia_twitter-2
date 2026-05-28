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

            {/* LOGO */}
            <div className="logo">
                DizConect
            </div>

            {/* NAV */}
            <nav className="nav">

                <Link
                    className={`nav-item ${isActive('/feed') ? 'active' : ''}`}
                    to="/feed"
                >
                    <span className="icon">🏠</span>
                    <span>Home</span>
                </Link>

                <Link
                    className={`nav-item ${isActive('/trends') ? 'active' : ''}`}
                    to="/trends"
                >
                    <span className="icon">🔥</span>
                    <span>Trends</span>
                </Link>

                <Link
                    className={`nav-item ${isActive('/perfil') ? 'active' : ''}`}
                    to="/perfil"
                >
                    <span className="icon">👤</span>
                    <span>Perfil</span>
                </Link>

            </nav>

            {/* LOGOUT */}
            <button className="logout-btn" onClick={logout}>
                Sair
            </button>

        </aside>
    )
}

export default Sidebar