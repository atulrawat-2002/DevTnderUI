import axios from "axios";
import UserCard from "./UserCard";
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from '../utils/feedSlice';
import { useEffect } from "react";


const FeedCard = () => {

    const feed = useSelector( store => store.feed );
    const dispatch = useDispatch();
    const getFeed = async () => {
        try {

        const res = await axios.get(`${BASE_URL}/user/feed`, { withCredentials: true })
        dispatch(addFeed(res.data.data));


        } catch (err) {
            console.log("ERROR: ", err);
        }

    }

    useEffect( () => {
        if(Boolean(feed.length)) return;
        getFeed();
    }, [])


    return (UserCard) => {
        return <>
            <UserCard user={feed[0]}/>
        </>
    }

    // return feed && <div>
    //     {
    //         feed.data.map( (data) => <UserCard key={Math.random()} user={data} showButton={true}/> )
    //     }
        
    // </div>

}




export default FeedCard;