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

// not logged in
if(!user){

  if(page === "register"){
    return <Register setPage={setPage}/>
  }

  return <Login setUser={setUser} setPage={setPage}/>

}

// doctor dashboard
if(user?.role === "doctor"){
  return <DoctorDashboard user={user} setUser={setUser}/>
}

// patient dashboard
if(user?.role === "patient"){

  if(page === "doctors"){
    return <Doctors setPage={setPage}/>
  }

  if(page === "book"){
    return <BookAppointment setPage={setPage}/>
  }

  return <PatientDashboard user={user} setUser={setUser} setPage={setPage}/>
}

// admin dashboard
// if(user?.role === "admin"){
//   return <AdminDashboard user={user} setUser={setUser}/>
// }

return null

}

export default App