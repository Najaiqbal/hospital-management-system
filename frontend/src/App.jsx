import { useState } from "react"
import Login from "./pages/Login"
import Register from "./pages/Register"
import DoctorDashboard from "./pages/DoctorDashboard"
import PatientDashboard from "./pages/PatientDashboard"
import Doctors from "./pages/Doctors"
import BookAppointment from "./pages/BookAppointment"

function App(){

const [user,setUser] = useState(null)
const [page,setPage] = useState("login")

if(!user){

  if(page === "login"){
    return <Login setUser={setUser} setPage={setPage}/>
  }

  if(page === "register"){
    return <Register setPage={setPage}/>
  }

}

if(user?.role === "doctor"){
  return <DoctorDashboard user={user} setUser={setUser}/>
}

if(user?.role === "patient"){

  if(page === "doctors"){
    return <Doctors setPage={setPage}/>
  }

  if(page === "book"){
    return <BookAppointment setPage={setPage}/>
  }

  return <PatientDashboard user={user} setUser={setUser} setPage={setPage}/>
}

return null

}

export default App