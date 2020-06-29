import React from 'react';

import UsersList from '../components/UsersList'

const Users = () => {
    const USERS = [
        {
            id: 'u1',
            name: 'Max',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSD_6JIXq12IXBBxIMvynAeGKyVG2sdlNyoLw&usqp=CAU',
            places: 3
        }
    ]

    return <UsersList items={USERS} />
}

export default Users