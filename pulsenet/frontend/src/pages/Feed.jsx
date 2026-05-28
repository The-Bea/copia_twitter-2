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

            setPosts(prev => [res.data, ...prev])
            setContent('')

        } catch (err) {
            console.log(err)
        }
    }

    async function likePost(id) {
        try {
            await api.post(`posts/like/${id}/`)

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

    return (
        <div className="page feed-page">

            {/* HEADER FIXO */}
            <div className="feed-header">
                <h2>Home</h2>
            </div>

            {/* COMPOSER */}
            <div className="composer card">

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
                    <div className="post card" key={post.id}>

                        <div className="post-header">
                            <div className="avatar" />

                            <div>
                                <strong>@{post.username}</strong>
                                <p className="time">agora</p>
                            </div>
                        </div>

                        <p className="content-text">
                            {post.content}
                        </p>

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