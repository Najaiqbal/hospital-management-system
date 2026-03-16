import { useEffect, useState } from "react"
import axios from "axios"
import "./Doctors.css"

function Doctors({ setPage, setSelectedDoctor }) {

const [doctors,setDoctors] = useState([])

useEffect(()=>{

axios.get("https://hospital-management-system-d5wx.onrender.com/api/doctors/")
.then(res=>{
setDoctors(res.data)
})

},[])


const bookDoctor = (doc)=>{

setSelectedDoctor(doc)
setPage("appointment")

}

return(

<div className="doctors-container">

<h1 className="doctors-title">Our Doctors</h1>

<div className="doctor-grid">

{doctors.map(doc =>{

const name = doc.doctor_name || doc.username || doc.name
const initial = name ? name.charAt(0).toUpperCase() : "D"

return(

<div className="doctor-card" key={doc.id}>

<div className="doctor-avatar">
{initial}
</div>

<h3>Dr. {name}</h3>

<p className="dept">
{doc.specialization}
</p>

<button
className="book-btn"
onClick={()=>bookDoctor(doc)}
>
Book Appointment
</button>

</div>

)

})}

</div>

</div>

)

}

export default Doctors