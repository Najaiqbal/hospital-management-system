// import { useState } from "react"
// import axios from "axios"

// function EditDoctor({ doctor }) {

//   const [name,setName] = useState(doctor.name)
//   const [specialization,setSpecialization] = useState(doctor.specialization)
//   const [experience,setExperience] = useState(doctor.experience)

//   const updateDoctor = ()=>{

//     axios.put(
//       `http://127.0.0.1:8000/api/doctors/${doctor.id}/`,
//       {
//         name:name,
//         specialization:specialization,
//         experience:experience
//       }
//     )

//     .then(()=>{
//       alert("Profile Updated Successfully")
//       window.location.reload()
//     })

//     .catch(()=>{
//       alert("Error updating profile")
//     })

//   }

//   return(

//     <div>

//       <h2>Edit Doctor Profile</h2>

//       <input
//       value={name}
//       onChange={(e)=>setName(e.target.value)}
//       placeholder="Doctor Name"
//       />

//       <input
//       value={specialization}
//       onChange={(e)=>setSpecialization(e.target.value)}
//       placeholder="Specialization"
//       />

//       <input
//       value={experience}
//       onChange={(e)=>setExperience(e.target.value)}
//       placeholder="Experience"
//       />

//       <button onClick={updateDoctor}>
//       Update
//       </button>

//     </div>

//   )

// }

// export default EditDoctor