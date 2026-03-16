import { useEffect, useState } from "react"
import axios from "axios"
import "./DoctorProfile.css"

function DoctorProfile(){

const [doctor,setDoctor] = useState(null)
const [editMode,setEditMode] = useState(false)

const [name,setName] = useState("")
const [specialization,setSpecialization] = useState("")
const [experience,setExperience] = useState("")

useEffect(()=>{

const doctor_id = localStorage.getItem("doctor_id")

axios.get(`https://hospital-management-system-d5wx.onrender.com/api/doctors/${doctor_id}/`)
.then(res=>{

setDoctor(res.data)

setName(res.data.name)
setSpecialization(res.data.specialization)
setExperience(res.data.experience)

})

},[])

const updateProfile = ()=>{

const doctor_id = localStorage.getItem("doctor_id")

axios.patch(`https://hospital-management-system-d5wx.onrender.com/api/doctors/${doctor_id}/`,{

name:name,
specialization:specialization,
experience:experience

})
.then(()=>{

alert("Profile updated successfully")

setEditMode(false)

setDoctor({
...doctor,
name,
specialization,
experience
})

})

}

if(!doctor){
return <p>Loading...</p>
}

return(

<div className="doctor-profile-container">

<h1 className="doctor-profile-title">
My Profile
</h1>

{!editMode ? (

<div className="doctor-profile-card">

<div className="doctor-profile-header">
{/* <img
src="https://cdn-icons-png.flaticon.com/512/2966/2966480.png"
className="doctor-avatar"
/> */}

<h2>Dr. {doctor.name}</h2>

</div>

<div className="doctor-profile-details">

<p>
<span>Department:</span> {doctor.specialization}
</p>

<p>
<span>Experience:</span> {doctor.experience} years
</p>

</div>

<button
className="doctor-edit-btn"
onClick={()=>setEditMode(true)}
>
Edit Profile
</button>

</div>

) : (

<div className="doctor-edit-card">

<label>Name</label>
<input
value={name}
onChange={(e)=>setName(e.target.value)}
/>

<label>Department</label>
<input
value={specialization}
onChange={(e)=>setSpecialization(e.target.value)}
/>

<label>Experience</label>
<input
value={experience}
onChange={(e)=>setExperience(e.target.value)}
/>

<div className="doctor-edit-buttons">

<button
className="doctor-save-btn"
onClick={updateProfile}
>
Save Changes
</button>

<button
className="doctor-cancel-btn"
onClick={()=>setEditMode(false)}
>
Cancel
</button>

</div>

</div>

)}

</div>

)

}

export default DoctorProfile