
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function Details() {
    const [data, setData] = useState([]);
    const [datas, setDatas] = useState([]);
    const [data1, setData1] = useState([]);
    const { name, role } = useParams();

    useEffect(() => {
        if (role === 'admin') {
            axios.get(`http://localhost:8001/details/1/${role}`).then((res) => {
                if (res.data) {
                    setData(res.data);
                } else {
                    alert('Admin error');
                }
            });

            axios.get(`http://localhost:8001/details/2/${role}`).then((res) => {
                if (res.data) {
                    setDatas(res.data);
                } else {
                    alert('Error');
                }
            });

            document.getElementById('admincontainer').style.display = 'block';
            document.getElementById('managercontainer').style.display = 'none';
        } else if (role === 'manager') {
            axios.get(`http://localhost:8001/details/${role}/${name}`).then((res) => {
                console.log(res.data); // Debugging the response
                if (res.data) {
                    setData1(res.data);
                } else {
                    alert('Manager error');
                }
            });

            document.getElementById('admincontainer').style.display = 'none';
            document.getElementById('managercontainer').style.display = 'block';
        }
    }, [role, name]);

    const deleterowm = (id) => {
        axios.post(`http://localhost:8001/delete-m/${id}`).then((res) => {
            alert('Record deleted');
        });
    };

    const deleterowe = (id) => {
        axios.post(`http://localhost:8001/delete-e/${id}`).then((res) => {
            alert('Record deleted');
        });
    };

    return (
        <div>
            <div id="details-main">
                <div id="admincontainer" style={{ margin: '20px auto', width: '80%' }}>
                    <center>
                        <br/><br/>
                        <span>ADMIN LOGIN SUCCESS</span><br />
                        <span>MANAGERS:</span>
                        <table border={'2px'} style={{ borderCollapse: "collapse", width: '100%' }}>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>NAME</th>
                                    <th>EMAIL</th>
                                    <th>MOBILE</th>
                                    <th>EXPERIENCE</th>
                                    <th>DATE OF JOIN</th>
                                    <th>DEPARTMENT</th>
                                    <th>PASSWORD</th>
                                    <th colSpan={2}>ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.mobile}</td>
                                        <td>{item.experience}</td>
                                        <td>{item.dateofjoin}</td>
                                        <td>{item.department}</td>
                                        <td>{item.password}</td>
                                        <td>
                                            <button>
                                                <Link to={`/update/${item.role}/${item.id}`}>edit</Link>
                                            </button>
                                            <button onClick={() => deleterowm(item.id)}>delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table><br />
                        <span>EMPLOYEES:</span>
                        <table border={'2px'} style={{ borderCollapse: "collapse", width: '100%' }}>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>NAME</th>
                                    <th>EMAIL</th>
                                    <th>MOBILE</th>
                                    <th>DESIGNATION</th>
                                    <th>REPORTED TO</th>
                                    <th>DATE OF JOIN</th>
                                    <th>PASSWORD</th>
                                    <th colSpan={2}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {datas.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.mobile}</td>
                                        <td>{item.designation}</td>
                                        <td>{item.reportedto}</td>
                                        <td>{item.dateofjoin}</td>
                                        <td>{item.password}</td>
                                        <td>
                                            <button>
                                                <Link to={`/update/${item.role}/${item.id}`}>edit</Link>
                                            </button>
                                            <button onClick={() => deleterowe(item.id)}>delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </center>
                </div>

                <div id="managercontainer" style={{ margin: '20px auto', width: '80%' }}>
                    <center>
                        <br/><br/>
                        <span>MANAGER LOGIN SUCCESS</span>
                        <table border={'2px'} style={{ borderCollapse: "collapse", width: '100%' }}>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>NAME</th>
                                    <th>EMAIL</th>
                                    <th>MOBILE</th>
                                    <th>DESIGNATION</th>
                                    <th>REPORTED TO</th>
                                    <th>DATE OF JOIN</th>
                                    <th>PASSWORD</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data1 && Array.isArray(data1) && data1.length > 0 ? (
                                    data1.map(item => (
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.name}</td>
                                            <td>{item.email}</td>
                                            <td>{item.mobile}</td>
                                            <td>{item.designation}</td>
                                            <td>{item.reportedto}</td>
                                            <td>{item.dateofjoin}</td>
                                            <td>{item.password}</td>
                                            
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="9">No data available</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </center>
                </div>
            </div>
        </div>
    );
}
