import { useEffect, useState } from "react"
import axios from "axios"
import "./DoctorHome.css"

function DoctorHome(){

const [pending,setPending] = useState(0)
const [approved,setApproved] = useState(0)
const [prescriptions,setPrescriptions] = useState(0)

useEffect(()=>{

const doctor_id = localStorage.getItem("doctor_id")

// Get appointments
axios.get("https://hospital-management-system-d5wx.onrender.com/api/appointments/")
.then(res=>{

const myAppointments = res.data.filter(
a => a.doctor == doctor_id
)

const pendingCount = myAppointments.filter(
a => a.status === "Pending"
).length

const approvedCount = myAppointments.filter(
a => a.status === "Approved"
).length

setPending(pendingCount)
setApproved(approvedCount)

})

// Get prescriptions
axios.get("https://hospital-management-system-d5wx.onrender.com/api/prescriptions/")
.then(res=>{

const myPrescriptions = res.data.filter(
p => p.doctor == doctor_id
)

setPrescriptions(myPrescriptions.length)

})

},[])

return(

<div className="doctor-dashboard-container">

<h1 className="doctor-dashboard-title">
Doctor Dashboard
</h1>

<div className="doctor-dashboard-cards">

<div className="doctor-stat-card doctor-pending">
<h3>Pending Appointments</h3>
<p>{pending}</p>
</div>

<div className="doctor-stat-card doctor-approved">
<h3>Approved Appointments</h3>
<p>{approved}</p>
</div>

<div className="doctor-stat-card doctor-prescription">
<h3>Total Prescriptions</h3>
<p>{prescriptions}</p>
</div>

</div>

</div>

)

}

export default DoctorHome