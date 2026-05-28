import { useState } from 'react'
import api from '../services/api'
import { useNavigate, Link } from 'react-router-dom'
import '../login.css'

function Register() {
    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleRegister() {
        if (!username || !password) {
        setError('Preencha todos os campos')
        return
        }

        setLoading(true)
        setError('')

        try {
        await api.post('users/register/', {
            username,
            password
        })

        navigate('/')
        } catch (err) {
        setError('Erro ao criar conta')
        } finally {
        setLoading(false)
        }
    }

    function handleKeyDown(e) {
        if (e.key === 'Enter') {
        handleRegister()
        }
    }

    return (
        <div className="auth-container">

        <div className="auth-box">

            <h1>Criar conta</h1>
            <p>Junte-se ao DizConect</p>

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

            <button onClick={handleRegister} disabled={loading}>
            {loading ? 'Criando...' : 'Criar conta'}
            </button>

            <p>
            Já tem conta? <Link to="/">Entrar</Link>
            </p>

        </div>

        </div>
    )
}

export default Register