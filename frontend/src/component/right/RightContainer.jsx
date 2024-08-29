import Logout from "./Logout"
import OtherUsers from "./OtherUsers"
import SearchUser from "./SearchUser"

const RightContainer = () => {
  return (
    <div className="h-full m-3">
      <div className="h-[23%]">
        <SearchUser />
      </div>

      <div className="h-[60%] my-3"> 
        <OtherUsers />
      </div>

      <div className="h-[10%]">
        <Logout/>
      </div>
    </div>
  )
}

export default RightContainer