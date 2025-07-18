import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import UserCard from "./UserCard";



const Connections = () => {

    const cardStyle = {
        transform: "rotate(5deg)",
        transformOrigin: " "
    }

    const connectionStyle = {
        height: "5px",
        width: "20px",
        position: "absolute",
        top: "150px",
        left: "605px"

    }

    const dispatch = useDispatch()
    const connections = useSelector(store => store.connections);
    const user = useSelector(store => store.user)
    const { firstName, lastName, photoUrl, age } = user;
    const getConnections = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/user/connections`, { withCredentials: true })
            dispatch(addConnections(res.data.data))
            console.log(res.data.data); 
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect( () => {
        if(connections) return;
        getConnections();
    }, [])

    if(!connections){
        return <>You have no connections yet</>
    }

    return <>

    { connections &&
            
                connections.map( (connection) => {
                    return <div  key={connection._id} className="flex  justify-center relative gap-5 my-5" >
                        <div className=" w-xs  h-96 " style={cardStyle}>
                        <UserCard user={connection} showbutton={false} forView={true} viewProfile={true} />
                        </div>
                        <div className=" w-xs " style={cardStyle}>
                        <UserCard user={{ firstName, lastName, photoUrl, age}} showbutton={false} forView={true} viewProfile={true}/>
                    </div>
                    </div>
                })

        
            }
    </>

} 




export default Connections;