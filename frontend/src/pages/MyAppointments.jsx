import { useEffect, useState } from "react"
import axios from "axios"
import "./MyAppointments.css"

function MyAppointments() {

  const [appointments,setAppointments] = useState([])

  useEffect(()=>{

    const patient_id = parseInt(localStorage.getItem("patient_id"))

    axios.get("http://127.0.0.1:8000/api/appointments/")
    .then(res=>{

      const myAppointments = res.data.filter(
        a => a.patient === patient_id
      )

      setAppointments(myAppointments)

    })

    .catch(err=>{
      console.log(err)
    })

  },[])

  return(

    <div className="patient-appointments-container">

      <h1 className="patient-appointments-title">
        My Appointments
      </h1>

      {appointments.length === 0 && (
        <p className="no-appointments">
          No appointments booked yet.
        </p>
      )}

      <div className="patient-appointments-grid">

        {appointments.map(app =>(

          <div className="patient-appointment-card" key={app.id}>

            <h3>Dr. {app.doctor_name}</h3>

            <p>
              <span>Department:</span> {app.specialization}
            </p>

            <p>
              <span>Date:</span> {app.date}
            </p>

            <p>
              <span>Time:</span> {app.time}
            </p>

            <p>
              <span>Status:</span>
              <span className={`status ${app.status.toLowerCase()}`}>
                {app.status}
              </span>
            </p>

          </div>

        ))}

      </div>

    </div>

  )

}

export default MyAppointments