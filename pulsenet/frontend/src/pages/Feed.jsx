import { useEffect, useState } from 'react'
import api from '../services/api'

function Feed() {
    const [posts, setPosts] = useState([])
    const [content, setContent] = useState('')

    async function loadFeed() {
        const response = await api.get('posts/feed/')
        setPosts(response.data)
    }

    async function createPost() {
        await api.post('posts/create/', {
        content
        })

        setContent('')
        loadFeed()
    }

    async function likePost(id) {
        await api.post(`posts/like/${id}/`)
        loadFeed()
    }

    useEffect(() => {
        loadFeed()
    }, [])

    return (
        <div className='feed'>
        <h1>PulseNet</h1>

        <textarea
            placeholder='O que está acontecendo?'
            value={content}
            onChange={(e) => setContent(e.target.value)}
        />

        <button onClick={createPost}>Postar</button>

        {posts.map((post) => (
            <div className='post' key={post.id}>
            <h3>@{post.username}</h3>
            <p>{post.content}</p>

            <button onClick={() => likePost(post.id)}>
                ❤️ {post.likes_count}
            </button>

            <div>
                {post.comments.map((comment) => (
                <p key={comment.id}>
                    <strong>{comment.username}</strong>
                    : {comment.content}
                </p>
                ))}
            </div>
            </div>
        ))}
        </div>
    )
}

export default Feed