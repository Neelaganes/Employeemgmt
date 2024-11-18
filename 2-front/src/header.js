
import { useNavigate } from 'react-router-dom';
import './total.css';
export default function Header() {

    const nav = useNavigate();
    const logout = () => {
        localStorage.clear();
        nav('/');
    }

    const details = () => {
        nav(`/details/${localStorage.getItem('role')}/${localStorage.getItem('name')}`);
    }

    const register = () => {
        nav('./register');
    }
    const dashboard = () => {
        nav('./board');
    }
    const youtube = () => {
        nav('./youtube');
    }
    const finance = () => {
        if (localStorage.getItem('name') !== null) {
            nav(`/finance/${localStorage.getItem('role')}/${localStorage.getItem('name')}`);
        }
    }
    return (
        <>

            <div class="navbar">
                <div class="navbar-container">
                    <a href="#new" class="navbar-logo">
                        <img src="https://i.ibb.co/1d72YF9/imgbin-logo-company-business-graphic-designer-logo-design-5-Mx99-WNQfk2-Mjdy3-Pz-ZM4-Knch-t-removebg.png" alt="Your Logo" class="logo" />
                        <p id='lo'>BINGO</p>
                    </a>
                    <ul class="navbar-menu">
                        <li class="navbar-link">{localStorage.getItem('role') === 'admin' ?
                            <button onClick={dashboard}>HOME</button> : null
                        }</li>

                        <li class="navbar-link">{localStorage.getItem('role') === 'admin' ?
                            <button onClick={register}>REGISTER</button> : null
                        }</li>
                        {
                            localStorage.getItem('name') !== null && (
                                <li className="navbar-link">
                                    {localStorage.getItem('role') !== 'employee' && (
                                        <button onClick={details}>DETAILS</button>
                                    )}
                                </li>
                            )
                        }
                        {
                            localStorage.getItem('name') !== null && (
                                <li class="navbar-link">
                                    {localStorage.getItem('role') !== 'employee' ?
                                    <button onClick={finance}>FINANCE</button> : null
                                }</li>)
                        }
                        <li class="navbar-link">{localStorage.getItem('role') === 'employee' ?
                            <button onClick={youtube}>YOUTUBE</button> : null
                        }</li>


                        <li class="navbar-link">
                            {localStorage.getItem('name') !== null ?
                                <button onClick={logout}>LOGOUT</button> : null
                            }</li>
                    </ul>
                </div>
            </div>



        </>
    )
}