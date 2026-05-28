import { useEffect, useState } from 'react'
import api from '../services/api'

function FollowButton({ userId }) {
    const [isFollowing, setIsFollowing] = useState(false)
    const [loading, setLoading] = useState(false)

    // 🔥 opcional: checar estado inicial
    useEffect(() => {
        async function checkFollow() {
            try {
                const res = await api.get(`/users/${userId}/`)
                setIsFollowing(res.data.is_following)
            } catch (err) {
                console.log(err)
            }
        }

        checkFollow()
    }, [userId])

    async function toggleFollow() {
        if (loading) return

        setLoading(true)

        try {
            const response = await api.post(`/users/${userId}/follow/`)

            // backend ideal retorna algo simples
            setIsFollowing(response.data.following)
        } catch (err) {
            console.log(err)
        }

        setLoading(false)
    }

    return (
        <button onClick={toggleFollow} disabled={loading}>
            {isFollowing ? 'Seguindo' : 'Seguir'}
        </button>
    )
}

export default FollowButton