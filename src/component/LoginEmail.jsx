import  {React, useState } from 'react'
import LoginModal from './LoginModal'

const LoginEmail = () => {
  const [openLoginModal, setOpenLoginModal] = useState(false)
  return (
    <div>
      {/* Login With Email */}
      <button
        type='button'
        className='bg-mainColor flex  items-center justify-center p-4 rounded-lg outline-none cursor-center'
        onClick={() => {
          setOpenLoginModal(true);
        }}
      >
        Sign In With Email
      </button>
      <LoginModal />
    </div>
  )
}

export default LoginEmail
