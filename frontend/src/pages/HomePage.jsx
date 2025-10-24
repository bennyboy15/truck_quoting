import React from 'react'
import { useCurrentUser } from '../hooks/useCurrentUser'

function HomePage() {

  const {data: current_user} = useCurrentUser();

  return (
    <div>Welcome back, {current_user.name} {`(${current_user.username})`}</div>
  )
}

export default HomePage