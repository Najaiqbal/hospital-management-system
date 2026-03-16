import { useState } from "react"
import axios from "axios"
import "./Login.css"

function Login({ setUser, setPage }) {

const [username,setUsername] = useState("")
const [password,setPassword] = useState("")

const login = async () => {

try{

const res = await axios.post(

"https://hospital-management-system-d5wx.onrender.com/api/users/login/",
{
username: username,
password: password
}
)

console.log("LOGIN SUCCESS:", res.data)

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

return(

<div className="login-container">

<div className="login-left">

<h1>CareConnect</h1>

<p>
Connecting Patients and Doctors through
a smart hospital management platform.
</p>

</div>


<div className="login-card">

<h2>Login</h2>

<input
placeholder="Username"
value={username}
onChange={(e)=>setUsername(e.target.value)}
/>

<input
type="password"
placeholder="Password"
value={password}
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