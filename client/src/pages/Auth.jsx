import React from 'react'

const Auth = () => {
  return (
    <div className='w-full h-screen bg-gray-100 flex items-center justify-center fixed top-0 right-0 bottom-0 left-0 z-50'>
        <div className='w-1/3 bg-white p-3'>
            <h1>POST PAYLAŞ</h1>
            <div className='flex flex-col space-y-3 mb-5'>
                <input type="text" placeholder='Username' className='input-style' />
                <input type="text" placeholder='Email' className='input-style' />
                <input type="text" placeholder='Password' className='input-style' />
            </div>
            <div className='cursor-pointer hover:bg-indigo-800 w-full p-2 text-center bg-indigo-600 text-white rounded-md'>Kayıt Ol</div>
        </div>
    </div>
  )
}
 
export default Auth