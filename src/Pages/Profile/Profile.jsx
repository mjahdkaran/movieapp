import React, { useEffect, useState } from 'react'
import PageLayout from '../../Layout/PageLayout'
import { Camera, Email, LockClosed, Person, PersonRounded, Trash } from '../../utils/icon'
import axios from 'axios'
import { useAuth } from '../../Context/AuthContext'

export default function Profile() {
    const { userInfo, token } = useAuth()

    const [imagePreview, setImagePreview] = useState(userInfo?.imageId && `http://65.109.177.24:2024/api/user/profile-pic/${userInfo.imageId}`);
 

    const selectImageHandler = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setImagePreview(event.target.result);
            };
            reader.readAsDataURL(file);
            uploadImage(file);
        } else {
            alert("Please select an image file");
        }
    };






    return (
        <PageLayout>
            <div className=' mt-28 p-10 '>
                <div className='flex  items-center flex-col md:flex-row  '>
                    <div className='relative rounded-full w-28 h-28 p-1 border-2 mx-3 border-white cursor-pointer'  >
                        <div className="w-full h-full rounded-full overflow-hidden">
                            <img className='rounded-full w-full h-full object-cover' src={imagePreview ? imagePreview : '/image/Frame.png'} alt="User" />
                        </div>

                        <div
                            className='bg-pink-700 w-9 h-9 absolute right-0 top-20 flex justify-center items-center rounded-full cursor-pointer'>
                            <label htmlFor="avatar" className='text-white cursor-pointer'>
                                {!imagePreview ? <Camera /> : <Trash />}
                            </label>
                            <input type='file' id='avatar' accept="image/*" className='hidden'
                                onChange={selectImageHandler}
                            ></input>
                        </div>
                    </div>

                    <h1 className='text-2xl font-bold text-pink-500 mt-4  md:m-2'>Account Details</h1>



                </div>


                <div className=' md:px-4  my-5 py-5 flex flex-col  md:flex-row md:flex-wrap justify-evenly  items-start md:items-center    '>

                    <div className='   w-full md:px-3 md:w-1/2 flex  flex-col  justify-evenly md:justify-start items-start md:items-start'>
                        <label htmlFor="username" className='text-white font-bold my-1 mr-5 flex '> <span className='text-pink-400 mr-1'><PersonRounded /></span>User Name</label>
                        <input type="text" id='username' className='w-full  p-2 my-2 bg-gray-900 border border-gray-300 outline-none  focus:border-pink-600 rounded-md text-white' />
                    </div>

                    <div className=' w-full md:px-3 md:w-1/2 flex  flex-col  justify-evenly md:justify-start items-start md:items-start'>
                        <label htmlFor="email" className='text-white font-bold my-1 mr-5 flex '> <span className='text-pink-400 mr-1'><Email /></span>Email</label>
                        <input type="email" id='email' className='w-full  p-2 my-2 bg-gray-900 border border-gray-300 outline-none rounded-md focus:border-pink-600 text-white ' />
                    </div>

                    <div className=' w-full md:px-3 md:w-1/2 flex  flex-col  justify-evenly md:justify-start items-start md:items-start'>
                        <label htmlFor="firstname" className='text-white font-bold my-1 mr-5 flex '> <span className='text-pink-400 mr-1'><Person /></span>First Name</label>
                        <input type="text" id='firstname' className='w-full  p-2 my-2 bg-gray-900 border border-gray-300 outline-none rounded-md focus:border-pink-600 text-white ' />
                    </div>

                    <div className=' w-full md:px-3 md:w-1/2 flex  flex-col  justify-evenly md:justify-start items-start md:items-start'>
                        <label htmlFor="lastname" className='text-white font-bold my-1 mr-5 flex '> <span className='text-pink-400 mr-1'><Person /></span>Lasst Name</label>
                        <input type="text" id='lastname' className='w-full  p-2 my-2 bg-gray-900 border border-gray-300 outline-none rounded-md focus:border-pink-600 text-white ' />
                    </div>

                    <div className=' w-full mt-4  flex    justify-end  items-center '>
                        <button className='  bg-pink-500  text-white hover:bg-pink-800 rounded-md w-full md:w-60 p-2'

                        >Update Profile</button>
                    </div>

                </div>
                <hr />
                {/* -----------------------قسمت پسوورد------------------------------- */}
                <div className='md:px-4  my-5 py-5 flex flex-col  md:flex-row md:flex-wrap justify-evenly  items-start md:items-center    ' >

                    <div className=' w-full md:px-3 md:w-1/2 flex  flex-col  justify-evenly md:justify-start items-start md:items-start'>
                        <label htmlFor="current" className='text-pink-600 font-bold my-1 mr-5 flex '> <span className='text-pink-400 mr-1'><LockClosed /></span>Current Password</label>
                        <input type="text" id='current' className='w-full  p-2 my-2 bg-gray-900 border border-gray-300 outline-none rounded-md focus:border-pink-600 text-white ' />
                    </div>

                    <div className=' w-full md:px-3 md:w-1/2 flex  flex-col  justify-evenly md:justify-start items-start md:items-start'>
                        <label htmlFor="new" className='text-pink-600 font-bold my-1 mr-5 flex '> <span className='text-pink-400 mr-1'><LockClosed /></span>New Password</label>
                        <input type="text" id='new' className='w-full  p-2 my-2 bg-gray-900 border border-gray-300 outline-none rounded-md focus:border-pink-600 text-white ' />
                    </div>
                    <div className=' w-full mt-4  flex    justify-end  items-center '>
                        <button className='  border-2 border-pink-500 hover:bg-pink-800 hover:border-pink-800  text-white rounded-md w-full md:w-60 p-2'>Change Password</button>
                    </div>
                </div>

            </div>

        </PageLayout>
    )
}
