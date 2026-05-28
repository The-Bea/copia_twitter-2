import { useEffect, useState } from 'react'
import api from '../services/api'
import { useNavigate } from 'react-router-dom'

function Feed() {
    const navigate = useNavigate()

    const [posts, setPosts] = useState([])
    const [content, setContent] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchFeed()
    }, [])

    async function fetchFeed() {
        try {
            const response = await api.get('posts/feed/')
            setPosts(response.data)
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    async function createPost() {
        if (!content.trim()) return

        try {
            const res = await api.post('posts/create/', { content })

            // melhora UX: adiciona sem reload total
            setPosts(prev => [res.data, ...prev])
            setContent('')

        } catch (err) {
            console.log(err)
        }
    }

    async function likePost(id) {
        try {
            await api.post(`posts/like/${id}/`)

            // atualização local (evita reload do feed inteiro)
            setPosts(prev =>
                prev.map(post =>
                    post.id === id
                        ? { ...post, likes_count: (post.likes_count || 0) + 1 }
                        : post
                )
            )

        } catch (err) {
            console.log(err)
        }
    }

    function logout() {
        localStorage.removeItem('token')
        navigate('/')
    }

    return (
        <div className="page">

            {/* HEADER */}
            <div className="feed-header">
                <h2>Home</h2>
            </div>

            {/* COMPOSER */}
            <div className="composer">

                <textarea
                    placeholder="O que está acontecendo?"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />

                <button onClick={createPost}>
                    Postar
                </button>

            </div>

            {/* FEED */}
            {loading ? (
                <p className="empty">Carregando...</p>
            ) : (
                posts.map((post) => (
                    <div className="post" key={post.id}>

                        <div className="post-header">
                            <div className="avatar" />

                            <div>
                                <strong>@{post.username}</strong>
                                <p className="time">agora</p>
                            </div>
                        </div>

                        <p className="content">{post.content}</p>

                        <div className="actions">
                            <button onClick={() => likePost(post.id)}>
                                ❤️ {post.likes_count || 0}
                            </button>

                            <button>💬</button>
                            <button>🔁</button>
                        </div>

                    </div>
                ))
            )}

        </div>
    )
}

export default Feed