import React from 'react'
import GoogleLogin from 'react-google-login'
import { useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import BackgroundVideo from '../asset/login_video.mp4'
import logo from '../asset/LOGO_TEEZENTY.png'
import { client } from '../Client'
import LoginEmail from './LoginEmail'

const Login = () => {
  const navigate = useNavigate(' ')
  const responseGoogle = (response) => {
    localStorage.setItem('user', JSON.stringify(response.profileObj))

    const { name, googleId, imageUrl } = response.profileObj

    const doc = {
      _id: googleId,
      _type: 'user',
      userName: name,
      image: imageUrl,
    }
    client.createIfNotExists(doc).then(() => {
      navigate('/', { replace: true })
    })
  }

  return (
    <div className='flex justify-start items-center flex-col h-screen'>
      <div className='h-full w-full relative'>
        {/* Login Background Video */}
        <video
          type='video/mp4'
          src={BackgroundVideo}
          loop
          controls={false}
          autoPlay
          muted
          className='h-full w-full object-cover'
        />

        {/* Login Logo */}
        <div className='flex absolute flex-col justify-center items-center right-0 left-0 top-0 bottom-0 bg-blackOverlay'>
          <div className='p-5'>
            <img src={logo} alt='logo-img' width='300px' />
          </div>

          <div className='shadow-2xl'>
            {/* Google Authentication */}
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
              render={(renderProps) => (
                // Google Login Button
                <button
                  type='button'
                  className='bg-mainColor flex  items-center justify-center p-4 rounded-lg outline-none cursor-center'
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <FcGoogle className='mr-5' /> Sign in with Google
                </button>
              )}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy='single_host_origin'
            />
          </div>

          <div className="pt-10 ">
            <LoginEmail />
          </div>

        </div>
      </div>
    </div>
  )
}

export default Login
