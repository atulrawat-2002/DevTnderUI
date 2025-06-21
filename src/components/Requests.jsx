import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequest } from "../utils/requestsSlice";
import UserCard from "./UserCard";


const Requests = () => {

    const dispatch = useDispatch();
    const requests = useSelector( store => store.requests )

    const getRequests = async () => {
        const res = await axios.get(`${BASE_URL}/user/requests`, { withCredentials: true })
        dispatch(addRequest(res.data.data))

    }
    
    useEffect( () => {
        if(requests) return;
        getRequests();
    }, [])

    return <>
        { requests &&
            requests.map( (request) => {
                 return <div key={request?._id} > <UserCard  user={request?.fromUserId} showButton={false} forView={false} forRequest={true} requestId={request?._id}/> </div>
            }  )
        }
    </>
}



export default Requests;