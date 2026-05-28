import { useState } from 'react'
import api from '../services/api'

function FollowButton({ userId }) {
    const [isFollowing, setIsFollowing] = useState(false)

    async function toggleFollow() {
        const response = await api.post(`follow/${userId}/`)
        setIsFollowing(response.data.status === 'follow')
    }

    return (
        <button onClick={toggleFollow}>
        {isFollowing ? 'Seguindo' : 'Seguir'}
        </button>
    )
}

export default FollowButton