import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from '../utils/constants';
import { Link, useNavigate } from "react-router-dom"

const Login = () => {


    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [signUp, setSignUp] = useState(false);
    const [err, setErr] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await axios.post(
               `${BASE_URL}/login`,
                {
                    emailId,
                    password,
                },
                { withCredentials: true }
            );

            dispatch(addUser(res.data))
            return navigate('/');
        } catch (err) {
            console.log("ERROR : " + err);
            console.log(err)
            setErr(err.response.data)
        }
    }

    const handleSignUp = async () => {
        try {
            const res = await axios.post(
               `${BASE_URL}/signup`,
                {
                    firstName,
                    lastName,
                    emailId,
                    password,
                },
                { withCredentials: true }
            );
            dispatch(addUser(res.data))
            return navigate('/profile');
        } catch (err) {
            console.log("ERROR : " + err);
            console.log(err)
            setErr(err.response.data)
        }
    }


    return <div className="flex justify-center" >
        <div className="card bg-neutral text-neutral-content w-96 ">
            <div className="card-body items-center text-center">
                <fieldset className="fieldset">
                    { signUp && <>
                    <legend className="fieldset-legend text-left">Enter First Name</legend>
                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="input" placeholder="first name" />
                    <legend className="fieldset-legend text-left">Enter Last Name</legend>
                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="input" placeholder="last name" />
                    </>}
                    <legend className="fieldset-legend text-left">Enter Email</legend>
                    <input type="text" value={emailId} onChange={(e) => setEmailId(e.target.value)} className="input" placeholder="Email" />
                    <legend className="fieldset-legend">Enter Password</legend>
                    <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} className="input" placeholder="password" />
                    <p className="text-red-500" > {err} </p>
                </fieldset>
                <div className="card-actions justify-center">
                    {
                        signUp? <button className="btn btn-primary" onClick={() => handleSignUp()} >SignUp</button>: <button className="btn btn-primary" onClick={() => handleLogin()} >Login</button>
                    }
                </div>
                    <button className=" cursor-pointer " onClick={() => setSignUp(!signUp)} > <p className="text-blue-600" > { signUp ? "Already have Account? Login Here!" : "New User? SignUp Here!" } </p> </button>
            </div>
        </div>
    </div>
}



export default Login;