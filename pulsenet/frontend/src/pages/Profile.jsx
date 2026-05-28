import { useEffect, useState } from 'react'
import api from '../services/api'
import FollowButton from '../components/FollowButton'

function Profile() {
    const [user, setUser] = useState(null)
    const [posts, setPosts] = useState([])

    const [editing, setEditing] = useState(false)
    const [username, setUsername] = useState('')
    const [bio, setBio] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        loadProfile()
    }, [])

    async function loadProfile() {
        try {
            const userRes = await api.get('users/me/')
            const postsRes = await api.get('users/my-posts/')

            setUser(userRes.data)
            setPosts(postsRes.data)

            setUsername(userRes.data.username)
            setBio(userRes.data.bio || '')

        } catch (err) {
            console.log('ERRO PROFILE:', err)
        }
    }

    async function updateProfile() {
        try {
            await api.put('users/update-profile/', {
                username,
                bio,
                password: password || undefined
            })

            setPassword('')
            setEditing(false)
            loadProfile()

        } catch (err) {
            console.log(err)
        }
    }

    if (!user) {
        return <div className="profile page">Carregando perfil...</div>
    }

    return (
        <div className="profile page">

            {/* HEADER */}
            <div className="profile-header">

                <div className="profile-banner" />

                <div className="profile-info-card">

                    <div className="profile-top">
                        <div className="avatar large" />

                        <FollowButton userId={user.id} />
                    </div>

                    <h2>@{user.username}</h2>

                    <p className="bio">
                        {user.bio || 'Sem bio ainda'}
                    </p>

                    <div className="profile-stats">

                        <div>
                            <strong>{posts.length}</strong>
                            <span>Posts</span>
                        </div>

                        <div>
                            <strong>0</strong>
                            <span>Seguidores</span>
                        </div>

                        <div>
                            <strong>0</strong>
                            <span>Seguindo</span>
                        </div>

                    </div>

                </div>
            </div>

            {/* EDIT PROFILE */}
            <button
                className="edit-btn"
                onClick={() => setEditing(!editing)}
            >
                {editing ? 'Cancelar' : 'Editar perfil'}
            </button>

            {editing && (
                <div className="edit-box">

                    <input
                        placeholder="Nome de usuário"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <input
                        placeholder="Bio"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Nova senha (opcional)"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button onClick={updateProfile}>
                        Salvar alterações
                    </button>

                </div>
            )}

            {/* POSTS */}
            <div className="profile-posts">

                <h3>Posts</h3>

                {posts.length === 0 ? (
                    <p className="empty">Nada ainda por aqui</p>
                ) : (
                    posts.map((post) => (
                        <div className="post" key={post.id}>
                            <p>{post.content}</p>
                        </div>
                    ))
                )}

            </div>

        </div>
    )
}

export default Profile