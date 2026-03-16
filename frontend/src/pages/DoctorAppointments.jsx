import { useEffect,useState } from "react"
import axios from "axios"
import AddPrescription from "./AddPrescription"
import "./DoctorAppointments.css"

function DoctorAppointments(){

const [appointments,setAppointments] = useState([])
const [selectedAppointment,setSelectedAppointment] = useState(null)
const [prescriptionGiven,setPrescriptionGiven] = useState([])

useEffect(()=>{

const doctor_id = localStorage.getItem("doctor_id")

axios.get("https://hospital-management-system-d5wx.onrender.com/api/appointments/")
.then(res=>{

const myAppointments = res.data
.filter(a => a.doctor == doctor_id)
.sort((a,b)=> b.id - a.id)

setAppointments(myAppointments)

})

},[])


const updateStatus = (id,status)=>{

axios.patch(`https://hospital-management-system-d5wx.onrender.com/api/appointments/${id}/`,{
status:status
})

.then(()=>{

setAppointments(prev =>
prev.map(a =>
a.id === id ? {...a,status:status} : a
)
)

})

}


const markPrescriptionGiven = (id)=>{
setPrescriptionGiven(prev => [...prev,id])
setSelectedAppointment(null)
}


return(

<div className="doctor-appointments-container">

<h1 className="doctor-appointments-title">
Patient Appointments
</h1>

<div className="doctor-appointments-grid">

{appointments.map(app=>(

<div className="doctor-appointment-card" key={app.id}>

<h3>Patient: {app.patient_name}</h3>

<p>Department: {app.specialization}</p>

<p>Date: {app.date}</p>

<p>Time: {app.time}</p>

<p>
Status:
<span className={`status-badge ${app.status.toLowerCase()}`}>
{app.status}
</span>
</p>


{/* Pending */}

{app.status==="Pending" &&(

<div className="doctor-action-buttons">

<button
className="approve-btn"
onClick={()=>updateStatus(app.id,"Approved")}
>
Approve
</button>

<button
className="reject-btn"
onClick={()=>updateStatus(app.id,"Rejected")}
>
Reject
</button>

</div>

)}


{/* Approved */}

{app.status==="Approved" &&(

<div className="doctor-action-buttons">

<button
className="reject-btn"
onClick={()=>updateStatus(app.id,"Rejected")}
>
Reject
</button>

{!prescriptionGiven.includes(app.id) &&(

<button
className="prescription-btn"
onClick={()=>setSelectedAppointment(app)}
>
Add Prescription
</button>

)}

{prescriptionGiven.includes(app.id) &&(

<span className="prescription-done">
Prescription Given
</span>

)}

</div>

)}


{/* Rejected */}

{app.status==="Rejected" &&(

<div className="doctor-action-buttons">

<button
className="approve-btn"
onClick={()=>updateStatus(app.id,"Approved")}
>
Approve
</button>

</div>

)}

</div>

))}

</div>


{selectedAppointment &&(

<AddPrescription
appointment={selectedAppointment}
onSuccess={()=>markPrescriptionGiven(selectedAppointment.id)}
/>

)}

</div>

)

}

export default DoctorAppointments