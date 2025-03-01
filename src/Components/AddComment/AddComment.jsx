import React, { useState } from 'react'
import { useAuth } from '../../Context/AuthContext';
import { Send } from '../../utils/icon';
import axios from 'axios';

export default function MyComment({ parentComment, setParentComment, movieId, movieType, fetchComments, fetchChildComments }) {
    const { token, user, userImage } = useAuth();
    const [comment, setComment] = useState('')

    //-----------    
    const addComment = async () => {
        if (!comment) return;
        try {
            const response = await axios.post('http://65.109.177.24:2024/api/comment', {
                "movieId": movieId,
                "movieType": movieType,
                "Description": comment,
                "parentId": parentComment?.id || null
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log('added comment successfully');


            setComment('')
            setParentComment(null)
            if (parentComment?.id) {
                fetchChildComments(parentComment.id);
            } else {
                fetchComments(); // کامنت‌های اصلی را آپدیت کن
            }

        } catch (error) {
            console.log('add Comment failed', error)

        }
    }

    //----------------------


    return (
        <div className='  flex items-center fixed  left-0 right-0 bottom-0 p-2    bg-black bg-opacity-35 z-10'>

            <img src={userImage ? `http://65.109.177.24:2024/api/user/profile-pic/${userImage}` : "/image/Frame.png"} alt="" className='h-8 w-8 md:h-10 md:w-10  rounded-full object-cover mx-2' />
            <div className='  flex  flex-col border rounded-full bg-black  overflow-hidden w-full md:w-1/2 '>
                {/* زمان جواب دادن به یک کامنت نشان داده شود  */}
                {parentComment?.id &&
                    <div className=' flex justify-between text-sm px-3 pt-1 bg-gray-800 text-white  '>
                        <p className='text-gray-400 text-xs'>Reply to <span className='text-blue-600  '>@{parentComment.userName}</span>  <span className=''>{parentComment.description.slice(0,15)} ...</span></p>
                        <button className='text-lg mr-3 font-bold '
                            onClick={() => setParentComment(null)}>×</button> </div>

                }
                <input type="text" name="" id="" placeholder='add your comment...'
                    value={comment}
                    onChange={(e) => { setComment(e.target.value) }}
                    onKeyDown={(e) => e.key === "Enter" && addComment()}
                    className='   bg-inherit outline-none    px-3 py-1' />
            </div>
            <button className='text-pink-600'
                onClick={addComment}

            ><Send /></button>
        </div>
    )
}
