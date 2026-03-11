import { useEffect, useState } from "react"
import axios from "axios"
import "./BookAppointment.css"

function BookAppointment({ doctor }) {

  const [doctors,setDoctors] = useState([])
  const [selectedDoctor,setSelectedDoctor] = useState(doctor || null)

  const [date,setDate] = useState("")
  const [time,setTime] = useState("")

  useEffect(()=>{

    axios.get("http://127.0.0.1:8000/api/doctors/")
    .then(res=>{
      setDoctors(res.data)
    })

  },[])

  const book = () => {

    const patient_id = localStorage.getItem("patient_id")

    if(!patient_id){
      alert("Patient not logged in")
      return
    }

    if(!selectedDoctor || !date || !time){
      alert("Please fill all fields")
      return
    }

    axios.post("http://127.0.0.1:8000/api/appointments/",{
      doctor:selectedDoctor.id,
      patient:parseInt(patient_id),
      date:date,
      time:time
    })

    .then(()=>{
      alert("Appointment booked successfully")
    })

    .catch(err=>{
      console.log(err.response.data)
      alert("Booking failed")
    })

  }

  return(

    <div className="appointment-container">

      <div className="appointment-card">

        <h1>Book Appointment</h1>

        {!selectedDoctor &&(

          <select
          className="doctor-select"
          onChange={(e)=>{

            const doc = doctors.find(d=>d.id==e.target.value)
            setSelectedDoctor(doc)

          }}
          >

            <option>Select Doctor</option>

            {doctors.map(doc=>(
              <option key={doc.id} value={doc.id}>
              Dr. {doc.doctor_name || doc.name || doc.user?.username || "Doctor"} - {doc.specialization}
              </option>
            ))}

          </select>

        )}

        {selectedDoctor &&(

          <div className="selected-doctor">

            <h3>
            Dr. {selectedDoctor.doctor_name || selectedDoctor.name || selectedDoctor.user?.username}
            </h3>

            <p>{selectedDoctor.specialization}</p>

          </div>

        )}

        <label>Date</label>

        <input
        type="date"
        onChange={(e)=>setDate(e.target.value)}
        />

        <label>Time</label>

        <input
        type="time"
        onChange={(e)=>setTime(e.target.value)}
        />

        <button
        className="confirm-btn"
        onClick={book}
        >
        Confirm Appointment
        </button>

      </div>

    </div>

  )

}

export default BookAppointment