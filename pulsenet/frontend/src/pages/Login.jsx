import { useState } from 'react'
import api from '../services/api'
import { useNavigate } from 'react-router-dom'

function Login() {
    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    async function handleLogin() {
        const response = await api.post('token/', {
        username,
        password
    })

    localStorage.setItem('token', response.data.access)

    navigate('/feed')
    }

    return (
    <div className='container'>
        <h1>PulseNet</h1>

        <input
            placeholder='Usuário'
            onChange={(e) => setUsername(e.target.value)}
        />

        <input
            type='password'
            placeholder='Senha'
            onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Entrar</button>
        </div>
    )
}

export default Login