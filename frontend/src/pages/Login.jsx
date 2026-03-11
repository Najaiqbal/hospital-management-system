import { useState } from "react"
import axios from "axios"

function Login({ setUser, setPage }) {

  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")

  const login = async () => {

    try{

      const res = await axios.post(
        "http://127.0.0.1:8000/api/users/login/",
        {
          username: username,
          password: password
        }
      )

      console.log("LOGIN SUCCESS:", res.data)

      // save logged in user
      localStorage.setItem("user_id", res.data.user_id)

if(res.data.role === "doctor"){
localStorage.setItem("doctor_id", res.data.doctor_id)
}

if(res.data.role === "patient"){
localStorage.setItem("patient_id", res.data.patient_id)
}

      setUser(res.data)

    }catch(err){

      console.log("LOGIN ERROR:", err)
      alert("Invalid credentials")

    }

  }

  return (

    <div className="hero-container">

      <div className="hero-left">

        <h1>Hospital Management System</h1>

        <p>
        Manage doctors, patients, appointments, prescriptions
        and billing in one integrated healthcare platform.
        </p>

      </div>

      <div className="login-box">

        <h2>Login</h2>

        <input
        placeholder="Username"
        onChange={(e)=>setUsername(e.target.value)}
        />

        <input
        type="password"
        placeholder="Password"
        onChange={(e)=>setPassword(e.target.value)}
        />

        <button onClick={login}>Login</button>

        <p>
        Don't have an account?
        <span onClick={()=>setPage("register")}> Register</span>
        </p>

      </div>

    </div>

  )

}

export default Login