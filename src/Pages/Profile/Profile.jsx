import React, { useCallback, useEffect, useState } from 'react';
import PageLayout from '../../Layout/PageLayout';
import { Camera, Edit, Email, Eye, LockClosed, NoEye, Person, PersonRounded, Trash } from '../../utils/icon';
import axios from 'axios';
import { useAuth } from '../../Context/AuthContext';
import { getCurrentUser } from '../../utils/api';

export default function Profile() {
    const { token, userImage, setuserImage, updateUserImage } = useAuth();
    const [isShowModal,setIsShowModal]=useState(false)
    const [imagePath, setImagePath] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [confirmMessage, setConfirmMessage] = useState(null);
    const [userDetails, setUserDetails] = useState({
        userName: '',
        email: '',
        firstName: '',
        lastName: ''
    });
    const [password, setPassword] = useState({
        current: '',
        new: ''
    })

    //--------------------------------------------------------------
    useEffect(() => {
        fetchUserDetails();
        if (imagePath) {
            setImagePreview(`http://65.109.177.24:2024/api/user/profile-pic/${imagePath}`);
        }
        const timer = setTimeout(() => {
            if (errorMessage || confirmMessage) {
                setErrorMessage(null);
                setConfirmMessage(null);
            }
        }, 2000);

        return () => clearTimeout(timer);

    }, [imagePath, errorMessage, confirmMessage, userImage]);
    // -----------------------------------------------------------------------

    const fetchUserDetails = async () => {
        if (!token) return;
        try {
            const data = await getCurrentUser(token);
            setUserDetails({
                userName: data.userName || '',
                email: data.email || '',
                firstName: data.firstName || '',
                lastName: data.lastName || ''
            });
            if (data.imageId) setImagePath(data.imageId);
        } catch (error) {
            console.error('Error in fetching user data:', error);
        }
    }
    //-------------
    const selectImageHandler = (e) => {
        const file = e.target.files[0];
        if (!file || !file.type.startsWith('image/')) {
            setErrorMessage('Please select a valid image file');
            return;
        }
        const reader = new FileReader();
        reader.onload = (event) => {
            setImagePreview(event.target.result);
        };
        reader.readAsDataURL(file);
        uploadImage(file);
    }

    //-------------
    const uploadImage = async (file) => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            const response = await axios.post(
                'http://65.109.177.24:2024/api/user/profile-pic',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            if (response.data.imageId) {
                setConfirmMessage('Image uploaded successfully.')
                setImagePath(response.data.imageId);

            }
        } catch (error) {
            console.error('Error uploading image:', error);
            setErrorMessage('Image upload failed. Please try again.')
        }
    };
    //------delete image----------
    const deleteImage = async () => {
        try {
          
            const response = await axios.delete(
                'http://65.109.177.24:2024/api/user/profile-pic',
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            if (response.status === 200) {
                console.log('Image deleted successfully');
                setImagePath(null);  // حذف مسیر تصویر
                setImagePreview(null);  // حذف پیش‌نمایش تصویر
                setConfirmMessage('Image deleted successfully.');
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            setErrorMessage('delete image failed. Please try again.')
        }
    };
    //------inputs onChange-------
    const ueserChangeHandler = (e) => {
        const { id, value } = e.target;
        setUserDetails((prev) => ({ ...prev, [id]: value }));


    }
    //---
    const passwordChangeHandler = (e) => {
        const { id, value } = e.target;
        setPassword(prev => ({ ...prev, [id]: value }));
    }
    //-----------update function------------------

    const updateProfile = useCallback(async () => {

        try {
            const response = await axios.put('http://65.109.177.24:2024/api/user/update', {
                "userName": userDetails.userName,
                "email": userDetails.email,
                "firstName": userDetails.firstName || undefined,
                "lastName": userDetails.lastName || undefined,

            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            setConfirmMessage('Profile updated successfully')
        } catch (error) {
            if (error.response) {

                setErrorMessage(error.response.data.errorMessage)
            }
            console.log(error)
        }

    }, [token, userDetails])
    //-----
    const changedPassword = useCallback(async () => {
        if (!password.new || !password.current) return
        try {
            const response = await axios.put('http://65.109.177.24:2024/api/user/update', {
                "userName": userDetails.userName,
                "email": userDetails.email,
                "firstName": userDetails.firstName || undefined,
                "lastName": userDetails.lastName || undefined,
                "currentPassword": password.current,
                "newPassword": password.new
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            setConfirmMessage('passworrd Changed successfully')
        } catch (error) {
            if (error.response) {

                setErrorMessage(error.response.data.errorMessage)
            }
            console.log(error)
        } finally {
            setPassword({ current: '', new: '' });
        }

    }, [token, password])
    //-------------
    return (
        <PageLayout>
            {errorMessage && <div className='fixed z-50 left-5 md:left-1/2 md:transform md:-translate-x-1/2 bg-red-600 text-white w-auto p-1 rounded-sm '>{errorMessage}</div>
            }
            {confirmMessage && <div className='fixed z-50 left-5 md:left-1/2 md:transform md:-translate-x-1/2 bg-green-600 text-white w-auto p-1 rounded-sm '>{confirmMessage}</div>
            }

            <div className=' mt-28 p-10 '>
                <div className='flex  items-center flex-col md:flex-row  '>
                    <div className='relative rounded-full w-28 h-28 p-1 border-2 mx-3 border-white cursor-pointer'  >
                        <div className="w-full h-full rounded-full overflow-hidden">
                            <img className='rounded-full w-full h-full object-cover' src={imagePreview ? imagePreview : '/image/Frame.png'} alt="User" />
                        </div>

                        <div
                            className='bg-pink-700 w-9 h-9 absolute right-0 top-20 flex justify-center items-center rounded-full cursor-pointer'>
                            <button htmlFor="avatar" className='text-white cursor-pointer'
                            onClick={()=>setIsShowModal(true)}>
                                <Camera />
                            </button>
                           
                        </div>
                    </div>

                    <h1 className='text-2xl font-bold text-pink-500 mt-4  md:m-2'>Account Details</h1>



                </div>


                <div className=' md:px-4  my-5 py-5 flex flex-col  md:flex-row md:flex-wrap justify-evenly  items-start md:items-center    '>

                    <div className='   w-full md:px-3 md:w-1/2 flex  flex-col  justify-evenly md:justify-start items-start md:items-start'>
                        <label htmlFor="userName" className='text-white font-bold my-1 mr-5 flex '> <span className='text-pink-400 mr-1'><PersonRounded /></span>
                            User Name</label>
                        <input type="text" id='userName' className='w-full  p-2 my-2 bg-gray-900 border border-gray-300 outline-none  focus:border-pink-600 rounded-md text-white'
                            value={userDetails.userName || ''}
                            onChange={ueserChangeHandler}

                        />
                    </div>

                    <div className=' w-full md:px-3 md:w-1/2 flex  flex-col  justify-evenly md:justify-start items-start md:items-start'>
                        <label htmlFor="email" className='text-white font-bold my-1 mr-5 flex '> <span className='text-pink-400 mr-1'><Email /></span>
                            Email</label>
                        <input type="email" id='email' className='w-full  p-2 my-2 bg-gray-900 border border-gray-300 outline-none rounded-md focus:border-pink-600 text-white '
                            value={userDetails.email || ''}
                            onChange={ueserChangeHandler}
                        />
                    </div>

                    <div className=' w-full md:px-3 md:w-1/2 flex  flex-col  justify-evenly md:justify-start items-start md:items-start'>
                        <label htmlFor="firstName" className='text-white font-bold my-1 mr-5 flex '> <span className='text-pink-400 mr-1'><Person /></span>
                            First Name</label>
                        <input type="text" id='firstName' className='w-full  p-2 my-2 bg-gray-900 border border-gray-300 outline-none rounded-md focus:border-pink-600 text-white '
                            value={userDetails?.firstName || ''}
                            onChange={ueserChangeHandler}
                        />
                    </div>

                    <div className=' w-full md:px-3 md:w-1/2 flex  flex-col  justify-evenly md:justify-start items-start md:items-start'>
                        <label htmlFor="lastName" className='text-white font-bold my-1 mr-5 flex '> <span className='text-pink-400 mr-1'><Person /></span>
                            Lasst Name</label>
                        <input type="text" id='lastName' className='w-full  p-2 my-2 bg-gray-900 border border-gray-300 outline-none rounded-md focus:border-pink-600 text-white '
                            value={userDetails?.lastName || ''}
                            onChange={ueserChangeHandler}
                        />
                    </div>

                    <div className=' w-full mt-4  flex    justify-end  items-center '>
                        <button className='  bg-pink-500  text-white hover:bg-pink-800 rounded-md w-full md:w-60 p-2'
                            onClick={updateProfile}
                        >Update Profile</button>
                    </div>

                </div>
                <hr />
                {/* -----------------------قسمت پسوورد------------------------------- */}
                <div className='md:px-4  my-5 py-5 flex flex-col  md:flex-row md:flex-wrap justify-evenly  items-start md:items-center    ' >

                    <div className=' w-full md:px-3 md:w-1/2 flex  flex-col  justify-evenly md:justify-start items-start md:items-start'>

                        <label htmlFor="current" className='text-pink-600 font-bold my-1 mr-5 flex '> <span className='text-pink-400 mr-1'><LockClosed /></span>Current Password</label>
                        <div className='flex text-white w-full  my-2 bg-gray-900 border rounded-md  border-pink-600'>
                            <input type='password' id='current'
                                className='w-full  p-2  bg-inherit  outline-none rounded-md  text-white '
                                value={password.current}
                                onChange={passwordChangeHandler} />
                            {/* <button type='button' onClick={() => { setIsShowPassword(prev => !prev) }}> {isShowPassword ? <Eye /> : <NoEye />}</button> */}

                        </div>


                        {/* -------------- */}
                    </div>
                    <div className=' w-full md:px-3 md:w-1/2 flex  flex-col  justify-evenly md:justify-start items-start md:items-start'>
                        <label htmlFor="new" className='text-pink-600 font-bold my-1 mr-5 flex '> <span className='text-pink-400 mr-1'><LockClosed /></span>New Password</label>

                        <div className='flex text-white w-full  my-2 bg-gray-900 border rounded-md  border-pink-600'>
                            <input type={isShowPassword ? 'text' : 'password'} id='new'
                                className='w-full  p-2  bg-inherit  outline-none rounded-md  text-white '
                                value={password.new}
                                onChange={passwordChangeHandler} />

                            <button type='button' onClick={() => { setIsShowPassword(prev => !prev) }}> {isShowPassword ? <Eye /> : <NoEye />}</button>

                        </div>
                    </div>
                    <div className=' w-full mt-4  flex    justify-end  items-center '>
                        <button className='  border-2 border-pink-500 hover:bg-pink-800 hover:border-pink-800  text-white rounded-md w-full md:w-60 p-2'
                            onClick={changedPassword}
                        >Change Password</button>
                    </div>
                </div>

            </div>
            {/* modal */}
            {isShowModal&&
            <div className='fixed left-0 right-0 top-0 bottom-0 z-40 flex justify-center items-center bg-black bg-opacity-60 text-red-600'>
            <div className='flex  flex-col md:w-1/3 w-full h-52 bg-white rounded-md '>
            <div className='flex justify-between items-center  text-pink-600 px-4'> Change avatar
                 <button className='font-extrabold text-xl'
                 onClick={()=>setIsShowModal(false)}>×</button></div>
                <div className=' w-full'>
                    {/* avararContainer */}
                    <div className='flex  items-center justify-center flex-col md:flex-row   '>
                        <div className='relative rounded-full w-28 h-28 p-1 border-2 mx-3 border-white cursor-pointer'  >
                            <div className="w-full h-full rounded-full overflow-hidden">
                                <img className='rounded-full w-full h-full object-cover' src={imagePreview ? imagePreview : '/image/Frame.png'} alt="User" />
                            </div>
                        </div>
                    </div>  {/* avararContainer */}

                    {/* buttonContainer */}
                    <div className=' w-full flex justify-center'>
                        <p className=' w-16 flex justify-center m-1 border   border-pink-600 text-pink-600  rounded-full p-1 hover:bg-pink-600 hover:text-white'>
                            <input type='file' id='avatar' accept="image/*" className='hidden' onChange={selectImageHandler} ></input>

                            <label htmlFor='avatar' className='flex' ><Edit  />  </label>
                        </p>
                        <button className=' flex  w-16  justify-center m-1 border  border-pink-600 text-pink-600  rounded-full p-1 hover:bg-pink-600 hover:text-white'
                        onClick={deleteImage}
                        ><Trash/> </button>
                    </div>{/* buttonContainer */}
                </div>
            </div>
           
        </div>
            }
            

        </PageLayout>
    )
}
