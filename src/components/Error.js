import React from 'react'

const Error = () => {
  return (
    <div className="text-center items-center">
       {/* <h1 className="text-8xl text-blue-500 font-bold">Oops!!</h1>
       <h1 className="text-4xl text-red-500 py-8 font-bold">404!! Page Not Found</h1>
       <h1 className='text-2xl font-semibold'>There is something wrong!!, please try again!!</h1> */}
       <img 
        src="https://media.giphy.com/media/TRGRswpUdM2CQ/giphy.gif" 
        alt="ErrorPage"
        className="h-screen w-screen"
      />
    </div>
  )
}

export default Error