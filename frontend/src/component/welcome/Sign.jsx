import { useState } from "react"
import toast from "react-hot-toast"
import axios from 'axios';
import { USER_URL } from "../constant/RestApis";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { setAuthUser } from "../../redux/userSlicer";

const Sign = () => {
  let [isSign, setIsSign] = useState(true)
  let navigate = useNavigate()

  let dispatch = useDispatch()


  let isSignToggel = () => {
    setIsSign(!isSign)
  }

  let [user, setUser] = useState({
    fullname: "",
    email: "",
    password: "",
    gender: "",
  })


  let formSubmitHandler = async (e) => {
    e?.preventDefault()

    try {
      if (isSign) {
        //sign
        axios.defaults.withCredentials = true
        let res = await axios.post(`${USER_URL}/register`, user)


        if (res?.data?.success) {
          toast.success(res?.data?.massage)
          setIsSign(false)
        }

      } else {
        //login

        let res = await axios.post(`${USER_URL}/login`, user, {
          withCredentials: true
        })
        
        dispatch(setAuthUser(res?.data?.createdUser))
        if (res?.data?.success) {
          navigate("/")
          toast.success(res?.data?.massage)
        }
      }
    } catch (error) {
      toast.error(error?.response?.data?.massage)
    }
  }


  return (
    <div className="w-full h-screen flex items-center justify-center">

      <form onSubmit={formSubmitHandler} className="w-[40%] p-3 shadow-2xl">

        <div className="m-4">

          <div className="w-full text-center my-3">
            <h2 className="font-bold text-2xl ">
              {
                isSign ? "Welcome to Sign" : "Welcome to Login"
              }
            </h2>
          </div>

          <div>
            {
              isSign ?
                <div>
                  {/* fullname */}
                  <div className="my-3">
                    <label htmlFor="fullname" className="font-semibold text-xl">Fullname:</label>
                    <input type="text" name="fullname" placeholder="fullname" value={user.fullname} onChange={(e) => setUser({ ...user, fullname: e?.target?.value })} className="w-full border-black border-[1px] p-2" />
                  </div>

                  {/* email */}
                  <div className="my-3">
                    <label htmlFor="email" className="font-semibold text-xl">Email:</label>
                    <input type="email" name="email" placeholder="Email" value={user.email} onChange={(e) => setUser({ ...user, email: e?.target?.value })} className="w-full border-black border-[1px] p-2" />
                  </div>

                  {/* password */}
                  <div className="my-3">
                    <label htmlFor="password" className="font-semibold text-xl">Password:</label>
                    <input type="password" name="password" placeholder="Password" value={user.password} onChange={(e) => setUser({ ...user, password: e?.target?.value })} className="w-full border-black border-[1px] p-2" />
                  </div>

                  {/* gender */}
                  <div className="flex gap-5 font-semibold text-xl my-4">

                    <div>
                      <label htmlFor="gender">Mail:</label>
                      <input type="radio" name="gender" value={"mail"} onChange={(e) => setUser({ ...user, gender: e?.target?.value })} />
                    </div>

                    <div>
                      <label htmlFor="gender">Femail:</label>
                      <input type="radio" name="gender" value={"Femail"} onChange={(e) => setUser({ ...user, gender: e?.target?.value })} />
                    </div>
                  </div>

                  {/* login link */}
                  <div className="w-full text-center my-3">
                    <p className="font-semibold text-xl cursor-pointer">Already have an account? please <span className="text-blue-600" onClick={isSignToggel}>Login</span></p>
                  </div>

                  {/* submit */}
                  <div className="border-black bg-blue-600 rounded-full w-full text-center my-5 cursor-pointer">
                    <button className="font-bold text-2xl py-2" type="submit">Sign</button>
                  </div>

                </div>
                :
                <div>
                  {/* email */}
                  <div className="my-3">
                    <label htmlFor="email" className="font-semibold text-xl">Email:</label>
                    <input type="email" name="email" placeholder="Email" value={user.email} onChange={(e) => setUser({ ...user, email: e?.target?.value })} className="w-full border-black border-[1px] p-2" />
                  </div>

                  {/* password */}
                  <div className="my-3">
                    <label htmlFor="password" className="font-semibold text-xl">Password:</label>
                    <input type="password" name="password" placeholder="Password" value={user.password} onChange={(e) => setUser({ ...user, password: e?.target?.value })} className="w-full border-black border-[1px] p-2" />
                  </div>


                  {/* login link */}
                  <div className="w-full text-center my-3">
                    <p className="font-semibold text-xl cursor-pointer">Donot have any account? please <span className="text-blue-600" onClick={isSignToggel}>Sign</span></p>
                  </div>

                  {/* submit */}
                  <div className="border-black bg-blue-600 rounded-full w-full text-center my-5 cursor-pointer">
                    <button className="font-bold text-2xl py-2" type="submit">Login</button>
                  </div>

                </div>
            }
          </div>

        </div>

      </form>
    </div>
  )
}

export default Sign