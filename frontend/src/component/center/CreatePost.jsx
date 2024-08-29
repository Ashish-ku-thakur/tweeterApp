import { useDispatch, useSelector } from 'react-redux';
import { CiImageOn } from "react-icons/ci";
import { CiLink } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
import { useState } from 'react';
import axios from 'axios';
import { POST_URL } from '../constant/RestApis';
import { toast } from 'react-hot-toast';
import { setAllPost } from '../../redux/postSlicer';

const CreatePost = () => {

  let [text, setText] = useState("")

  let dispatch = useDispatch()

  let { authUser } = useSelector((store) => store?.user)
  let { allPost } = useSelector((store) => store?.post)


  // post
  let postCreateHandler = async () => {
    try {
      axios.defaults.withCredentials = true
      let res = await axios.post(`${POST_URL}/postCreate/`, { text })

      if (res?.data?.success) {
        dispatch(setAllPost([res?.data?.postCreated, ...allPost]))
        setText("")
        toast?.success(res?.data?.massage)
      }

    } catch (error) {
      toast.error(error?.code)
    }
  }
  return (
    <div className='w-full'>
      <div className='flex gap-4 w-full'>
        <div className='w-[14%]'>
          <img src={authUser?.profilePhoto} alt="" />
        </div>

        <div className='w-full flex flex-col gap-4'>
          <input type="text" name="post" placeholder='post' value={text} onChange={(e) => setText(e?.target?.value)} className='border-black border-[1px] outline-none py-2 w-full px-3' />


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

            <div onClick={postCreateHandler} className='bg-blue-500 py-2 px-8 rounded-full'>
              <button type="submit" className=''>Post</button>
            </div>

          </div>

        </div>
      </div>

      <hr className='border-black my-5' />

    </div>
  )
}

export default CreatePost