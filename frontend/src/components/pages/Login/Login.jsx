
import React, {useState} from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import {setToken} from '../../Auth/Auth'



const Login = () => {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");    
    const [error, setError] = useState('')  
    const navigate = useNavigate()
     
    const login = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8080/login", {
          email: email,
          senha: senha,
        })
        .then(res => {
          console.log(res);
          if(res.data.Status === 'Success') {
      console.log(res.data.Token);
      setToken(res.data.Token)
              navigate('/profile');
          } else {
              setError(res.data.Error);
            }
        })
        .catch(err => console.log(err));
     }
    
  return (
        <div className="container" style={{paddingTop: 60}}>
          <div className="container-fluid h-custom">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                <form>
                  <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                    <p className="lead fw-normal mb-0 me-3">Entre com sua conta</p>
                  </div>
                    <h1 style={{color: 'red', fontSize: '15px', textAlign: 'center', marginTop: '20px'}}>{error && error}</h1>
                  <div className="form-outline mb-4">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control form-control-lg"
                      placeholder="Entre com endereço de Email valido"
                      onChange={(e) => {setEmail(e.target.value)}} required
                    />
                  </div>
                  <div className="form-outline mb-3">
                    <label className="form-label">Senha</label>
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      placeholder="Digite sua Senha"
                      onChange={(e) => {setSenha(e.target.value)}} required
                    />
                  </div>
    
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="form-check mb-0">
                      <input className="form-check-input me-2" type="checkbox" value=""/>
                      <label className="form-check-label">
                        relembre-me
                      </label>
                    </div>
                    <a href="#" className="text-body">Esqueceu a senha?</a>
                  </div>
    
                  <div className="text-center text-lg-start mt-4 pt-2">
                    <button type="button" className="btn btn-primary btn-lg" onClick={login}>Login</button>
                    
                  </div>
    
                </form>
              </div>
            </div>
          </div>
        </div>
  )};
  

  

   
export default Login;

