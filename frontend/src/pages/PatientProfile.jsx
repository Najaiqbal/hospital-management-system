import { useEffect, useState } from "react"
import axios from "axios"
import "./PatientProfile.css"

function PatientProfile(){
    

const [patient,setPatient] = useState(null)
const [editMode,setEditMode] = useState(false)
const [name,setName] = useState("")
const [age,setAge] = useState("")
const [gender,setGender] = useState("")
const [address,setAddress] = useState("")
const [phone,setPhone] = useState("")

useEffect(()=>{

const patient_id = localStorage.getItem("patient_id")

axios.get(`http://127.0.0.1:8000/api/patients/${patient_id}/`)
.then(res=>{

setPatient(res.data)
setName(res.data.name)
setAge(res.data.age)
setGender(res.data.gender)
setAddress(res.data.address)
setPhone(res.data.phone)

})

},[])

const updateProfile = ()=>{

const patient_id = localStorage.getItem("patient_id")

axios.patch(`http://127.0.0.1:8000/api/patients/${patient_id}/`,{

age:age,
gender:gender,
address:address,
phone:phone

})
.then(()=>{

alert("Profile updated successfully")

setEditMode(false)

setPatient({
...patient,
age,
gender,
address,
phone
})

})

}

if(!patient){
return <p>Loading...</p>
}

return(

<div className="patient-profile-container">

<h2>My Profile</h2>

{!editMode ? (

<div className="patient-profile-card">


<h3>Name: {patient.name}</h3>

<p>Age: {patient.age}</p>

<p>Gender: {patient.gender}</p>

<p>Address: {patient.address}</p>

<p>Phone: {patient.phone}</p>

<button
className="patient-edit-btn"
onClick={()=>setEditMode(true)}
>
Edit Profile
</button>

</div>

) : (
    

<div className="patient-profile-card">

<label>Name</label>
<input
className="patient-input"
value={name}
onChange={(e)=>setName(e.target.value)}
/>

<label>Age</label>
<input
className="patient-input"
value={age}
onChange={(e)=>setAge(e.target.value)}
/>

<label>Gender</label>
<input
className="patient-input"
value={gender}
onChange={(e)=>setGender(e.target.value)}
/>

<label>Address</label>
<input
className="patient-input"
value={address}
onChange={(e)=>setAddress(e.target.value)}
/>

<label>Phone</label>
<input
className="patient-input"
value={phone}
onChange={(e)=>setPhone(e.target.value)}
/>

<button
className="patient-save-btn"
onClick={updateProfile}
>
Save Changes
</button>

<button
className="patient-cancel-btn"
onClick={()=>setEditMode(false)}
>
Cancel
</button>

</div>

)}

</div>

)

}

export default PatientProfile