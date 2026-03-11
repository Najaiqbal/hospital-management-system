import { useEffect, useState } from "react"
import axios from "axios"
import "./DoctorPrescriptions.css"

function DoctorPrescriptions(){

const [prescriptions,setPrescriptions] = useState([])

useEffect(()=>{

const doctor_id = localStorage.getItem("doctor_id")

axios.get("http://127.0.0.1:8000/api/prescriptions/")
.then(res=>{

const myPrescriptions = res.data
.filter(p => p.doctor == doctor_id)
.sort((a,b)=> b.id - a.id)

setPrescriptions(myPrescriptions)

})

},[])

return(

<div className="doctor-prescription-container">

<h1 className="doctor-prescription-title">
My Prescriptions
</h1>

<div className="doctor-prescription-grid">

{prescriptions.length === 0 &&(
<p className="doctor-no-prescription">
No prescriptions yet
</p>
)}

{prescriptions.map(p =>(

<div className="doctor-prescription-card" key={p.id}>

<div className="doctor-prescription-header">
<h3>👤 Patient: {p.patient_name}</h3>
</div>

<div className="doctor-prescription-body">

<p>
<span>💊 Medicine:</span> {p.medicine}
</p>

<p>
<span>📏 Dosage:</span> {p.dosage}
</p>

<p>
<span>📝 Notes:</span> {p.notes}
</p>

<p>
<span>📅 Date:</span> {p.date}
</p>

</div>

</div>

))}

</div>

</div>

)

}

export default DoctorPrescriptions