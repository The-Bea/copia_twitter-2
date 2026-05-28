import { useEffect, useState } from 'react'
import api from '../services/api'
import FollowButton from '../components/FollowButton'

function Profile() {
    const [user, setUser] = useState(null)
    const [posts, setPosts] = useState([])

    useEffect(() => {
        loadProfile()
    }, [])

    async function loadProfile() {
        try {
            const userRes = await api.get('users/me/')
            const postsRes = await api.get('posts/my-posts/')

            setUser(userRes.data)
            setPosts(postsRes.data)

        } catch (err) {
            console.log('ERRO PROFILE:', err)
        }
    }

    if (!user) {
        return <div className="profile">Carregando perfil...</div>
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