import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Finance() {
    const [adminSalaries1, setAdminSalaries1] = useState([]);
    const [adminSalaries2, setAdminSalaries2] = useState([]);
    const [managerSalaries, setManagerSalaries] = useState([]);

    const {name,role}=useParams();

    useEffect(() => {
        if(role==='admin'){
        // Fetch admin salaries
        axios.get(`http://localhost:8001/finance/1/${role}`).then((res) => {
            if (res.data) {
                setAdminSalaries1(res.data);
            } else {
                alert('Error fetching admin salaries');
            }
        });

        axios.get(`http://localhost:8001/finance/2/${role}`).then((res) => {
            if (res.data) {
                setAdminSalaries2(res.data);
            } else {
                alert('Error fetching admin salaries');
            }
        });
    }else{
        // Fetch manager salaries
        axios.get(`http://localhost:8001/finance/${role}/${name}`).then((res) => {
            if (res.data) {
                setManagerSalaries(res.data);
            } else {
                alert('Error fetching manager salaries');
            }
        });
    }
    }, [name,role]);

    return (
        <div>        
            <div id="finance-main" style={{background:'#4A7766',color:'#ECE7E2'}}>
             <center>
            <div  style={{  width: '80%' }}>
               
                    <br/>
                    <h2>FINANCE PAGE</h2>


                    {/* Admin Salaries Table */}
                    <div
                        id="admincontainer"
                        style={{ display: role === "admin" ? 'block' : 'none' }}
                    ><p>ADMIN LOGIN SUCCESS</p>
                        <p>Managers Salaries</p>
                        <table border={'2px'} style={{ borderCollapse: "collapse", width: '100%' }}>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Salary</th>
                                </tr>
                            </thead>
                            <tbody>
                                {adminSalaries1.length > 0 ? (
                                    adminSalaries1.map((item) => (
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.name}</td>
                                            <td>{item.salary}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3">No data available</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        <h3>Employees Salaries</h3>
                        <table border={'2px'} style={{ borderCollapse: "collapse", width: '100%' }}>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Salary</th>
                                </tr>
                            </thead>
                            <tbody>
                                {adminSalaries2.length > 0 ? (
                                    adminSalaries2.map((item) => (
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.name}</td>
                                            <td>{item.salary}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3">No data available</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Manager Salaries Table */}
                    <div
                        id="managercontainer"
                        style={{ display: role === "manager" ? 'block' : 'none',height:'500px' }}
                    >
                        <h3>Manager Salary</h3>
                        <table border={'2px'} style={{ borderCollapse: "collapse", width: '100%' }}>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Salary</th>
                                </tr>
                            </thead>
                            <tbody>
                                {managerSalaries.length > 0 ? (
                                    managerSalaries.map((item) => (
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.name}</td>
                                            <td>{item.salary}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3">No data available</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                
            </div>
            </center>
        </div>
        </div>

    );
}
