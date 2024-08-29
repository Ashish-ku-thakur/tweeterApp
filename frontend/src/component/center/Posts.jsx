import { useSelector } from "react-redux"
import Post from "./Post"

const Posts = () => {

    let { allPost } = useSelector((store) => store?.post)
    let { authUser } = useSelector((store) => store?.user)

    if (!allPost) {
        return ''
    }
    return (
        <div className="overflow-hidden h-full">
            <div className="overflow-y-scroll h-full">
                {
                    allPost?.map((post) => post?.senderId[0] == authUser?._id && <Post key={post?._id} data={post} />)
                }
            </div>
        </div>
    )
}

export default Posts