import Navbar from "./Navbar"
import Footer from "./Footer"
import { Outlet, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { BASE_URL } from '../utils/constants'
import { addUser } from '../utils/userSlice';
import axios from "axios"

const Body = () => {
    const user = useSelector(store => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const fetchUser = async () => {
        try {
            const user = await axios.get(`${BASE_URL}/profile/view`, { withCredentials: true });
            dispatch(addUser(user.data))
        } catch (err) {
            navigate("/login")
            console.log("ERROR", err);
        }
    }

    useEffect(() => {
        fetchUser();
    }, [])

    return <>
        <Navbar />
        <Outlet />
        <Footer />
    </>
}


export default Body;