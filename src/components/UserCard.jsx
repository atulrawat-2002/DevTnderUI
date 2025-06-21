import { Link } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";
import { addRequest, removeRequest } from "../utils/requestsSlice";
import { addConnections } from "../utils/connectionSlice";


const UserCard = ({ user, showButton, forView, viewProfile, forRequest, requestId }) => {
    const dispatch = useDispatch();

  const outgoingRequest = async (status, toUserId) => {
    const res = await axios.post(`${BASE_URL}/request/${status}/${toUserId}`, {}, { withCredentials: true })
    dispatch(removeFeed(toUserId));
    dispatch(addRequest());
  }

  const incomingRequest = async (status, requestId) => {
    const res = await axios.post(`${BASE_URL}/request/review/${status}/${requestId}`, {}, { withCredentials: true })
    dispatch(removeRequest(requestId));
    dispatch(addConnections());
  }

  const {
    _id = "",
    firstName = "",
    lastName = "",
    age = null,
    gender = "",
    photoUrl = null,
    about = "",
    skills = null
  } = user;

  if(!forView) {
    return  <div className="flex justify-center my-7 mb-16" >
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure>
        <img
          src={photoUrl}
          alt={firstName} />
      </figure>
      <div className="card-body">
        <h2 className="card-title"> {`${firstName} ${lastName}`} </h2>
        {age && <h3>Age: {age}</h3>}
        {gender && <h3>Gender: {gender}</h3>}
        {skills && <ul>
          {skills.map((skill) => <li> {skill} </li>)}
        </ul>}
        <p> {about} </p>

        {
          showButton ? <div className="card-actions justify-evenly">
            <button className="btn btn-primary" onClick={() => outgoingRequest("ignored", _id)} >Ignore</button>
            <button className="btn btn-secondary" onClick={() => outgoingRequest("interested", _id)} >Interested</button>
          </div> : ""
        }

        {
          forRequest ? <div className="card-actions justify-evenly">
            <button className="btn btn-primary" onClick={() => incomingRequest("accepted", requestId)} >Accept</button>
            <button className="btn btn-secondary" onClick={() => incomingRequest("accepted", requestId)} >Reject</button>
          </div> : ""
        }
      </div>
    </div>
  </div> 
  } else {
    return <div className="card card-side   flex m-auto max-w-prose bg-base-300 hover:shadow-[0_0_15px_5px_rgba(59,130,246,0.7)] transition-shadow duration-300 p-2 ">
  <figure className=" m-10 rounded-2xl " >
    <img
      src={photoUrl}
      alt={firstName} />
  </figure>
  <div className="card-body flex min-w-1/6 max-w-1/2">
    <h3 className="card-title">{ `${firstName} ${lastName}` }</h3>
    { age && <p>Age: {age}</p>}
    { gender && <p>Gender: {gender}</p>}
    { skills && <p>Skills: {skills}</p>}
    { about && <p>About: {about}</p>}
    <div className="card-actions justify-end">
      {
        viewProfile ? <Link > <button className="btn btn-block btn-primary">Visit Profile</button> </Link> : <Link to='/profile' state={{edit: true}} className="btn btn-block btn-primary" ><button className="btn btn-block btn-primary">Edit</button></Link>
      }
    </div>
  </div>
</div>
  }

}


export default UserCard;