import React from 'react'
import { useNavigate } from 'react-router-dom'
export default function FallBackComponent({error,resetErrorBoundary }) {
const navigate=useNavigate()

    const handleBackToHome = () => {
        resetErrorBoundary(); // وضعیت خطا ریست می‌شود
        navigate('/'); // کاربر به صفحه اصلی هدایت می‌شود
      };
  return (
    <div className='flex flex-col justify-center items-center h-screen bg-black'>
    <h1 className='text-pink-600 font-extrabold text-8xl'> 404 Not Found </h1>
    <h1 className='text-pink-500 font-extrabold text-6xl'>Somthing is wrong {':('}</h1>
    {/* <p>{error.message}</p> */}
    <button onClick={handleBackToHome } className='bg-pink-500 text-white font-bold text-lg hover:border hover:border-pink-500 hover:bg-black hover:text-pink-600 rounded-md p-5 my-20'>back to Home</button></div>
    
  )
}
