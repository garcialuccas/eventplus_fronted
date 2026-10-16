import "./login.css"
import logoEvent from "../../assets/logo1.svg"
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { useEffect, useState } from "react";
import Botao from "../../components/botao/botao";

function Login(){

    const navigate = useNavigate()
    const location = useLocation()
    const { login, autenticado } = useAuth()
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [erro, setErro] = useState("")
    const [enviando, setEviando] = useState(false)

    useEffect(() => {
        if (autenticado) navigate("/Home", {replace: true});
    }, [autenticado, navigate])

    return (
        <>
            <main>
                <img src={logoEvent} alt="EventPlus" />

                <div>
                    <label htmlFor="">email</label>
                    <input type="email" name="email" id="email" placeholder="digite seu email" onChange={(event) => setEmail(event.target.value)}/>
                </div>

                <div>
                    <label htmlFor="">senha</label>
                    <input type="password" name="senha" id="senha" placeholder="digite sua senha" onChange={(event) => setSenha(event.target.value)}/>
                </div>

                <Botao texto={enviando ? "Entrando..." : "Entrar"} type="submit" disabled={enviando}></Botao>
            </main>
        </>
    )
}

export default Login;

