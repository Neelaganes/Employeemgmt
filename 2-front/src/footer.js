import './total.css';
import { FaInstagramSquare } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

export default function Footer(){
    return(
        <div>
            <div id="foot">
                <div>
                    <h3>BRANCHES:</h3>
                    <ul>
                        <li>COMPUTER ENGINEERING(CSE)</li>
                        <li>MECHANICAL ENGINEERING(ME)</li>
                        <li>CIVIL ENGINEERING(CE)</li>
                    </ul>
                </div>
                <div>
                    <h3>ADDRESS:</h3>
                    <ul>
                       <li> 12-123,NEAR RAMA TALKIES,</li>
                       <li> VIZAG ,ANDHRA PRADESH,</li>
                       <li> 530003</li>
                    </ul>
                </div>
                <div>
                    <h3>SOCIAL MEDIA:</h3>
                    <ul>
                        <li><a id='network' href="https://www.instagram.com/neelaganesh_d?igsh=ZHA1ZQ0ZzVjMzNi">
                        <FaInstagramSquare />INSTAGRAM</a></li>
                        <li><a id='network' href="https://www.facebook.com/profile.php?id=100079058760428&sk=about"><FaFacebookSquare />FACEBOOK</a></li>
                        <li><a id='network' href="https://www.linkedin.com/in/neelaganeshd/"><FaLinkedin />LINKEDIN</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}