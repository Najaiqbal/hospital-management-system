import { useState, useEffect } from "react"
import axios from "axios"
import "./Dashboard.css"
import Doctors from "./Doctors"
import MyAppointments from "./MyAppointments"
import BookAppointment from "./BookAppointment"
import MyPrescriptions from "./MyPrescriptions"
import PatientProfile from "./PatientProfile"

function PatientDashboard({ user, setUser }) {

const [page,setPage] = useState("dashboard")

const [appointmentsCount,setAppointmentsCount] = useState(0)
const [doctorsCount,setDoctorsCount] = useState(0)
const [prescriptionsCount,setPrescriptionsCount] = useState(0)

const [selectedDoctor,setSelectedDoctor] = useState(null)

useEffect(()=>{

const patient_id = parseInt(localStorage.getItem("patient_id"))

/* Appointments count */

axios.get("http://127.0.0.1:8000/api/appointments/")
.then(res=>{

const myAppointments = res.data.filter(
a => a.patient === patient_id
)

setAppointmentsCount(myAppointments.length)

})

.catch(err=>{
console.log(err)
})


/* Doctors count */

axios.get("http://127.0.0.1:8000/api/doctors/")
.then(res=>{
setDoctorsCount(res.data.length)
})

.catch(err=>{
console.log(err)
})


/* Prescriptions count */

axios.get("http://127.0.0.1:8000/api/prescriptions/")
.then(res=>{

const myPrescriptions = res.data.filter(
p => p.patient === patient_id
)

setPrescriptionsCount(myPrescriptions.length)

})

.catch(err=>{
console.log(err)
})

},[])


const logout = ()=>{
setUser(null)
}


return(

<div className="dashboard-container">

<div className="sidebar">

<h2>Patient Panel</h2>

<ul>

<li onClick={()=>setPage("dashboard")}>🏠 Dashboard</li>

<li onClick={()=>setPage("profile")}>👤 My Profile</li>

<li onClick={()=>setPage("doctors")}>👨‍⚕️ Doctors</li>

<li onClick={()=>setPage("appointment")}>📅 Book Appointment</li>

<li onClick={()=>setPage("myappointments")}>📋 My Appointments</li>

<li onClick={()=>setPage("prescriptions")}>💊 My Prescriptions</li>

</ul>

<button onClick={logout}>Logout</button>

</div>


<div className="dashboard-content">

{page==="dashboard" && (

<>

<h1>Welcome Patient</h1>

<div className="stats-grid">

<div className="stat-card appointments">
📅 Appointments
<br/>
{appointmentsCount}
</div>

<div className="stat-card doctors">
👨‍⚕️ Doctors
<br/>
{doctorsCount}
</div>

<div className="stat-card prescriptions">
💊 Prescriptions
<br/>
{prescriptionsCount}
</div>

</div>

</>

)}


{page==="profile" && <PatientProfile/>}

{page==="doctors" &&
<Doctors setPage={setPage} setSelectedDoctor={setSelectedDoctor}/>
}

{page==="appointment" &&
<BookAppointment doctor={selectedDoctor}/>
}

{page==="myappointments" &&
<MyAppointments/>
}

{page==="prescriptions" &&
<MyPrescriptions/>
}

</div>

</div>

)

}

export default PatientDashboard