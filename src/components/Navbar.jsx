import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import { removeFeed } from "../utils/feedSlice";
import { removeConnections } from "../utils/connectionSlice";

const Navbar = () => {

  const user = useSelector(store => store.user) ;
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true })
      dispatch(removeUser());
      dispatch(removeFeed());
      dispatch(removeConnections())
    } catch (err) {
      console.log("ERROR", err);
    }
  }


  return <>
    <div className="navbar bg-base-300 shadow-sm">
      <div className="flex-1">
        <Link to='/' className="btn btn-ghost text-xl">Dev Tinder</Link>
      </div>
      <div className="flex gap-4 items-center " >
        {user && <p>Welcome {user.firstName}</p>}

        <div className="dropdown dropdown-end">
          <div id="dropdown-trigger" tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            {user && <div className="w-10 rounded-full">
              <img
                alt="User Image"
                src={user.photoUrl} />
            </div>}
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-200 rounded-box z-1 mt-3 w-52 p-2 shadow">
            <li className="text-secondary" >
              <Link to='/' className="justify-between">
                Home
              </Link>
            </li>
            <li className="text-primary" >
              <Link to='/requests' className="justify-between">
                Requests
              </Link>
            </li>
            <li className="text-secondary" >
              <Link to='/connections' className="justify-between">
                Connections
              </Link>
            </li>
            <li className="text-primary text-2xl" >
              <Link to='/profile' className="justify-between">
                View Profile
              </Link>
            </li>
            <li className=" text-secondary " > <Link to='/profile' state={{edit: true}} className="justify-between">
                Edit Profile
              </Link></li>
            <li className=" " >{/* You can open the modal using document.getElementById('ID').showModal() method */}
              <button className="btn btn-primary " onClick={() => {
                document.activeElement.blur();
                document.getElementById('my_modal_4').showModal()
                  // handleLogout();
              }}>Logout</button>
              <dialog id="my_modal_4" className="modal flex justify-center">
                <div className="modal-box w-screen">
                  {/* <h3 className="font-bold text-lg">Alert!</h3> */}
                  <h3 className="py-4 text-sm ">Do you want to log out?</h3>
                  <div className="modal-action">
                    <form method="dialog">
                      {/* if there is a button, it will close the modal */}
                      <button className="btn" onClick={() => {
                         navigate('/login')
                         handleLogout()
                        }
                        }
                          >Yes</button>
                      <button className="btn"  >No</button>
                    </form>
                  </div>
                </div>
              </dialog></li>
          </ul>
        </div>
      </div>
    </div>
  </>
}


export default Navbar;