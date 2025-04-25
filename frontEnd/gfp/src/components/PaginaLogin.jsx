import { useNavigate, Link } from "react-router-dom";
import React, { useState } from "react";
import "./PaginaLogin.css";
import { enderecoServidor } from "../pages/utils.jsx"
import SenaiLogo from '../assets/SenaiLogo.png';

function PaginaLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');

  async function botaoEntrar(e) {
    e.preventDefault();

    try {
      if (email === '' || senha === '') {
        throw new Error('Preencha todos os campos');
      }
      // Autenticando utilizando a API de backend com o fetch
      const resposta = await fetch(`${enderecoServidor}/usuarios/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email,
          senha: senha,
        }),
      });
      if (resposta.ok) {
        const dados = await resposta.json();
        setMensagem('Login bem-sucedido! ✅');
         navigate("/principal")
        localStorage.setItem('UsuarioLogado', JSON.stringify(dados));
      } else {
        setMensagem('Email ou senha incorretos ❌');
        throw new Error('Email ou senha incorretos ❌');
      }

    } catch (error) {
      console.error('Erro ao realizar login:', error);
      alert(error.message);
      return;
    }
  }

  function botaoLimpar() {
    setEmail('');
    setSenha('');
    setMensagem('');
  }

  return (
    <div className="login-container">
      <div className="login-box">
       <img src={SenaiLogo} alt="Logo Senai" style={{width:'200px'}} />
        {/* <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/SENAI_S%C3%A3o_Paulo_logo.png/1024px-SENAI_S%C3%A3o_Paulo_logo.png" alt="Logo SENAI" className="logo" /> */}
        <h2>Login</h2>
        <div>
          <div className="input-group">
            <label>Email</label>
            <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="Digite seu email" required/>
          </div>
          <div className="input-group">
            <label>Senha</label>
            <input onChange={(e) => setSenha(e.target.value)} value={senha} type="password" placeholder="Digite sua senha" required />
          </div>
          <button onClick={botaoEntrar} type="submit" className="login-button">Entrar</button>
          <button onClick={botaoLimpar} type="button" className="login-button"> Limpar</button>
        </div>
        <p>{mensagem}</p>
      </div>
    </div>
  );
}

export default PaginaLogin;
