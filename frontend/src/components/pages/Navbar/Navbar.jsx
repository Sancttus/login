import React, {  } from "react";
import { Link } from "react-router-dom";
import {fetchToken} from '../../Auth/Auth'
 
const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">        

        
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">    
            <li className="nav-item">            
              <Link className="nav-link " aria-current="page" to='/login'>Login</Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link " aria-current="page" to='/register'>register</Link>
            </li>
          </ul>
          <div className="d-flex">
            {
                fetchToken() 
                ? (
                    <p>você está logado!</p>
                )
                : (
                 
                  
                  ""
                )
            } 
          </div>
        </div>
      </div>
    </nav>
   
  );
};


export default Navbar;