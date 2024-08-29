import Logo from "./Logo"
import Post from "./Post"
import Tabs from "./Tabs"

const LeftConatiner = () => {
  return (
    <div className="p-3 h-full">
      <div className="h-[8%]">
        <Logo />
      </div>

      <div className="text-2xl h-[76%]">
        <Tabs />
      </div>

      <div className="h-[10%]">
        <Post />
      </div>
    </div>
  )
}

export default LeftConatiner