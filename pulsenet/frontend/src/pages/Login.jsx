import { useState } from 'react'
import api from '../services/api'
import { useNavigate, Link } from 'react-router-dom'
import '../login.css'



function Login() {
    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleLogin() {
        if (!username || !password) {
            setError('Preencha todos os campos')
            return
        }

        setLoading(true)
        setError('')

        try {
            const response = await api.post('token/', {
                username,
                password
        })

            localStorage.setItem('token', response.data.access)

            navigate('/feed')
            } catch {
                setError('Usuário ou senha inválidos')
            } finally {
                setLoading(false)
            }
    }

    function handleKeyDown(e) {
    if (e.key === 'Enter') {
        handleLogin()
    }
}

    return (
        <div className="auth-container">

        <div className="auth-box">

            <h1>DizConect</h1>
            <p>Entre para continuar</p>

            {error && <div className="error">{error}</div>}

            <input
            placeholder="Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={handleKeyDown}
            />

            <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
            />

            <button onClick={handleLogin} disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
            </button>

            <p>
            Não tem conta? <Link to="/register">Criar conta</Link>
            </p>

        </div>

        </div>
    )
}

export default Login