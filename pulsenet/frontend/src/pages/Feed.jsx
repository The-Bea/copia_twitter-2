import { useEffect, useState } from 'react'
import api from '../services/api'

function Feed() {

    const [posts, setPosts] = useState([])
    const [content, setContent] = useState('')
    const [loading, setLoading] = useState(true)

    const [commentText, setCommentText] = useState({})
    const [comments, setComments] = useState({})

    useEffect(() => {
        fetchFeed()
    }, [])

    async function fetchFeed() {
        try {
            const res = await api.get('posts/feed/')
            setPosts(res.data)
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
            const res = await api.post(`posts/like/${id}/`)

            setPosts(prev =>
                prev.map(post =>
                    post.id === id
                        ? { ...post, likes_count: res.data.likes }
                        : post
                )
            )
        } catch (err) {
            console.log(err)
        }
    }

    async function addComment(postId) {
        const text = commentText[postId]

        if (!text || !text.trim()) return

        try {
            const res = await api.post(`posts/comment/${postId}/`, {
                content: text
            })

            setComments(prev => ({
                ...prev,
                [postId]: [...(prev[postId] || []), res.data]
            }))

            setCommentText(prev => ({
                ...prev,
                [postId]: ''
            }))

        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="page feed-page">

            <div className="feed-header">
                <h2>Home</h2>
            </div>

            {/* POSTAR */}
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
                <p>Carregando...</p>
            ) : (
                posts.map(post => (
                    <div className="post card" key={post.id}>

                        <strong>@{post.username}</strong>
                        <p>{post.content}</p>

                        <div className="actions">
                            <button onClick={() => likePost(post.id)}>
                                ❤️ {post.likes_count || 0}
                            </button>
                        </div>

                        {/* INPUT DE COMENTÁRIO (AGORA EXISTE DE VERDADE) */}
                        <div className="comment-box">
                            <input
                                placeholder="Escreva um comentário..."
                                value={commentText[post.id] || ''}
                                onChange={(e) =>
                                    setCommentText(prev => ({
                                        ...prev,
                                        [post.id]: e.target.value
                                    }))
                                }
                            />

                            <button onClick={() => addComment(post.id)}>
                                Comentar
                            </button>
                        </div>

                        {/* LISTA DE COMENTÁRIOS */}
                        {comments[post.id]?.map(c => (
                            <div key={c.id} className="comment">
                                <strong>@{c.username || 'user'}</strong>
                                <p>{c.content}</p>
                            </div>
                        ))}

                    </div>
                ))
            )}

        </div>
    )
}

export default Feed