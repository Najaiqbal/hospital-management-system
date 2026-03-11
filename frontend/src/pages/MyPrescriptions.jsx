import { useEffect, useState } from "react"
import axios from "axios"
import "./MyPrescriptions.css"

function MyPrescriptions(){

const [prescriptions,setPrescriptions] = useState([])

useEffect(()=>{

const patient_id = parseInt(localStorage.getItem("patient_id"))

axios.get("http://127.0.0.1:8000/api/prescriptions/")
.then(res=>{

const myPrescriptions = res.data.filter(
p => p.patient == patient_id
)

setPrescriptions(myPrescriptions)

})

},[])

return(

<div className="patient-prescription-container">

<h1 className="patient-prescription-title">
My Prescriptions
</h1>

<div className="patient-prescription-grid">

{prescriptions.length === 0 && (
<p className="no-prescription">
No prescriptions yet
</p>
)}

{prescriptions.map(p =>(

<div className="patient-prescription-card" key={p.id}>

<h3>Dr. {p.doctor_name}</h3>

<div className="prescription-info">

<p>
<span>Medicine:</span> {p.medicine}
</p>

<p>
<span>Dosage:</span> {p.dosage}
</p>

<p>
<span>Notes:</span> {p.notes}
</p>

<p>
<span>Date:</span> {p.date}
</p>

</div>

</div>

))}

</div>

</div>

)

}

export default MyPrescriptions


