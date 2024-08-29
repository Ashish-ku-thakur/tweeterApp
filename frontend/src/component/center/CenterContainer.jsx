import CreatePost from "./CreatePost"
import Posts from "./Posts"

const CenterContainer = () => {


  return (
    <div className="m-3 h-full ">
      <div className="h-[25%]">
        <CreatePost />
      </div>

      <div className="h-[70%]">
        <Posts />
      </div>

    </div>
  )
}

export default CenterContainer