import React from 'react'

interface ProfileClientProps{
currentUser:any
}


const ProfileClient:React.FC<ProfileClientProps> = ({currentUser}) => {
console.log(currentUser)

    return (
    <div></div>
  )
}

export default ProfileClient