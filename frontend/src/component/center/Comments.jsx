import { useDispatch, useSelector } from "react-redux"
import { CiImageOn, CiLink, CiLocationOn } from "react-icons/ci"
import { useState } from "react"
import axios from "axios"
import { COMMENT_URL } from "../constant/RestApis"
import { setPostComments } from "../../redux/commentSlicer"
import PostComments from "./PostComments"
import useGetAllPostComment from "../../hooks/useGetAllPostComment"
import toast from "react-hot-toast"

const Comments = () => {
    useGetAllPostComment()
    let dispatch = useDispatch()
    let { authUser } = useSelector((store) => store?.user)

    let [commentText, setCommentText] = useState("")

    let { selectedPost } = useSelector((store) => store?.post)
    let { postComments } = useSelector((store) => store?.comment)

    // createComment
    let commentCreatehandler = async () => {
        try {
            let res = await axios.post(`${COMMENT_URL}/commentCreate/${selectedPost?._id}`,
                { comment: commentText }, { withCredentials: true })


            if (res?.data?.success) {
                dispatch(setPostComments([...postComments, res?.data?.createComment]))
                setCommentText("")
                toast?.success(res?.data?.massage)
            }

        } catch (error) {
            toast.error(error?.code)
        }
    }
    return (
        <div className="m-3 h-full">
            {/* createComment */}
            <div className='w-full h-[25%]'>
                <div className='flex gap-4 w-full'>
                    <div className='w-[14%]'>
                        <img src={authUser?.profilePhoto} alt="" />
                    </div>

                    <div className='w-full flex flex-col gap-4'>
                        <input type="text" name="post" placeholder='post' value={commentText}
                            onChange={(e) => setCommentText(e?.target?.value)}
                            className='border-black border-[1px] outline-none py-2 w-full px-3' />


                        <div className='flex justify-between'>

                            <div className='flex gap-8'>
                                <div>
                                    <CiImageOn size={"30px"} />
                                </div>
                                <div>
                                    <CiLink size={"30px"} />
                                </div>
                                <div>
                                    <CiLocationOn size={"30px"} />
                                </div>
                            </div>

                            <div onClick={commentCreatehandler} className='bg-blue-500 py-2 px-8 rounded-full'>
                                <button type="submit" className=''>Post</button>
                            </div>

                        </div>

                    </div>
                </div>

                <hr className='border-black my-5' />

            </div>


            {/* selected Comment */}
            <div className="w-full my-6 h-[65%]">
                <div className="flex gap-4 w-full h-full ">

                    <div className="w-[13%] h-full ">
                        <img src={selectedPost?.profilePhoto} alt="" />
                    </div>


                    <div className="w-full h-full overflow-hidden">
                        {/* name email massage */}
                        <div className="w-[87%] mb-8">
                            <div className="flex gap-5">
                                <h3>{selectedPost?.fullname}</h3>
                                <h3>{selectedPost?.email}</h3>
                            </div>

                            <div>
                                <p>{selectedPost?.massage}</p>
                            </div>
                        </div>

                        <div className="h-[75%] overflow-y-scroll">
                            {/* for all comments */}

                            {
                                postComments && postComments?.map((comments) => <PostComments key={comments?._id} comment={comments} />)
                            }
                        </div>


                    </div>
                </div>
            </div>
        </div>
    )
}

export default Comments