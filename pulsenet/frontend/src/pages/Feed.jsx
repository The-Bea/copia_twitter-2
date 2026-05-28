import { useEffect, useState } from 'react'
import api from '../services/api'
import { useNavigate } from 'react-router-dom'

function Feed() {
    const navigate = useNavigate()

    const [posts, setPosts] = useState([])
    const [content, setContent] = useState('')
    const [loading, setLoading] = useState(true)

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

    useEffect(() => {
        fetchFeed()
    }, [])

    async function createPost() {
        if (!content.trim()) return

        await api.post('posts/create/', { content })
        setContent('')
        fetchFeed()
    }

    async function likePost(id) {
        await api.post(`posts/like/${id}/`)
        fetchFeed()
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
                <p>Carregando...</p>
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