import { useState } from "react"
import axios from "axios"
import "./Register.css"
<h2>🩺 CareConnect Registration</h2>

function Register({ setPage }) {

  const [role,setRole] = useState("patient")

  const [form,setForm] = useState({
    username:"",
    email:"",
    password:"",
    phone:"",
    aadhar:"",
    specialization:"",
    experience:"",
    age:"",
    gender:"",
    address:"",
    disease:""
  })

  const handleChange = (e) =>{
    setForm({...form,[e.target.name]:e.target.value})
  }
const register = async () => {

  let data = {
    username: form.username,
    email: form.email,
    password: form.password,
    phone: form.phone,
    role: role
  }

  if(role === "doctor"){

    data.aadhar = form.aadhar
    data.specialization = form.specialization
    data.experience = form.experience ? Number(form.experience) : 0

  }

  if(role === "patient"){

    data.age = form.age ? Number(form.age) : 0
    data.gender = form.gender
    data.address = form.address
    data.disease = form.disease

  }

  try{

    const res = await axios.post(
      "http://127.0.0.1:8000/api/users/register/",
      data
    )

    alert("Registration successful")

    setPage("login")

  }catch(err){

    console.log(err.response?.data)

    alert(JSON.stringify(err.response?.data))

  }

}

  return (

    <div className="hero-container">

      <div className="login-box">

       <h2>🩺 CareConnect Registration</h2>

        <select
        value={role}
        onChange={(e)=>setRole(e.target.value)}
        >

          <option value="patient">Patient</option>
          <option value="doctor">Doctor</option>

        </select>

        <input
        name="username"
        placeholder="Username"
        onChange={handleChange}
        />

        <input
        name="email"
        placeholder="Email"
        onChange={handleChange}
        />

        <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
        />

        <input
        name="phone"
        placeholder="Phone"
        onChange={handleChange}
        />

        {role==="doctor" && (

          <>
            <input
            name="aadhar"
            placeholder="Aadhar Number"
            onChange={handleChange}
            />

            <input
            name="specialization"
            placeholder="Specialization"
            onChange={handleChange}
            />

            <input
            name="experience"
            placeholder="Experience (years)"
            onChange={handleChange}
            />
          </>
        )}

        {role==="patient" && (

          <>
            <input
            name="age"
            placeholder="Age"
            onChange={handleChange}
            />

            <input
            name="gender"
            placeholder="Gender"
            onChange={handleChange}
            />

            <input
            name="address"
            placeholder="Address"
            onChange={handleChange}
            />

            <input
            name="disease"
            placeholder="Disease"
            onChange={handleChange}
            />
          </>
        )}

        <button onClick={register}>Register</button>

        <p>
        Already have account?
        <span onClick={()=>setPage("login")}> Login</span>
        </p>

      </div>

    </div>

  )

}

export default Register