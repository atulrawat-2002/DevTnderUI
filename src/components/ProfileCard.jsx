import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";
import UserCard from "./UserCard";


const ProfileCard = (UserCard) => {
    
return () => {
    const user = useSelector( store => store.user )
    return <UserCard user={user} />
}

}



export default ProfileCard;
    // const user = useSelector(store => store.user);

    // return user && <div className="flex justify-evenly" >
    //     <EditProfile user={user}/>
    // </div>