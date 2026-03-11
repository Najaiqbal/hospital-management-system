import { useState } from "react"
import axios from "axios"

function AddPrescription({ appointment, onSuccess }){
    

const [medicine,setMedicine] = useState("")
const [dosage,setDosage] = useState("")
const [notes,setNotes] = useState("")

const savePrescription = ()=>{

axios.post("http://127.0.0.1:8000/api/prescriptions/",{

doctor:appointment.doctor,
patient:appointment.patient,
appointment:appointment.id,
medicine:medicine,
dosage:dosage,
notes:notes

})

.then(()=>{

alert("Prescription added successfully")
if(onSuccess){
    onSuccess()
}

})

.catch(()=>{

alert("Error saving prescription")

})

}

return(

<div className="appointment-container">

<h2>Add Prescription</h2>

<p>Patient: {appointment.patient_name}</p>

<input
placeholder="Medicine"
onChange={(e)=>setMedicine(e.target.value)}
/>

<input
placeholder="Dosage"
onChange={(e)=>setDosage(e.target.value)}
/>

<textarea
placeholder="Notes"
onChange={(e)=>setNotes(e.target.value)}
></textarea>

<button onClick={savePrescription}>
Save Prescription
</button>

</div>

)

}

export default AddPrescription