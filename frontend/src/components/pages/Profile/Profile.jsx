import React, { } from "react";
import {useNavigate} from "react-router-dom";
  
export default function Profile(){
    const navigate = useNavigate();
    const signOut = () => {
        localStorage.removeItem('Token')
        navigate("/login");
    }
    return(
      <div className="container" style={{paddingTop: 60}}>
        <div className="row">
            <div style = {{minHeight: 800, marginTop: 20 }}>
                <h1>Profile Page</h1>
                <p>Olá você está logado</p>
                <div>
                    <button type = 'button' onClick= {signOut}>logout</button>
                </div>
            </div>
        </div>  
      </div>
    )
}