import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import './total.css';
import axios from 'axios'
export default function Register() {


  const [data, setData] = useState({ name: '', email: '', mobile: '', experience: '', dateofjoin: '', department: '', password: '' });
  const [datas, setDatas] = useState({ name: '', email: '', mobile: '', designation: '', reportedto: '', dateofjoin: '', password: '' })
  const nav = useNavigate();
  const [val, setVal] = useState([]);
  


  const managerhandler = (e) => {

    const { name, value } = e.target;
    setData((prevstate) => ({
      ...prevstate, [name]: value
    }))
  }
  const emphandler = (e) => {

    const { name, value } = e.target;
    setDatas((prevstate) => ({
      ...prevstate, [name]: value
    }))
  }


  const employsubmithandler = (e) => {
    e.preventDefault();
    const detail = { name: datas.name, email: datas.email, mobile: datas.mobile, designation: datas.designation, reportedto: datas.reportedto, dateofjoin: datas.dateofjoin, password: datas.password }
    axios.post('http://localhost:8001/empregister', detail).then((res, err) => {
      if (res !== '') {
        alert('register successful, go and login')
        setVal(val + 1);
        nav('/')
      }
      else {
        console.log(err);
      }
    })

  }

  const managersubmithandler = (e) => {
    e.preventDefault();
    const detail = { name: data.name, email: data.email, mobile: data.mobile, experience: data.experience, dateofjoin: data.dateofjoin, department: data.department, password: data.password }
    axios.post('http://localhost:8001/managerregister', detail).then((res, err) => {
      if (res !== '') {
        alert('register successful, go and login')
        setVal(val + 1);
        nav('/')
      }
      else {
        console.log(err);
      }
    })

  }
  const empbox = (e) => {
    e.preventDefault();
    document.getElementById('emp-container').style.display = 'block';
    document.getElementById('manager-container').style.display = 'none';
  }
  const managerbox = (e) => {
    e.preventDefault();
    document.getElementById('manager-container').style.display = 'block';
    document.getElementById('emp-container').style.display = 'none';
  }

  return (
    <div>
      <div id='register-main'>
     
        <div id='register-box'>
      
          <div id="manager-container">

          <div id='controller'><button onClick={managerbox}>manager</button>
            <button onClick={empbox}>employee</button></div><br/>
            <center><u>MANAGER-REGISTRATION</u></center>
            <form method='post' onSubmit={managersubmithandler}>
              <p><label>NAME:</label><input id='in1' autoComplete='none' required type="text" onChange={managerhandler} name="name" /> </p>
              <p><label>EMAIL:</label><input id='in2' autoComplete='none' required type='email' onChange={managerhandler} name="email" /> </p>
              <p><label>MOBILE:</label><input id='in3' autoComplete='none' required type='number' onChange={managerhandler} name="mobile" /> </p>
              <p><label>EXPERIENCE:</label><input id='in4' autoComplete='none' required type='text' onChange={managerhandler} name="experience" /> </p>
              <p><label>DATE-OF-JOIN:</label><input id='in5' autoComplete='none' required type='date' onChange={managerhandler} name="dateofjoin" /> </p>
              <p><label>DEPARTMENT:</label><input id='in6' autoComplete='none' required type='text' onChange={managerhandler} name="department" /> </p>
              <p><label>PASSWORD:</label><input id='in7' autoComplete='none' type="password" required onChange={managerhandler} name="password" /> </p>
              <center><button>SUBMIT</button></center>
            </form>
            
          </div>


          <div id="emp-container" style={{ display: 'none' }}>

          <div id='controller'><button onClick={managerbox}>manager</button>
            <button onClick={empbox}>employee</button></div><br/>
            <center><u>EMPLOYEE-REGISTRATION</u></center>
            <form method='post' onSubmit={employsubmithandler}>
              <p><label>NAME:</label><input  id='i1' required type="text" onChange={emphandler} name="name" /> </p>
              <p><label>EMAIL:</label><input id='i2' required type='email' onChange={emphandler} name="email" /> </p>
              <p><label>MOBILE:</label><input id='i3' required type='number' onChange={emphandler} name="mobile" /> </p>
              <p><label>DESIGNATION:</label><input id='i4' required type='text' onChange={emphandler} name="designation" /> </p>
              <p><label>REPORTED-TO:</label>
                <input  id='i5' list="managers" name="reportedto" onChange={emphandler} />

                <datalist id="managers">
                  <option value="neelaganesh">neelaganesh</option>
                  <option value="chiranjivi">chiranjivi</option>
                  <option value="raju">raju</option>
                  <option value="bhirava">bhirava</option>
                  <option value="prithi">prithi</option>
                  <option value="gudumba">gudumba</option>
                  <option value="sanker">sanker</option>
                </datalist>
               </p>
              <p><label>DATE-OF-JOIN:</label><input id='i6' required type='date' onChange={emphandler} name="dateofjoin" /> </p>
              <p><label>PASSWORD:</label><input id='i7' type="password" required onChange={emphandler} name="password" /> </p>
              <center><button>SUBMIT</button></center>
            </form>

          </div>
        </div>
        
    
    </div>
    </div>

  )
}
