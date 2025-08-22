import { useAppStore } from '@/store'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IoArrowBack } from "react-icons/io5"
const Profile = () => {

  const navigate = useNavigate()
  const { userInfo, setUserInfo} = useAppStore()
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [image, setImage] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [selectedColor, setSelectedColor] = useState(0)

  const saveChanges = async () => {

  }
  return (
    <div className='bg-[#1b1c24] h-[100vh] flex items-center justify-center flex-col gap-10'>
      <div className="flex flex-col gap-10 w-[80vw] md:w-max">
        <IoArrowBack />
      </div>
      Profile <br />
      email: {userInfo.email}
    </div>
  )
}

export default Profile