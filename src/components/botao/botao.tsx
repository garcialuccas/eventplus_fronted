import "./botao.css"
import type { ButtonHTMLAttributes } from "react";

interface BotaoProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    texto?: string;
    className?: string;
}

function Botao({texto, onClick, type = "button", className = "", ...props}: BotaoProps) {

    const classes = ["botao", className].filter(Boolean).join(" ")

    return (
        <button className={classes} onClick={onClick} type={type} {...props}>{texto || "Clique Aqui"}</button>
    )
}

export default Botao;