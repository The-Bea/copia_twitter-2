import { useState } from 'react'
import api from '../services/api'
import { useNavigate } from 'react-router-dom'

function Register() {
    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    async function register() {
        await api.post('users/register/', {
        username,
        password
        })

        navigate('/')
    }

    return (
    <div className='container'>
        <h1>Criar Conta</h1>

        <input
            placeholder='Usuário'
            onChange={(e) => setUsername(e.target.value)}
        />

        <input
            type='password'
            placeholder='Senha'
            onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={register}>Cadastrar</button>
        </div>
    )
}

export default Register