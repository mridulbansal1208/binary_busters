import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import { useState } from "react";
import axios from 'axios';

function Login() {
    const navigate = useNavigate()

    const [username, setusername]=useState('');
    const [password, setpassword]=useState('');

    const handleApi = ()=>{
        console.log(username, password);
        const url = 'http://localhost:4000/login';       //prob..
        const data = (username, password);
        axios.post(url,data)
        .then((res)=>{
          console.log(res.data);
          if(res.data.message){
            if(res.data.token){
                localStorage.setItem('token', res.data.token);
                navigate('/');
            }
            alert(res.data.message);
          }
        })
        .catch((err)=>{
          console.log(err)
          alert("Server Error")
        })
      }

    return
    {
        <div>
        <Header/>
        Welcome to login page..
        <br></br>

        USERNAME        
        <input type="text" value={username}  onChange={(e)=>{
            setusername(e.target.value)
          }}/>

        <br></br>
        PASSWORD
        <input type="text" value={password} onChange={(e)=>{
            setpassword(e.target.value)
          }}/>
        <br></br>

        <button onClick={handleApi}>LOGIN</button>
        <Link to="./signup" >Signup</Link>
    </div>
    };
  }


  export default Login;