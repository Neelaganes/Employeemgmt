import axios from "axios";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export default function Empdetails(){
    
    const [data,setData]=useState([])
    
    const useparam=useParams();
    const {id}=useparam;

    useEffect(()=>{
        axios.get(`http://localhost:8001/details/${id}`).then((res) => {
            if (res.data) {
                setData(res.data);
            }
            else { alert('error'); } 
    });},[data,id]
)

return(
        <div>
            <center>
            <div id="emp-main">
            <br/>
                
                    <p>EMPLOYEE LOGIN SUCCESS</p>
                    <table border={'2px'} style={{ borderCollapse: "collapse",width:'80%' }}>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>EMAIL</th>
                                <th>MOBILE</th>
                                <th>DESIGNATION</th>
                                <th>REPORTED TO</th>
                                <th>DATE OF JOIN</th>
                                <th>PASSWORD</th>
                                <th>SALARY</th>
                                
                            </tr>
                            {data.map(item => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.mobile}</td>
                                    <td>{item.designation}</td>
                                    <td>{item.reportedto}</td>
                                    <td>{item.dateofjoin}</td>
                                    <td>{item.password}</td>
                                    <td>{item.salary}</td>
                                </tr>
                            ))}

                    </table>
                
            </div>
            </center>
        </div>
    )
}