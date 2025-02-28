import React from 'react'
import { Trash } from '../../utils/icon'
import { useAuth } from '../../Context/AuthContext';
import axios from 'axios';

export default function CommentSection({ allCommentsArray,fetchComments,fetchChildComments,setParentComment,showReplies,childComments }) {

    const { token, user, userImage } = useAuth();

    //------------
    const removeComment = async (id,parentId = null) => {
            try {
                const response = await axios.delete(`http://65.109.177.24:2024/api/comment/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                console.log('remove comment succesfully')
                if (!parentId) {
                    fetchComments();
                } else {
                    fetchChildComments(parentId);
                }
            } catch (error) {
                console.error('error removing comment ', error)
            }
    
        }
    return (
        <>


            {/* other user comment */}
            {!allCommentsArray.length > 0 ? <p className='  text-white flex justify-center'>No comment yet! Be the first one</p> :
                allCommentsArray.map(comment => (
                    <div key={comment.id} className=' border-b p-2 bg-gray-900 my-2'>
                        <div className='flex  relative items-center justify-start mb-3'>
                            <img src={comment.userImageId ? `http://65.109.177.24:2024/api/user/profile-pic/${comment.userImageId}` : `/image/Frame.png`} alt=""
                                className='h-8 w-8 rounded-full mx-2 object-cover' />
                            <p className='text-md font-bold text-pink-600' >{comment.userName}</p>
                            {user === comment.userName &&
                                <button className='absolute right-4 top-2 text-red-600'
                                    onClick={() => removeComment(comment.id)}>
                                    <Trash size='size-5' />
                                </button>}
                        </div>
                        <p>{comment.description}</p>
                        <button className='text-pink-600 text-xs font-bold'
                            onClick={() => setParentComment(comment)}> Reply</button>


                        {!showReplies[comment.id] && comment.childrenCount > 0 &&
                            <button className='text-xs ml-6 text-gray-400'
                                onClick={() => { fetchChildComments(comment.id) }}
                            > see {comment.childrenCount}  more replies</button>}
                        {/* ------reply comment section     */}
                        {showReplies[comment.id] && childComments[comment.id] && childComments[comment.id].map(reply => (
                            <div key={reply.id} className=' border border-gray-700 p-2 ml-5 bg-gray-800 my-2 rounded-tr-xl rounded-br-xl rounded-bl-xl'>
                                <div className='flex  relative items-center justify-start mb-3'>
                                    <img src={comment.userImageId ? `http://65.109.177.24:2024/api/user/profile-pic/${reply.userImageId}` : `/image/Frame.png`} alt=""
                                        className='h-8 w-8 rounded-full mx-2 object-cover' />
                                    <p className='text-md font-bold text-pink-600' >{reply.userName}</p>
                                    {user === reply.userName &&
                                        <button className='absolute right-4 top-2 text-red-600'
                                            onClick={() => removeComment(reply.id, comment.id)}>
                                            <Trash size='size-5' />
                                        </button>}



                                </div>
                                <p>{reply.description}</p>
                                {/* <button className='text-pink-600 text-xs font-bold'
                                                   onClick={() => setParentComment(reply)}>  Reply</button> */}
                            </div>


                        ))

                        }




                    </div>
                ))}
            {/* reply comment section  */}

            {/* other user comment */}
        </>
    )
}
