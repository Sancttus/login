
import {React} from 'react';
import { useState } from 'react';
import axios from 'axios';

const SignIn = () =>{

    const [email, setEmail] = useState("");
    const [nome, setNome] = useState("");
    const [senha, setSenha] = useState("");
    const [registerStatus, setRegisterStatus] = useState("");
 
    const register = (e) => {
        e.preventDefault();
       axios.post("http://localhost:8080/register", {
          nome: nome,
          email: email,
          senha: senha,
        }).then((response) => {
        
          if(response.data.message){
            setRegisterStatus(response.data.message);
          } 

          if (response.data.Status === 'Error') {
            setRegisterStatus(response.data.Error);       
        
          }else{
            setRegisterStatus("SUA CONTA FOI CRIADA COM SUCESSO");
          }
        })
        
    }
    return(
       
        <div className="container" style={{paddingTop: 60}}>
            <div className="container-fluid h-custom">
                <div className="row d-flex justify-content-center align-center h-100">
                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                    <form>
                  <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                    <p className="lead fw-normal mb-0 me-3">Crie sua conta</p>
                  </div>
                  <h1 style={{fontSize: '15px', textAlign: 'center', marginTop: '20px'}}>{registerStatus}</h1>
                  <div className="form-outline mb-4">
                      <label className="form-label">Nome</label>
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Digite seu nome"
                        onChange={(e) => {setNome(e.target.value)}}  required
                    />
                  </div>
                  <div className="form-outline mb-4">
                      <label className="form-label">Email </label>
                    <input
                      type="email"
                      className="form-control form-control-lg"
                      onChange={(e) => {setEmail(e.target.value)}} placeholder="Digite seu email" required
                    />
                  </div>
                  <div className="form-outline mb-3">
                      <label className="form-label">Senha</label>
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      onChange={(e) => {setSenha(e.target.value)}} placeholder="digite sua senha" required
                    />
                  </div>
    
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="form-check mb-0">
                      <input className="form-check-input me-2" type="checkbox" value=""/>
                      <label className="form-check-label">
                        Relembre-me
                      </label>
                    </div>
                    <a href="#" className="text-body">Esqueceu a Senha?</a>
                  </div>
    
                  <div className="text-center text-lg-start mt-4 pt-2">
                    <button type="button" className="btn btn-primary btn-lg" onClick={register}>Sign Up</button>
                    <p className="small fw-bold mt-2 pt-1 mb-0">Logue sua conta <a href="login" className="link-danger">Login</a></p>
                  </div>
    
                </form>
                    </div>                   
                </div>
            </div>
        </div>
    )
}


export default SignIn;