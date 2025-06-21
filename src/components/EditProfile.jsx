import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useLocation } from "react-router-dom";


//********** */ Passing edit Flag in the state form the respective Link component if the edit flag is true two components will be renderred otherwise only the **********/

const EditProfile = ({ user }) => {

    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [age, setAge] = useState(user.age);
    const [gender, setGender] = useState(user.gender);
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
    const [about, setAbout] = useState(user.about)
    // const [skills, setSkills] = useState(user.skills)

    const [skill, setSkill] = useState('');
    const [skills, setSkills] = useState([]);

    const [err, setErr] = useState("");
    const [showToast, setShowToast] = useState(false);

    const location = useLocation();
    const state = location.state;

    const dispatch = useDispatch();

    const addSkill = () => {
        if (skill.trim() && !skills.includes(skill.trim())) {
            setSkills([...skills, skill.trim()]);
            setSkill('');
        }
    };

    const removeSkill = (index) => {
        const updated = [...skills];
        updated.splice(index, 1);
        setSkills(updated);
    };

    const saveProfile = async () => {
        try {
            setErr("");
            const res = await axios.patch(`${BASE_URL}/profile/edit`, { firstName, lastName, age, photoUrl, about, gender, skills }, { withCredentials: true });
            dispatch(addUser(res.data.data));
            setShowToast(true)
            setTimeout(() => {
                setShowToast(false)
            }, 2000);

        } catch (err) {
            console.log('ERROR: ', err)
            setErr(err.response.data)
        }
    }

    return <>
        <div className="flex flex-col " >
            <div className="mx-auto" ><h1>You can make changes to your profile here</h1></div>
            <div className="flex gap-5 ">
        {state?.edit &&
            <div className="flex justify-center m-7 mb-16" >
                <div className="card bg-neutral text-neutral-content w-96 ">
                    <div className="card-body items-center text-center">
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend text-left">FirstName</legend>
                            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="input h-7 " placeholder="Firs tName" />
                            <legend className="fieldset-legend">LastName</legend>
                            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="input  h-7" placeholder="Last Name" />
                            <legend className="fieldset-legend">Age</legend>
                            <input type="text" value={age} onChange={(e) => setAge(e.target.value)} className="input  h-7" placeholder="Last Name" />
                            <div className="form-control w-full max-w-xs">
                                <legend className="fieldset-legend">Gender</legend>
                                <select id="gender" name="gender" className="select select-bordered" onChange={(e) => setGender(e.target.value)} >
                                    <option disabled defaultValue={gender}> {gender} </option>
                                    <option value="male">male</option>
                                    <option value="female">female</option>
                                    <option value="other">other</option>
                                </select>
                            </div>

                            <legend className="fieldset-legend">About</legend>
                            <textarea rows={3} cols={60} className="textarea" placeholder="About" value={about} onChange={e => setAbout(e.target.value)} ></textarea>
                            <legend className="fieldset-legend">photo Url</legend>
                            <input type="text" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} className="input  h-7" placeholder="Last Name" />
                            <div className="form-control">
                               <legend className="fieldset-legend">Skills</legend>
                                <div className="flex gap-2 flex-wrap mb-2">
                                    {skills.map((s, i) => (
                                        <div key={i} className="badge badge-primary gap-2">
                                            {s}
                                            <button onClick={() => removeSkill(i)} className="ml-1 text-white">×</button>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        className="input input-bordered w-full"
                                        value={skill}
                                        onChange={(e) => setSkill(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                                        placeholder="Type a skill and press Enter"
                                    />
                                    <button className="btn btn-primary" onClick={addSkill}>Add</button>
                                </div>
                            </div>

                            <p className="text-red-600" >{err}</p>
                        </fieldset>
                        <div className="card-actions justify-center">
                            <button className="btn btn-primary" onClick={() => saveProfile()} >Save</button>
                        </div>
                    </div>
                </div>
            </div>
           
        }
        <UserCard user={{ firstName, lastName, age, photoUrl, about, gender, skills }} showButton={false} forView={!(state?.edit)} />
        </div>
        </div>

        {
            showToast && <div className="toast toast-top toast-center">
                <div className="alert alert-success">
                    <span>Profile Editted successfully.</span>
                </div>
            </div>
        }
    </>
}


export default EditProfile;