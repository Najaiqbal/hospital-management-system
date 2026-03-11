import { useState } from "react"
import "./Dashboard.css"
import DoctorProfile from "./DoctorProfile"
import DoctorAppointments from "./DoctorAppointments"
import DoctorPrescriptions from "./DoctorPrescriptions"
import DoctorHome from "./DoctorHome"

function DoctorDashboard({ user, setUser }) {

const [page,setPage] = useState("dashboard")

const logout = ()=>{
setUser(null)
}

return(

<div className="dashboard-container">

<div className="sidebar">

<h2>Doctor Panel</h2>

<ul>

<li onClick={()=>setPage("dashboard")}>🏠 Dashboard</li>

<li onClick={()=>setPage("profile")}>👨‍⚕️ My Profile</li>

<li onClick={()=>setPage("appointments")}>📅 Appointments</li>

<li onClick={()=>setPage("prescriptions")}>💊 Prescriptions</li>

</ul>

<button onClick={logout}>Logout</button>

</div>


<div className="dashboard-content">

{page==="dashboard" && <DoctorHome/>}

{page==="profile" && <DoctorProfile/>}

{page==="appointments" && <DoctorAppointments/>}

{page==="prescriptions" && <DoctorPrescriptions/>}

</div>

</div>

)

}

export default DoctorDashboard