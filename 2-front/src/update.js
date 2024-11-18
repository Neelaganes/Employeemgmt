
import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Update() {



    const [data, setData] = useState({id:'', name: '', email: '', mobile: '',salary:'', experience: '', dateofjoin: '', department: '', password: '',role:''});
    const [datas, setDatas] = useState({id:'',name: '', email: '', mobile: '',salary:'', designation: '', reportedto: '', dateofjoin: '', password: '',role:'' });
    const nav = useNavigate();


    const { role, id } = useParams();

    React.useEffect(() => {
        if (role === 'manager') {
            axios.get(`http://localhost:8001/${role}/details-m/${id}`).then((res) => {
                setData({ name: res.data[0].name, email: res.data[0].email, mobile: res.data[0].mobile,salary: res.data[0].salary, experience: res.data[0].experience, dateofjoin: res.data[0].dateofjoin, department: res.data[0].department, password: res.data[0].password})
            })
            
        }
        else {
            axios.get(`http://localhost:8001/${role}/details-e/${id}`).then((res) => {
                setDatas({ name: res.data[0].name, email: res.data[0].email, mobile: res.data[0].mobile,salary:res.data[0].salary, designation: res.data[0].designation, reportedto: res.data[0].reportedto, dateofjoin: res.data[0].dateofjoin, password: res.data[0].password });
            })
        }
    }, [role, id]);


    
    const submithandlerm = (e) => {
        e.preventDefault();
        const details = {
            name: data.name, email: data.email, mobile: data.mobile, salary: data.salary, experience: data.experience, dateofjoin: data.dateofjoin, department: data.department, password: data.password  //data destructuring
        }

        axios.post(`http://localhost:8001/update/manager/${id}`, details).then((res, err) => {
            if (res !== '') {
                alert('updated successful')
                nav(`/details/${localStorage.getItem('role')}/${localStorage.getItem('name')}`);
            } else {
                console.log(err);
            }
        })
    }


    const submithandlere = (e) => {
        e.preventDefault();
        const details = {
            name: datas.name, email: datas.email, mobile: datas.mobile, salary: datas.salary, designation: datas.designation, reportedto: datas.reportedto, dateofjoin: datas.dateofjoin, password: datas.password  //data destructuring
        }

        axios.post(`http://localhost:8001/update/employee/${id}`, details).then((res, err) => {
            if (res !== '') {
                alert('updated successful')
                nav(`/details/${localStorage.getItem('role')}/${localStorage.getItem('name')}`);
            } else {
                console.log(err);
            }
        })
    }

    

    const handlerm = (e) => {
        const { name, value } = e.target;

        setData((prevstate) => ({ ...prevstate, [name]: value }));
    }

    const handlere = (e) => {
        const { name, value } = e.target;

        setDatas((prevstate) => ({ ...prevstate, [name]: value }));
    }

    return (
        <div>
            <div id='update-main'>
                <center>
                    <div id='updatebox'>

                        <div id="manager-container" style={{ display: role === 'manager' ? 'block' : 'none' }}>
                            <span style={{ color: '#ECE7E2' }}><u>MANAGER - UPDATE</u></span>
                            <form method='post' onSubmit={submithandlerm}>
                                <p><label>NAME:</label><input onChange={handlerm} value={data.name} name="name" /></p>
                                <p><label>EMAIL:</label><input type='email' onChange={handlerm} value={data.email} name="email" /></p>
                                <p><label>MOBILE:</label><input type='number' onChange={handlerm} value={data.mobile} name="mobile" /></p>
                                <p><label>SALARY:</label><input type='number' onChange={handlerm} value={data.salary} name="salary" /></p>
                                <p><label>EXPERIENCE:</label><input type='text' onChange={handlerm} value={data.experience} name="experience" /></p>
                                <p><label>DATE-OF-JOIN:</label><input type='date' onChange={handlerm} value={data.dateofjoin} name="dateofjoin" /></p>
                                <p><label>DEPARTMENT:</label><input type='text' onChange={handlerm} value={data.department} name="department" /></p>
                                <p><label>PASSWORD:</label><input readOnly type="password" onChange={handlerm} value={data.password} name="password" /></p>
                                <button>SUBMIT</button>
                            </form>
                        </div>


                        <div id="emp-container" style={{ display: role === 'employee' ? 'block' : 'none' }}>
                            <span style={{ color: '#ECE7E2' }}><u>EMPLOYEE - UPDATE</u></span>
                            <form onSubmit={submithandlere}>
                                <p><label>NAME:</label><input onChange={handlere} value={datas.name} name="name" /></p>
                                <p><label>EMAIL:</label><input type='email' onChange={handlere} value={datas.email} name="email" /></p>
                                <p><label>MOBILE:</label><input type='number' onChange={handlere} value={datas.mobile} name="mobile" /></p>
                                <p><label>SALARY:</label><input type='number' onChange={handlere} value={datas.salary} name="salary" /></p>
                                <p><label>DESIGNATION:</label><input type='text' onChange={handlere} value={datas.designation} name="designation" /></p>
                                <p><label>REPORTED-TO:</label><input type='text' onChange={handlere} value={datas.reportedto} name="reportedto" /></p>
                                <p><label>DATE-OF-JOIN:</label><input type='date' onChange={handlere} value={datas.dateofjoin} name="dateofjoin" /></p>
                                <p><label>PASSWORD:</label><input type="password" onChange={handlere} value={datas.password} name="password" /></p>
                                <button>SUBMIT</button>
                            </form>
                        </div>
                    </div>
                </center>
            </div>
        </div>
    );

};

